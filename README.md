# Ruta Sagrada Monad dApp

Prototipo dApp para **La Peregrinación Nocturna del Aficionado: El Regalo de México para el Mundo**.

Construido con **Next.js App Router**, **Tailwind CSS**, **wagmi**, **viem**, **ethers** y componentes locales estilo shadcn para presentar una experiencia mobile-first con:

- Hero premium y narrativa cultural
- **Monad Identity Pulse**
- Firma de **Decálogo**
- Formulario **REI** (Registro de Experiencia e Intención)
- Flujo de **5 estaciones**
- Memorial / word-cloud emocional
- **150 coleccionables** en 3 categorías
- Wallet demo para donaciones dirigidas a **Proactible**

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- wagmi + viem
- ethers
- lucide-react

## Configuración de red

La app viene preparada para **Monad Testnet**:

- RPC pública: `https://testnet-rpc.monad.xyz`
- Chain ID: `10143`

Puedes sobrescribir estos valores con variables de entorno.

## Variables de entorno

Copia el ejemplo:

```bash
cp .env.example .env.local
```

Variables incluidas:

```env
NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
NEXT_PUBLIC_MONAD_EXPLORER_URL=https://testnet.monadexplorer.com
NEXT_PUBLIC_PROACTIBLE_DEMO_DONATION_ADDRESS=0xF39Fd6e51aad88F6F4ce6aB8827279cffFb92266
PROACTIBLE_DEMO_DONATION_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

> **Importante:** la wallet de Proactible incluida aquí es **demo-only** para prototipo local. **No usar en producción, no custodiar fondos reales y no reutilizar la private key.**

## Instalación

```bash
pnpm install
pnpm dev
```

Abrir en `http://localhost:3000`.

## Validación local

```bash
pnpm lint
pnpm build
```

## Contrato Solidity

Archivo:

- `contracts/RutaSagradaPeregrinacion.sol`

Cubre:

- cuota de registro
- split de donación con prioridad a **Proactible**
- check-ins en **5 estaciones**
- asignación de **150 coleccionables** en 3 categorías:
  - Lumbre (50)
  - Vínculo (50)
  - Oráculo (50)

### Split base sugerido

- **68%** Proactible (prótesis y movilidad)
- **22%** operación de ruta
- **10%** reserva cultural

## Estructura principal

```text
src/
  app/
  components/
    ui/
  data/
  lib/
contracts/
.env.example
vercel.json
```

## Preparado para GitHub + Vercel

El repo quedó listo para:

- push a un repositorio público, idealmente `ruta-sagrada-monad-dapp`
- importación directa en Vercel
- configuración de variables de entorno desde dashboard o CLI

Se agregó `vercel.json` básico para dejar claro el framework esperado.

### Nota operativa

Si este entorno local **no tiene credenciales remotas** ya configuradas, el push a GitHub y el deploy a Vercel deberán hacerse después con las credenciales correctas.

Ejemplo esperado fuera de este entorno:

```bash
git remote add origin <tu-repo-github>
git push -u origin main
```

Luego conectar el repo en Vercel o desplegar con:

```bash
vercel
```

## Siguientes pasos recomendados

1. Conectar el formulario REI a escritura onchain real.
2. Tokenizar los 150 coleccionables como ERC-1155 o metadata offchain + mint controller.
3. Agregar contrato de despliegue y scripts.
4. Integrar mapa real o check-ins geolocalizados para las 5 estaciones.
5. Reemplazar wallet demo de Proactible por tesorería real y segura.
