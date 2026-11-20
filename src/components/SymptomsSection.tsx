import { AlertTriangle, Check, CheckCircle2, Info, MessageCircle, RotateCcw } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import {
  buildDiagnosticMessage,
  buildWhatsAppUrl,
  diagnoseSymptoms,
  SYMPTOM_OPTIONS,
  type SymptomId,
} from '../utils/wellDiagnostic';

interface SymptomsSectionProps {
  selectedSymptoms: SymptomId[];
  onToggleSymptom: (id: SymptomId) => void;
  onClearSymptoms: () => void;
}

export function SymptomsSection({
  selectedSymptoms,
  onToggleSymptom,
  onClearSymptoms,
}: SymptomsSectionProps) {
  const diagnosis = diagnoseSymptoms(selectedSymptoms);
  const whatsappMessage = buildDiagnosticMessage(selectedSymptoms);
  const whatsappHref = buildWhatsAppUrl(SITE_CONFIG.whatsappDigits, whatsappMessage);

  const urgencyStyles =
    diagnosis.urgency === 'alta'
      ? {
          container: 'border-red-200 bg-red-50/70 text-red-900',
          icon: <AlertTriangle className="h-5 w-5 shrink-0 text-red-700" aria-hidden="true" />,
        }
      : diagnosis.urgency === 'media'
        ? {
            container: 'border-amber-200 bg-amber-50/80 text-amber-950',
            icon: <Info className="h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />,
          }
        : {
            container: 'border-slate-200 bg-[#F4F7FA] text-[#06234E]',
            icon: <CheckCircle2 className="h-5 w-5 shrink-0 text-[#007A99]" aria-hidden="true" />,
          };

  return (
    <section
      id="sinais"
      className="border-y border-slate-200 bg-[#F4F7FA] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#007A99]">Diagnóstico rápido</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#06234E] [text-wrap:balance] sm:text-4xl">
            Sinais de que seu poço artesiano precisa de atenção imediata
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Marque abaixo os sintomas que você está observando. Montamos a recomendação técnica na
            hora para você já enviar o diagnóstico pronto no WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Interactive symptom checklist */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
            {SYMPTOM_OPTIONS.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom.id);
              return (
                <button
                  key={symptom.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onToggleSymptom(symptom.id)}
                  className={`flex min-h-[124px] flex-col justify-between rounded-xl border p-5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007A99] ${
                    isSelected
                      ? 'border-[#06234E] bg-white ring-1 ring-[#06234E]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-display text-base font-bold leading-snug text-[#06234E]">
                      {symptom.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                        isSelected
                          ? 'border-[#06234E] bg-[#06234E] text-white'
                          : 'border-slate-300 bg-white text-transparent'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {symptom.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Live diagnostic recommendation card */}
          <aside
            aria-live="polite"
            data-testid="diagnostic-summary"
            className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 lg:sticky lg:top-24 lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-medium text-slate-500">Resumo da avaliação</p>
                <p className="mt-0.5 font-display text-lg font-bold text-[#06234E]">
                  <span className="font-mono tabular-nums">{diagnosis.count}</span>{' '}
                  {diagnosis.count === 1 ? 'sinal selecionado' : 'sinais selecionados'}
                </p>
              </div>
              {diagnosis.count > 0 && (
                <button
                  type="button"
                  onClick={onClearSymptoms}
                  className="inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#06234E]"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Limpar</span>
                </button>
              )}
            </div>

            <div className={`mt-5 flex items-start gap-3 rounded-lg border p-4 ${urgencyStyles.container}`}>
              {urgencyStyles.icon}
              <div>
                <p className="text-xs font-bold">{diagnosis.urgencyLabel}</p>
                <p className="mt-1 font-display text-base font-bold text-[#06234E]">
                  {diagnosis.recommendedService}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">{diagnosis.explanation}</p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#15803D] px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {diagnosis.count > 0
                    ? 'Enviar Diagnóstico no WhatsApp'
                    : 'Pedir Avaliação no WhatsApp'}
                </span>
              </a>

              <a
                href="#orcamento"
                className="inline-flex min-h-11 w-full items-center justify-center whitespace-nowrap rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#06234E] transition-colors hover:bg-slate-50"
              >
                Preencher formulário de orçamento
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
