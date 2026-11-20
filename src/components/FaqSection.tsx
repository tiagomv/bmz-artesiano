import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'frequencia-limpeza',
    question: 'De quanto em quanto tempo devo fazer limpeza de poço artesiano?',
    answer:
      'A recomendação técnica preventiva é realizar a limpeza de poço artesiano a cada 2 a 3 anos, mesmo que a água pareça normal. Porém, se você notar água amarelada, presença de areia, gosto de ferrugem ou queda de pressão, a higienização e desobstrução devem ser feitas imediatamente para evitar danos à bomba submersa.',
  },
  {
    id: 'bomba-queimou',
    question: 'Como saber se a bomba submersa queimou ou precisa de conserto?',
    answer:
      'Quando o disjuntor desarma ao ligar, o quadro de comando esquenta, a conta de luz sobe sem motivo ou a bomba gira sem enviar água para a caixa, há grande chance de falha elétrica, travamento por areia ou desgaste nos estágios do bombeador. Nossa equipe de conserto de bombas de poço artesiano testa a parte elétrica e realiza o saque seguro antes de indicar reparo ou substituição.',
  },
  {
    id: 'tempo-servico',
    question: 'Quanto tempo leva o serviço de limpeza e manutenção de poço artesiano?',
    answer:
      'Na grande maioria dos poços residenciais, chácaras e sítios, o serviço completo — saque da bomba, remoção de lama e incrustações, desinfecção, revisão elétrica e reinstalação — é concluído no mesmo dia, levando em média entre 4 e 8 horas dependendo da profundidade do poço.',
  },
  {
    id: 'perfuracao',
    question: 'A BMZ Artesiano faz perfuração de poços artesianos novos?',
    answer:
      'Não realizamos perfuração. Diferente de muitas empresas de poços artesianos focadas em obras de perfuração que demoram semanas para atender reparos, somos uma empresa de limpeza de poço artesiano, manutenção preventiva e conserto de bombas dedicada 100% a poços já existentes.',
  },
  {
    id: 'tipos-imoveis',
    question: 'Quais tipos de imóveis e poços vocês atendem?',
    answer:
      'Atendemos poços artesianos e semi-artesianos em residências, sítios, fazendas, condomínios horizontais ou verticais, comércios e indústrias. Contamos com equipamento próprio e compacto que acessa locais prontos sem quebrar jardins ou pisos.',
  },
] as const;

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section id="duvidas" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-[#007A99]">Perguntas frequentes</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#06234E] [text-wrap:balance] sm:text-4xl">
            Dúvidas comuns sobre limpeza, manutenção e bombas de poço artesiano
          </h2>
        </div>

        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left font-display text-base font-bold text-[#06234E] transition-colors hover:text-[#007A99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007A99] sm:text-lg"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#007A99] transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={`faq-panel-${item.id}`}
                    className="pb-6 pr-8 text-sm leading-relaxed text-slate-600 sm:text-base"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
