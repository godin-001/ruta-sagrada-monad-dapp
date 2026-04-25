// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract RutaSagradaPeregrinacion {
    uint8 public constant STATION_COUNT = 5;
    uint16 public constant COLLECTIBLES_PER_CATEGORY = 50;
    uint16 public constant TOTAL_COLLECTIBLES = 150;
    uint256 public immutable registrationFee;

    address public owner;
    address public proactibleTreasury;
    address public routeTreasury;
    address public reserveTreasury;

    uint16 public proactibleBps = 6800;
    uint16 public routeBps = 2200;
    uint16 public reserveBps = 1000;

    enum Category {
        Lumbre,
        Vinculo,
        Oraculo
    }

    struct Pilgrim {
        bool registered;
        uint256 donated;
        uint8 stationsVisited;
        bytes32 reiHash;
    }

    mapping(address => Pilgrim) public pilgrims;
    mapping(address => mapping(uint8 => bool)) public stationCheckIns;
    mapping(uint256 => Category) public collectibleCategory;
    mapping(uint256 => bool) public collectibleMinted;

    event Registered(address indexed pilgrim, bytes32 reiHash, uint256 feePaid);
    event DonationReceived(address indexed pilgrim, uint256 amount, uint256 toProactible, uint256 toRoute, uint256 toReserve);
    event StationCheckedIn(address indexed pilgrim, uint8 indexed stationId, uint8 totalVisited);
    event CollectibleAssigned(address indexed pilgrim, uint256 indexed collectibleId, Category category);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(
        uint256 registrationFeeWei,
        address proactibleTreasury_,
        address routeTreasury_,
        address reserveTreasury_
    ) {
        require(proactibleTreasury_ != address(0), "Proactible treasury required");
        require(routeTreasury_ != address(0), "Route treasury required");
        require(reserveTreasury_ != address(0), "Reserve treasury required");

        owner = msg.sender;
        registrationFee = registrationFeeWei;
        proactibleTreasury = proactibleTreasury_;
        routeTreasury = routeTreasury_;
        reserveTreasury = reserveTreasury_;

        for (uint256 i = 0; i < TOTAL_COLLECTIBLES; i++) {
            if (i < COLLECTIBLES_PER_CATEGORY) {
                collectibleCategory[i] = Category.Lumbre;
            } else if (i < COLLECTIBLES_PER_CATEGORY * 2) {
                collectibleCategory[i] = Category.Vinculo;
            } else {
                collectibleCategory[i] = Category.Oraculo;
            }
        }
    }

    function register(bytes32 reiHash) external payable {
        require(!pilgrims[msg.sender].registered, "Already registered");
        require(msg.value >= registrationFee, "Insufficient fee");

        pilgrims[msg.sender] = Pilgrim({
            registered: true,
            donated: 0,
            stationsVisited: 0,
            reiHash: reiHash
        });

        _splitFunds(msg.value);
        emit Registered(msg.sender, reiHash, msg.value);
    }

    function donate() external payable {
        require(pilgrims[msg.sender].registered, "Register first");
        require(msg.value > 0, "Donation required");

        pilgrims[msg.sender].donated += msg.value;
        (uint256 proactibleShare, uint256 routeShare, uint256 reserveShare) = _splitFunds(msg.value);

        emit DonationReceived(msg.sender, msg.value, proactibleShare, routeShare, reserveShare);
    }

    function checkInStation(uint8 stationId) external {
        require(pilgrims[msg.sender].registered, "Register first");
        require(stationId < STATION_COUNT, "Invalid station");
        require(!stationCheckIns[msg.sender][stationId], "Station already checked in");

        stationCheckIns[msg.sender][stationId] = true;
        pilgrims[msg.sender].stationsVisited += 1;

        emit StationCheckedIn(msg.sender, stationId, pilgrims[msg.sender].stationsVisited);
    }

    function assignCollectible(address pilgrim, uint256 collectibleId) external onlyOwner {
        require(pilgrims[pilgrim].registered, "Pilgrim not registered");
        require(collectibleId < TOTAL_COLLECTIBLES, "Collectible out of range");
        require(!collectibleMinted[collectibleId], "Collectible already assigned");

        if (collectibleCategory[collectibleId] == Category.Oraculo) {
            require(pilgrims[pilgrim].stationsVisited == STATION_COUNT, "Complete all stations for Oraculo");
        }

        collectibleMinted[collectibleId] = true;
        emit CollectibleAssigned(pilgrim, collectibleId, collectibleCategory[collectibleId]);
    }

    function updateTreasuries(
        address proactibleTreasury_,
        address routeTreasury_,
        address reserveTreasury_
    ) external onlyOwner {
        require(proactibleTreasury_ != address(0), "Proactible treasury required");
        require(routeTreasury_ != address(0), "Route treasury required");
        require(reserveTreasury_ != address(0), "Reserve treasury required");

        proactibleTreasury = proactibleTreasury_;
        routeTreasury = routeTreasury_;
        reserveTreasury = reserveTreasury_;
    }

    function setSplit(uint16 proactibleBps_, uint16 routeBps_, uint16 reserveBps_) external onlyOwner {
        require(proactibleBps_ + routeBps_ + reserveBps_ == 10000, "Split must equal 10000 bps");
        proactibleBps = proactibleBps_;
        routeBps = routeBps_;
        reserveBps = reserveBps_;
    }

    function _splitFunds(uint256 amount)
        internal
        returns (uint256 proactibleShare, uint256 routeShare, uint256 reserveShare)
    {
        proactibleShare = (amount * proactibleBps) / 10000;
        routeShare = (amount * routeBps) / 10000;
        reserveShare = amount - proactibleShare - routeShare;

        (bool proactibleSent, ) = payable(proactibleTreasury).call{value: proactibleShare}("");
        (bool routeSent, ) = payable(routeTreasury).call{value: routeShare}("");
        (bool reserveSent, ) = payable(reserveTreasury).call{value: reserveShare}("");

        require(proactibleSent && routeSent && reserveSent, "Transfer failed");
    }
}

