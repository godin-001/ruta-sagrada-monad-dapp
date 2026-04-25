"use client";

import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Copy,
  ExternalLink,
  Fingerprint,
  Heart,
  MapPinned,
  Orbit,
  Radio,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  collectibleCategories,
  decalogo,
  heroStats,
  memorialWords,
  pulseCards,
  reiDefaults,
  stationFlow,
} from "@/data/prototype";
import { monadTestnet, proactibleDemoDonationAddress } from "@/lib/monad";
import { cn, formatMono } from "@/lib/utils";

const monadExplorerUrl = monadTestnet.blockExplorers?.default?.url ?? "https://testnet.monadexplorer.com";

export function DashboardShell() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [reiAlias, setReiAlias] = useState(reiDefaults.alias);
  const [reiIntention, setReiIntention] = useState(reiDefaults.intention);
  const [reiPledge, setReiPledge] = useState(reiDefaults.pledge);
  const [copied, setCopied] = useState(false);

  const completion = useMemo(
    () => stationFlow.reduce((acc, station) => acc + station.progress, 0) / stationFlow.length,
    [],
  );

  const activeConnector = connectors[0];

  const copyAddress = async () => {
    await navigator.clipboard.writeText(proactibleDemoDonationAddress);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 px-4 py-6 text-white sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#120f1f] p-5 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(244,114,182,0.16),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0))]" />
        <div className="relative flex flex-col gap-8">
          <div className="flex items-center justify-between gap-3">
            <Badge>Monad Testnet · Ruta Sagrada</Badge>
            <Badge className="bg-emerald-300/10 text-emerald-200">Beneficiaria: Proactible</Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.9fr]">
            <div className="space-y-5">
              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Ruta Sagrada: El Regalo de México para el Mundo - <span className="text-amber-200">Powered by Monad</span>
                </h1>
                <p className="max-w-xl text-sm leading-7 text-white/72 sm:text-base">
                  Prototipo dApp para registrar identidad ritual, caminar cinco estaciones y dirigir donaciones demo para prótesis a <strong>Proactible</strong> con narrativa cultural, prueba social y coleccionables vivos.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {heroStats.map((item) => (
                  <Card key={item.label} className="bg-white/6">
                    <CardContent className="p-4">
                      <p className="text-xl font-semibold text-amber-100">{item.value}</p>
                      <p className="mt-1 text-xs text-white/58">{item.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {isConnected ? (
                  <>
                    <Button size="lg" className="justify-between sm:min-w-52" onClick={() => disconnect()}>
                      <span className="flex items-center gap-2"><Wallet className="h-4 w-4" /> {address?.slice(0, 6)}…{address?.slice(-4)}</span>
                      <span className="text-xs text-zinc-900/70">Desconectar</span>
                    </Button>
                    <Button variant="secondary" size="lg" asChild>
                      <a href="#rei-form">Continuar ritual <ArrowRight className="h-4 w-4" /></a>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="sm:min-w-52"
                      onClick={() => activeConnector && connect({ connector: activeConnector })}
                      disabled={!activeConnector || isPending}
                    >
                      <Wallet className="h-4 w-4" />
                      {isPending ? "Conectando wallet…" : "Conectar wallet"}
                    </Button>
                    <Button variant="secondary" size="lg" asChild>
                      <a href={`#proactible-wallet`}>Ver wallet demo Proactible <ChevronRight className="h-4 w-4" /></a>
                    </Button>
                  </>
                )}
              </div>
            </div>

            <Card className="bg-black/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Radio className="h-5 w-5 text-emerald-200" /> Monad Identity Pulse</CardTitle>
                <CardDescription>
                  Indicador de preparación onchain para registro, donación demo a Proactible y check-ins narrativos.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pulseCards.map((card) => (
                  <div key={card.title} className="rounded-3xl border border-white/10 bg-white/6 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-white/62">{card.title}</p>
                        <p className="text-2xl font-semibold text-white">{card.value}</p>
                      </div>
                      <Orbit className="h-5 w-5 text-amber-200" />
                    </div>
                    <p className="mt-2 text-sm text-white/60">{card.detail}</p>
                  </div>
                ))}

                <div className="rounded-3xl border border-amber-200/20 bg-amber-200/8 p-4 text-sm text-amber-50">
                  <div className="flex items-center gap-2 font-medium">
                    <ShieldCheck className="h-4 w-4" />
                    Estado de red
                  </div>
                  <p className="mt-2 text-amber-50/80">
                    {chain?.id === monadTestnet.id
                      ? `Conectada a ${monadTestnet.name}.`
                      : `Config lista para ${monadTestnet.name} (${monadTestnet.id}).`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1.02fr]">
        <Card id="rei-form">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Fingerprint className="h-5 w-5 text-amber-200" /> Firma REI</CardTitle>
            <CardDescription>
              Registro de Experiencia e Intención para crear folio, intención y compromiso antes de caminar la ruta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.18em] text-white/55">Alias ritual</label>
              <Input value={reiAlias} onChange={(e) => setReiAlias(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.18em] text-white/55">Intención de impacto</label>
              <Textarea value={reiIntention} onChange={(e) => setReiIntention(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.18em] text-white/55">Decálogo firmado</label>
              <Textarea value={reiPledge} onChange={(e) => setReiPledge(e.target.value)} />
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/55">Resumen en vivo</p>
              <div className="mt-3 space-y-2 text-sm text-white/75">
                <p><strong className="text-white">{reiAlias}</strong> caminará con un manifiesto que activa donación demo a Proactible.</p>
                <p>{reiIntention}</p>
                <p className="text-amber-100">“{reiPledge}”</p>
              </div>
            </div>

            <Button size="lg" className="w-full justify-between">
              Guardar firma REI
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card id="proactible-wallet">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-rose-200" /> Wallet demo Proactible</CardTitle>
            <CardDescription>
              Dirección de demostración para visualizar el flujo solidario de prótesis. No usar en producción.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/55">Beneficiaria solidaria</p>
              <p className="mt-2 text-lg font-semibold text-white">Proactible</p>
              <p className="mt-3 break-all font-mono text-sm text-amber-100">{proactibleDemoDonationAddress}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" className="w-full" onClick={copyAddress}>
                <Copy className="h-4 w-4" /> {copied ? "Copiada" : "Copiar dirección"}
              </Button>
              <Button variant="secondary" className="w-full" asChild>
                <a href={monadExplorerUrl} target="_blank" rel="noreferrer">
                  Explorer <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="rounded-3xl border border-emerald-300/15 bg-emerald-300/8 p-4 text-sm text-emerald-50/90">
              <p className="font-medium">Split narrativo sugerido</p>
              <ul className="mt-2 space-y-1 text-emerald-50/80">
                <li>• 68% a Proactible para prótesis y movilidad.</li>
                <li>• 22% operación de ruta, estaciones y memoria viva.</li>
                <li>• 10% reserva cultural y arte digital del recorrido.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPinned className="h-5 w-5 text-sky-200" /> Flujo de estaciones</CardTitle>
            <CardDescription>
              Cinco check-ins para trazar presencia, identidad y avance del impacto colectivo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between text-sm text-white/68">
                <span>Progreso ritual</span>
                <span>{formatMono(completion)}%</span>
              </div>
              <Progress value={completion} className="mt-3" />
            </div>
            <div className="space-y-3">
              {stationFlow.map((station) => (
                <div key={station.id} className="rounded-3xl border border-white/10 bg-white/6 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">Estación {station.id}</p>
                      <p className="text-base font-medium text-white">{station.name}</p>
                    </div>
                    <Badge className="text-[10px]">{station.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-white/62">{station.note}</p>
                  <Progress value={station.progress} className="mt-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-fuchsia-200" /> Firma del Decálogo</CardTitle>
            <CardDescription>
              Principios que convierten la experiencia en un activo cultural y solidario.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {decalogo.map((rule, index) => (
              <div key={rule} className="rounded-3xl border border-white/10 bg-white/6 p-4 text-sm text-white/74">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-100/70">Mandato {index + 1}</p>
                <p className="mt-2">{rule}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <Card>
          <CardHeader>
            <CardTitle>Memorial de palabras</CardTitle>
            <CardDescription>
              Nube emocional para visualizar lo que la comunidad firma, recuerda y dona en la ruta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {memorialWords.map((word, index) => (
                <span
                  key={word}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm",
                    index % 3 === 0 && "border-amber-200/30 bg-amber-200/10 text-amber-100",
                    index % 3 === 1 && "border-fuchsia-200/25 bg-fuchsia-200/10 text-fuchsia-100",
                    index % 3 === 2 && "border-emerald-200/25 bg-emerald-200/10 text-emerald-100",
                  )}
                >
                  {word}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Galería de coleccionables</CardTitle>
            <CardDescription>
              150 piezas divididas en tres categorías para premiar presencia, donación y culminación del recorrido.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            {collectibleCategories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.title}
                  className={cn(
                    "relative overflow-hidden rounded-[28px] border border-white/10 bg-black/20 p-4",
                    "bg-gradient-to-br",
                    category.gradient,
                  )}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-white" />
                      <Badge>{category.total} piezas</Badge>
                    </div>
                    <p className="mt-6 text-lg font-semibold text-white">{category.title}</p>
                    <p className="mt-2 text-sm text-white/65">{category.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

