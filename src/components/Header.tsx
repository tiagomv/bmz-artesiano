import { useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/wellDiagnostic';

const NAV_LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#sinais', label: 'Sinais de Alerta' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#duvidas', label: 'Dúvidas' },
] as const;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappHref = buildWhatsAppUrl(
    SITE_CONFIG.whatsappDigits,
    SITE_CONFIG.defaultWhatsAppMessage
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single brand element */}
        <a
          href="#inicio"
          aria-label="BMZ Artesiano — Página inicial"
          className="flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007A99]"
        >
          <img
            src={SITE_CONFIG.assets.logo}
            alt="BMZ Artesiano — Manutenção e Limpeza de Poços"
            referrerPolicy="no-referrer"
            className="h-14 w-auto object-contain sm:h-16"
          />
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap text-sm font-medium text-slate-600 transition-colors duration-150 hover:text-[#06234E] hover:underline hover:decoration-[#00A5C2] hover:decoration-2 hover:underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007A99]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#15803D] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D] sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Orçamento WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-[#06234E] transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007A99] md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 md:hidden"
        >
          <nav aria-label="Navegação mobile" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#06234E]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#15803D] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#166534]"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Pedir Orçamento no WhatsApp</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
