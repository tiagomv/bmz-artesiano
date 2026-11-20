import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/wellDiagnostic';

export function ConversionFooter() {
  const whatsappHref = buildWhatsAppUrl(
    SITE_CONFIG.whatsappDigits,
    `Olá, BMZ Artesiano! Preciso de atendimento rápido para meu poço artesiano em ${SITE_CONFIG.cityRegion}.`
  );

  return (
    <footer className="bg-[#06234E] text-white">
      {/* Final conversion CTA band */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/15 pb-14 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-[#38D0E8]">
              Atendimento direto com especialistas
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Volte a ter água limpa e forte vazão no seu poço sem perder dias esperando
            </h2>
            <p className="mt-4 text-base leading-relaxed tracking-[0.01em] text-slate-200">
              Envie uma mensagem no WhatsApp agora mesmo, conte o sintoma do seu poço e receba uma
              avaliação rápida e transparente da equipe BMZ Artesiano.
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-3 sm:w-auto lg:items-end">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#15803D] px-7 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Chamar a BMZ no WhatsApp</span>
            </a>
            <p className="text-xs tracking-[0.01em] text-slate-300">
              WhatsApp:{' '}
              <span className="font-mono tabular-nums text-white">
                {SITE_CONFIG.whatsappDisplay}
              </span>{' '}
              <span aria-hidden="true">·</span> Orçamento sem compromisso
            </p>
          </div>
        </div>

        {/* Quiet footer info row */}
        <div className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <a
              href="#inicio"
              aria-label="Voltar ao início — BMZ Artesiano"
              className="inline-flex rounded-lg bg-white px-3.5 py-2"
            >
              <img
                src={SITE_CONFIG.assets.logo}
                alt="BMZ Artesiano — Manutenção e Limpeza de Poços"
                referrerPolicy="no-referrer"
                className="h-12 w-auto object-contain"
              />
            </a>
            <div className="text-xs leading-relaxed text-slate-300">
              <p className="font-semibold text-white">
                BMZ Artesiano · {SITE_CONFIG.cityRegion}
              </p>
              <p>Especialistas em limpeza, manutenção e conserto de bombas de poços existentes.</p>
            </div>
          </div>

          <nav aria-label="Links do rodapé" className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
            <a href="#servicos" className="transition-colors hover:text-white">
              Serviços
            </a>
            <a href="#sinais" className="transition-colors hover:text-white">
              Sinais de Alerta
            </a>
            <a href="#diferenciais" className="transition-colors hover:text-white">
              Diferenciais
            </a>
            <a href="#orcamento" className="transition-colors hover:text-white">
              Orçamento
            </a>
            <a href="#duvidas" className="transition-colors hover:text-white">
              Dúvidas
            </a>
          </nav>
        </div>

        <p className="mt-8 border-t border-white/10 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} {SITE_CONFIG.companyName}. Todos os direitos reservados. Não
          realizamos perfuração de poços.
        </p>
      </div>
    </footer>
  );
}
