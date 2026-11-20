import { ArrowDownRight, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/wellDiagnostic';

const MICRO_PROOFS = [
  {
    title: 'Atendimento Rápido',
    detail: 'Prioridade para falta d’água e água turva na região',
  },
  {
    title: 'Equipamento Próprio',
    detail: 'Guincho, compressor e diagnóstico elétrico no local',
  },
  {
    title: 'Foco em Poços Existentes',
    detail: 'Não perfuramos — 100% dedicados a limpeza e reparo',
  },
  {
    title: 'Orçamento sem Compromisso',
    detail: 'Avaliação clara e direta pelo WhatsApp',
  },
] as const;

export function HeroSection() {
  const whatsappHref = buildWhatsAppUrl(
    SITE_CONFIG.whatsappDigits,
    `Olá, BMZ Artesiano! Quero solicitar um orçamento para limpeza de poço artesiano em ${SITE_CONFIG.cityRegion}.`
  );

  return (
    <section id="inicio" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Value proposition + dominant CTA */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#007A99] sm:text-sm">
                Especialistas em poços já existentes · Residencial, Rural, Condomínios e Empresas
              </p>

              <h1 className="mt-4 text-[clamp(1.95rem,3.35vw,3.15rem)] font-extrabold leading-[1.18] tracking-tight text-[#06234E] [text-wrap:balance]">
                Limpeza de Poço Artesiano em {SITE_CONFIG.cityRegion} — Recupere a Vazão e a Água
                Cristalina
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Água barrenta, com areia, gosto de ferrugem ou pouca pressão na caixa d’água? Nossa
                equipe resolve sua urgência com desobstrução técnica, higienização completa e
                conserto de bombas submersas, sem a espera das obras de perfuração.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#15803D] px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D] sm:w-auto"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Pedir Orçamento no WhatsApp</span>
              </a>

              <a
                href="#sinais"
                className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap px-2 py-2 text-sm font-semibold text-[#06234E] underline decoration-[#00A5C2]/60 decoration-2 underline-offset-4 transition-colors hover:text-[#007A99] hover:decoration-[#007A99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007A99]"
              >
                <span>Avaliar sinais do meu poço</span>
                <ArrowDownRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-5 text-xs text-slate-500 sm:text-sm">
              WhatsApp direto:{' '}
              <span className="font-mono font-medium tabular-nums text-slate-700">
                {SITE_CONFIG.whatsappDisplay}
              </span>{' '}
              <span aria-hidden="true">·</span> {SITE_CONFIG.serviceHours}
            </p>
          </div>

          {/* Right column: Authentic uncropped 16:9 Before & After comparison photo */}
          <div className="flex flex-col lg:col-span-6">
            <figure className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-[#06234E]">
              <div className="aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={SITE_CONFIG.assets.beforeAfter}
                  alt="Comparativo antes e depois da limpeza de poço artesiano pela BMZ Artesiano: água barrenta dando lugar a jato de água cristalina e forte vazão"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain"
                />
              </div>
              <figcaption className="flex flex-1 flex-col justify-between border-t border-white/10 bg-[#06234E] px-5 py-4 text-xs leading-relaxed text-slate-200 sm:px-6 sm:py-5 sm:text-sm">
                <p>
                  <strong className="font-semibold text-white">Resultado real em campo:</strong>{' '}
                  remoção completa de lama, areia e ferrugem com restauração imediata da vazão.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-3.5 text-xs">
                  <div>
                    <span className="block text-slate-400">Execução média</span>
                    <span className="mt-0.5 block font-mono font-semibold tabular-nums text-white">
                      4 a 8 horas (mesmo dia)
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-400">Escopo exclusivo</span>
                    <span className="mt-0.5 block font-semibold text-[#38D0E8]">
                      Poços já perfurados
                    </span>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Full-width 4-column micro-proof bar below the hero split */}
      <div className="border-y border-slate-200 bg-[#F4F7FA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {MICRO_PROOFS.map((proof, idx) => (
              <li
                key={proof.title}
                className={`py-5 sm:px-6 sm:py-6 first:sm:pl-0 last:sm:pr-0 ${
                  idx >= 2 ? 'sm:border-t sm:border-slate-200 lg:border-t-0' : ''
                } ${idx % 2 === 1 ? 'sm:border-l sm:border-slate-200' : ''}`}
              >
                <p className="font-display text-sm font-bold text-[#06234E]">{proof.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {proof.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
