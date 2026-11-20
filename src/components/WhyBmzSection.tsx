import { Check, Minus } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    aspect: 'Foco da operação',
    competitors: 'Obras longas de perfuração com agenda travada por semanas',
    bmz: '100% focada em limpeza, manutenção e bombas de poços já existentes',
  },
  {
    aspect: 'Tempo de resposta em emergências',
    competitors: 'Manutenção fica em segundo plano quando há perfuração ativa',
    bmz: 'Equipe móvel ágil para urgências de falta d’água ou água barrenta',
  },
  {
    aspect: 'Equipamento para imóveis prontos',
    competitors: 'Caminhões perfuratrizes pesados que não entram em quintais ou condomínios',
    bmz: 'Frota compacta e guincho próprio para residências, sítios, condomínios e empresas',
  },
  {
    aspect: 'Diagnóstico de bomba submersa',
    competitors: 'Frequentemente indicam troca total sem avaliar reparo ou quadro elétrico',
    bmz: 'Testes elétricos em campo para consertar ou substituir apenas o necessário',
  },
] as const;

export function WhyBmzSection() {
  return (
    <section id="diferenciais" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-[#007A99]">Por que escolher a BMZ Artesiano</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#06234E] [text-wrap:balance] sm:text-4xl">
              Não fazemos perfuração: somos a empresa de limpeza de poço artesiano dedicada a quem
              precisa de solução agora
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-slate-600">
              Muitas <strong>empresas de poços artesianos</strong> priorizam contratos grandes de
              perfuração e demoram dias — ou semanas — para atender um chamado de bomba parada ou
              água turva. A BMZ Artesiano nasceu justamente para fazer o oposto: cuidar com rapidez
              e rigor técnico do poço que você já tem.
            </p>
          </div>
        </div>

        {/* Clean editorial comparison table */}
        <div className="mt-12 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="hidden grid-cols-12 border-b border-slate-200 bg-[#F4F7FA] px-6 py-4 text-xs font-bold tracking-wide text-slate-500 lg:grid">
            <div className="col-span-3">Critério técnico</div>
            <div className="col-span-4">Empresas focadas em perfuração</div>
            <div className="col-span-5 text-[#06234E]">BMZ Artesiano — Especialista</div>
          </div>

          <div className="divide-y divide-slate-200">
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.aspect}
                className="grid grid-cols-1 gap-4 px-5 py-6 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-6"
              >
                <div className="font-display text-base font-bold text-[#06234E] lg:col-span-3">
                  {row.aspect}
                </div>

                <div className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-500 lg:col-span-4">
                  <Minus className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  <span>{row.competitors}</span>
                </div>

                <div className="flex items-start gap-2.5 text-sm font-medium leading-relaxed text-[#06234E] lg:col-span-5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#007A99]" aria-hidden="true" />
                  <span>{row.bmz}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client segments served */}
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
          <span className="font-semibold text-[#06234E]">Atendimento especializado para:</span>
          <span>Residências e chácaras</span>
          <span aria-hidden="true">·</span>
          <span>Propriedades rurais e sítios</span>
          <span aria-hidden="true">·</span>
          <span>Condomínios</span>
          <span aria-hidden="true">·</span>
          <span>Empresas e indústrias</span>
        </div>
      </div>
    </section>
  );
}
