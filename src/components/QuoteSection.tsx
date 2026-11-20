import { useState, type FormEvent } from 'react';
import { CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import {
  buildDiagnosticMessage,
  buildWhatsAppUrl,
  formatBrPhone,
  SYMPTOM_OPTIONS,
  validateQuoteForm,
  type PropertyType,
  type QuoteFormInput,
  type SymptomId,
} from '../utils/wellDiagnostic';

interface QuoteSectionProps {
  selectedSymptoms: SymptomId[];
}

const PROPERTY_TYPES: readonly PropertyType[] = [
  'Residencial',
  'Rural / Sítio',
  'Condomínio',
  'Empresa / Indústria',
];

export function QuoteSection({ selectedSymptoms }: QuoteSectionProps) {
  const [formData, setFormData] = useState<QuoteFormInput>({
    name: '',
    phone: '',
    propertyType: 'Residencial',
    details: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormInput, string>>>({});
  const [submittedPayload, setSubmittedPayload] = useState<{
    summary: QuoteFormInput;
    whatsappUrl: string;
  } | null>(null);

  const selectedSymptomTitles = SYMPTOM_OPTIONS.filter((item) =>
    selectedSymptoms.includes(item.id)
  ).map((item) => item.title);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateQuoteForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const message = buildDiagnosticMessage(selectedSymptoms, formData);
    const whatsappUrl = buildWhatsAppUrl(SITE_CONFIG.whatsappDigits, message);
    setSubmittedPayload({
      summary: { ...formData },
      whatsappUrl,
    });
  }

  return (
    <section
      id="orcamento"
      className="border-y border-slate-200 bg-[#F4F7FA] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left column: Direct contact framing */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#007A99]">Orçamento sem compromisso</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#06234E] [text-wrap:balance] sm:text-4xl">
              Peça uma avaliação técnica para o seu poço
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Preencha os dados ao lado para montar seu pedido organizado ou chame diretamente no
              WhatsApp. Respondemos com clareza sobre o procedimento indicado e disponibilidade de
              atendimento em {SITE_CONFIG.cityRegion}.
            </p>

            <div className="mt-8 space-y-4 border-t border-slate-200 pt-6 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#007A99]" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#06234E]">WhatsApp e Plantão Técnico</p>
                  <p className="font-mono tabular-nums text-slate-600">
                    {SITE_CONFIG.whatsappDisplay}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-[#06234E]">Horário de atendimento</p>
                <p className="text-slate-600">{SITE_CONFIG.serviceHours}</p>
              </div>
            </div>
          </div>

          {/* Right column: Validated interactive lead capture form */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
            {submittedPayload ? (
              <div role="status" data-testid="quote-confirmation" className="space-y-5">
                <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-950">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#06234E]">
                      Pedido preparado com sucesso
                    </h3>
                    <p className="mt-1 text-sm text-slate-700">
                      Clique abaixo para iniciar a conversa no WhatsApp da BMZ Artesiano com todas
                      as informações já preenchidas.
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-1 gap-3 border-y border-slate-200 py-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-slate-500">Solicitante</dt>
                    <dd className="font-semibold text-[#06234E]">
                      {submittedPayload.summary.name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Telefone / WhatsApp</dt>
                    <dd className="font-mono font-medium tabular-nums text-[#06234E]">
                      {submittedPayload.summary.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Tipo de imóvel</dt>
                    <dd className="font-medium text-slate-700">
                      {submittedPayload.summary.propertyType}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Relato</dt>
                    <dd className="text-slate-700">{submittedPayload.summary.details}</dd>
                  </div>
                </dl>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={submittedPayload.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#15803D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#166534]"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Abrir Conversa no WhatsApp Agora</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmittedPayload(null)}
                    className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-[#06234E] transition-colors hover:bg-slate-50"
                  >
                    Editar dados
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {selectedSymptomTitles.length > 0 && (
                  <div className="rounded-lg border border-slate-200 bg-[#F4F7FA] px-4 py-3 text-xs text-slate-700">
                    <span className="font-semibold text-[#06234E]">
                      Sintomas selecionados incluídos no orçamento:
                    </span>{' '}
                    {selectedSymptomTitles.join(' · ')}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-sm font-semibold text-[#06234E]"
                    >
                      Seu nome
                    </label>
                    <input
                      id="quote-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Ex.: Carlos Henrique"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'quote-name-error' : undefined}
                      className="mt-1.5 block min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#007A99] focus:outline-none focus:ring-2 focus:ring-[#007A99]/20"
                    />
                    {errors.name && (
                      <p id="quote-name-error" role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-sm font-semibold text-[#06234E]"
                    >
                      WhatsApp com DDD
                    </label>
                    <input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          phone: formatBrPhone(e.target.value),
                        }));
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="(11) 99999-9999"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'quote-phone-error' : undefined}
                      className="mt-1.5 block min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm tabular-nums text-slate-900 placeholder:font-sans placeholder:text-slate-400 focus:border-[#007A99] focus:outline-none focus:ring-2 focus:ring-[#007A99]/20"
                    />
                    {errors.phone && (
                      <p id="quote-phone-error" role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-property"
                    className="block text-sm font-semibold text-[#06234E]"
                  >
                    Tipo de imóvel
                  </label>
                  <select
                    id="quote-property"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        propertyType: e.target.value as PropertyType,
                      }))
                    }
                    className="mt-1.5 block min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#007A99] focus:outline-none focus:ring-2 focus:ring-[#007A99]/20"
                  >
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="quote-details"
                    className="block text-sm font-semibold text-[#06234E]"
                  >
                    O que está acontecendo com o poço?
                  </label>
                  <textarea
                    id="quote-details"
                    name="details"
                    rows={3}
                    value={formData.details}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, details: e.target.value }));
                      if (errors.details) setErrors((prev) => ({ ...prev, details: undefined }));
                    }}
                    placeholder="Ex.: Água saindo amarelada e com areia há 3 dias, ou bomba desarmando o disjuntor."
                    aria-invalid={Boolean(errors.details)}
                    aria-describedby={errors.details ? 'quote-details-error' : undefined}
                    className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#007A99] focus:outline-none focus:ring-2 focus:ring-[#007A99]/20"
                  />
                  {errors.details && (
                    <p id="quote-details-error" role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.details}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#15803D] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Gerar Orçamento e Enviar no WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
