import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/wellDiagnostic';

export function ServicesSection() {
  const cleaningHref = buildWhatsAppUrl(
    SITE_CONFIG.whatsappDigits,
    'Olá, BMZ Artesiano! Quero orçamento para Limpeza e Higienização de Poço Artesiano.'
  );
  const maintenanceHref = buildWhatsAppUrl(
    SITE_CONFIG.whatsappDigits,
    'Olá, BMZ Artesiano! Quero agendar uma Manutenção de Poço Artesiano.'
  );
  const pumpHref = buildWhatsAppUrl(
    SITE_CONFIG.whatsappDigits,
    'Olá, BMZ Artesiano! Preciso de diagnóstico e conserto de bomba submersa de poço artesiano.'
  );

  return (
    <section id="servicos" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#007A99]">Serviços especializados</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#06234E] [text-wrap:balance] sm:text-4xl">
            Cuidado técnico completo para recuperar a vazão, a qualidade da água e a bomba do seu
            poço
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Atuamos exclusivamente na recuperação e conservação de poços artesianos e semi-artesianos
            já perfurados, com diagnóstico objetivo e execução limpa.
          </p>
        </div>

        {/* Asymmetric editorial bento layout */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* 01. Featured primary service */}
          <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-[#F4F7FA] p-6 sm:p-8 lg:col-span-7">
            <div>
              <p className="font-mono text-sm font-semibold tabular-nums text-[#007A99]">01.</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#06234E]">
                Limpeza e Higienização de Poço Artesiano
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Serviço completo de <strong>limpeza de poço artesiano</strong> indicado para poços
                com água barrenta, presença de areia, odor, gosto de ferrugem ou queda progressiva
                de vazão. Removemos sedimentos acumulados no fundo e desobstruímos os filtros para
                devolver água limpa e fluxo constante.
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-200 pt-6 text-sm text-slate-700 sm:grid-cols-2">
                <li className="border-b border-slate-200/80 pb-2.5 sm:border-b-0 sm:pb-0">
                  Desobstrução de filtros e remoção de lama, areia e argila
                </li>
                <li className="border-b border-slate-200/80 pb-2.5 sm:border-b-0 sm:pb-0">
                  Remoção de incrustações de ferro, manganês e biofilme
                </li>
                <li className="border-b border-slate-200/80 pb-2.5 sm:border-b-0 sm:pb-0">
                  Desinfecção e higienização técnica do revestimento
                </li>
                <li>Recuperação da vazão original e transparência da água</li>
              </ul>
            </div>

            <div className="mt-8">
              <a
                href={cleaningHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#06234E] underline decoration-[#00A5C2] decoration-2 underline-offset-4 transition-colors hover:text-[#007A99]"
              >
                <span>Solicitar limpeza de poço artesiano</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </article>

          {/* 02. Secondary service in high-contrast brand navy */}
          <article className="flex flex-col justify-between rounded-xl bg-[#06234E] p-6 text-white sm:p-8 lg:col-span-5">
            <div>
              <p className="font-mono text-sm font-semibold tabular-nums text-[#38D0E8]">02.</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                Manutenção de Poço Artesiano
              </h3>
              <p className="mt-3 text-base leading-relaxed tracking-[0.01em] text-slate-200">
                A <strong>manutenção de poço artesiano</strong> preventiva evita paradas bruscas,
                reduz o consumo de energia e preserva toda a estrutura hidráulica e elétrica do
                sistema antes que um pequeno desgaste vire prejuízo.
              </p>

              <ul className="mt-6 space-y-3 border-t border-white/15 pt-6 text-sm tracking-[0.01em] text-slate-200">
                <li>Teste de vazão e medição de nível estático e dinâmico</li>
                <li>Inspeção completa da tubulação edutora e conexões</li>
                <li>Revisão de cabos submersíveis, boias e quadro de comando</li>
                <li>Plano preventivo para condomínios, sítios e empresas</li>
              </ul>
            </div>

            <div className="mt-8">
              <a
                href={maintenanceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm font-semibold text-white underline decoration-[#38D0E8] decoration-2 underline-offset-4 transition-colors hover:text-[#38D0E8]"
              >
                <span>Agendar manutenção preventiva</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </article>

          {/* 03. Horizontal split showcase featuring the BMZ technician repairing a submersible pump */}
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white lg:col-span-12">
            <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:p-10">
                <div>
                  <p className="font-mono text-sm font-semibold tabular-nums text-[#007A99]">03.</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#06234E] sm:text-3xl">
                    Conserto de Bombas de Poço Artesiano
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    Seu poço parou de mandar água ou o disjuntor está desarmando? Somos especialistas
                    em <strong>conserto de bombas de poço artesiano</strong> submersas (tipo caneta).
                    Realizamos o saque seguro com equipamento próprio, testes elétricos de precisão e
                    reparo ou substituição dimensionada corretamente para a profundidade do seu poço.
                  </p>

                  <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-bold text-[#06234E]">Saque e reinstalação segura</dt>
                      <dd className="mt-1 text-sm text-slate-600">
                        Equipamento próprio para içamento sem risco de queda da coluna no poço.
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-bold text-[#06234E]">Diagnóstico elétrico real</dt>
                      <dd className="mt-1 text-sm text-slate-600">
                        Avaliação de motor, bombeador, capacitor, relé térmico e quadro de comando.
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-8">
                  <a
                    href={pumpHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-lg bg-[#06234E] px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0B326B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06234E]"
                  >
                    <span>Solicitar diagnóstico de bomba submersa</span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="relative aspect-[16/10] w-full bg-slate-900 lg:col-span-6 lg:aspect-auto">
                <img
                  src={SITE_CONFIG.assets.technicianPump}
                  alt="Técnico uniformizado da BMZ Artesiano realizando manutenção e diagnóstico elétrico em bomba submersa tipo caneta"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
