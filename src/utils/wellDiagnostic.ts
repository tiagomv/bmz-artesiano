export type SymptomId =
  | 'agua-turva'
  | 'presenca-areia'
  | 'queda-vazao'
  | 'bomba-desarmando'
  | 'sem-manutencao'
  | 'conta-energia';

export type PropertyType = 'Residencial' | 'Rural / Sítio' | 'Condomínio' | 'Empresa / Indústria';

export type UrgencyLevel = 'preventiva' | 'media' | 'alta';

export interface SymptomOption {
  id: SymptomId;
  title: string;
  description: string;
  category: 'limpeza' | 'bomba' | 'manutencao';
}

export const SYMPTOM_OPTIONS: readonly SymptomOption[] = [
  {
    id: 'agua-turva',
    title: 'Água amarelada, barrenta ou com gosto de ferrugem',
    description: 'Indica acúmulo de lama, oxidação de ferro/manganês ou incrustação nos filtros do poço.',
    category: 'limpeza',
  },
  {
    id: 'presenca-areia',
    title: 'Presença de areia ou sedimentos na caixa d’água',
    description: 'Partículas abrasivas entopem registros, danificam rotores da bomba e contaminam o reservatório.',
    category: 'limpeza',
  },
  {
    id: 'queda-vazao',
    title: 'Queda repentina na vazão ou pouca pressão',
    description: 'Pode indicar colmatação dos filtros, vazamento na tubulação edutora ou desgaste no bombeador.',
    category: 'manutencao',
  },
  {
    id: 'bomba-desarmando',
    title: 'Bomba desarmando o disjuntor ou sem puxar água',
    description: 'Sinal de travamento mecânico, capacitor avariado, cabo comprometido ou motor submerso em curto.',
    category: 'bomba',
  },
  {
    id: 'sem-manutencao',
    title: 'Mais de 2 anos sem limpeza ou revisão preventiva',
    description: 'O acúmulo silencioso de biofilme e minerais reduz a vida útil do poço e da bomba submersa.',
    category: 'manutencao',
  },
  {
    id: 'conta-energia',
    title: 'Aumento inesperado na conta de energia elétrica',
    description: 'Bombas submersas trabalhando forçadas por entupimento ou desgaste consomem muito mais amperagem.',
    category: 'bomba',
  },
] as const;

export interface DiagnosticSummary {
  count: number;
  urgency: UrgencyLevel;
  urgencyLabel: string;
  recommendedService: string;
  explanation: string;
}

export function diagnoseSymptoms(selectedIds: SymptomId[]): DiagnosticSummary {
  const unique = Array.from(new Set(selectedIds));
  if (unique.length === 0) {
    return {
      count: 0,
      urgency: 'preventiva',
      urgencyLabel: 'Selecione os sinais do seu poço',
      recommendedService: 'Avaliação Técnica Preventiva',
      explanation:
        'Marque um ou mais sintomas ao lado para receber uma recomendação técnica imediata e enviar o resumo direto para nossa equipe.',
    };
  }

  const selectedItems = SYMPTOM_OPTIONS.filter((item) => unique.includes(item.id));
  const hasBomba = selectedItems.some((item) => item.category === 'bomba');
  const hasLimpeza = selectedItems.some((item) => item.category === 'limpeza');
  const hasCriticalPump = unique.includes('bomba-desarmando');

  if (hasCriticalPump || (hasBomba && hasLimpeza)) {
    return {
      count: unique.length,
      urgency: 'alta',
      urgencyLabel: 'Urgência Alta — Atendimento Prioritário',
      recommendedService:
        hasBomba && hasLimpeza
          ? 'Limpeza de Poço + Conserto de Bomba Submersa'
          : 'Diagnóstico e Conserto de Bomba Submersa',
      explanation:
        'Evite religar a bomba repetidamente para não queimar o motor ou agravar danos no quadro elétrico. Recomendamos saque e inspeção técnica imediata.',
    };
  }

  if (hasLimpeza || unique.length >= 2) {
    return {
      count: unique.length,
      urgency: 'media',
      urgencyLabel: 'Atenção Recomendada — Ação Rápida',
      recommendedService: 'Limpeza, Desobstrução e Higienização de Poço Artesiano',
      explanation:
        'A limpeza técnica remove lama, areia e incrustações antes que travem o bombeador, restaurando a vazão e a transparência da água.',
    };
  }

  return {
    count: unique.length,
    urgency: 'preventiva',
    urgencyLabel: 'Revisão Preventiva Indicada',
    recommendedService: 'Manutenção Preventiva de Poço Artesiano',
    explanation:
      'Uma revisão com teste de vazão, medição de amperagem e checagem da tubulação evita paradas inesperadas e prolonga a vida útil do equipamento.',
  };
}

export function formatBrPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export interface QuoteFormInput {
  name: string;
  phone: string;
  propertyType: PropertyType;
  details: string;
}

export interface QuoteValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof QuoteFormInput, string>>;
}

export function validateQuoteForm(input: QuoteFormInput): QuoteValidationResult {
  const errors: Partial<Record<keyof QuoteFormInput, string>> = {};
  const trimmedName = input.name.trim();
  const phoneDigits = input.phone.replace(/\D/g, '');
  const trimmedDetails = input.details.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Informe seu nome para iniciarmos o atendimento.';
  }

  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.phone = 'Informe um WhatsApp ou telefone válido com DDD (10 ou 11 dígitos).';
  }

  if (trimmedDetails.length < 6) {
    errors.details = 'Descreva brevemente o problema (ex.: água turva, bomba parada, limpeza).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildWhatsAppUrl(whatsappDigits: string, message: string): string {
  const cleanNumber = whatsappDigits.replace(/\D/g, '');
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}

export function buildDiagnosticMessage(
  selectedIds: SymptomId[],
  formData?: QuoteFormInput
): string {
  const selectedTitles = SYMPTOM_OPTIONS.filter((item) => selectedIds.includes(item.id)).map(
    (item) => `- ${item.title}`
  );

  const lines: string[] = ['Olá, BMZ Artesiano! Gostaria de solicitar um orçamento técnico.'];

  if (formData) {
    lines.push(`Nome: ${formData.name.trim()}`);
    lines.push(`Telefone: ${formData.phone.trim()}`);
    lines.push(`Tipo de imóvel: ${formData.propertyType}`);
    lines.push(`Situação relatada: ${formData.details.trim()}`);
  }

  if (selectedTitles.length > 0) {
    const diagnosis = diagnoseSymptoms(selectedIds);
    lines.push(`Serviço indicado: ${diagnosis.recommendedService}`);
    lines.push('Sinais observados no poço:');
    lines.push(...selectedTitles);
  }

  return lines.join('\n');
}
