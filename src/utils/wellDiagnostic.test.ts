import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDiagnosticMessage,
  buildWhatsAppUrl,
  diagnoseSymptoms,
  formatBrPhone,
  validateQuoteForm,
} from './wellDiagnostic';

test('diagnoseSymptoms returns preventive prompt when no symptoms selected', () => {
  const result = diagnoseSymptoms([]);
  assert.equal(result.count, 0);
  assert.equal(result.urgency, 'preventiva');
  assert.equal(result.recommendedService, 'Avaliação Técnica Preventiva');
});

test('diagnoseSymptoms recommends limpeza for turbid water or sand', () => {
  const result = diagnoseSymptoms(['agua-turva', 'presenca-areia']);
  assert.equal(result.count, 2);
  assert.equal(result.urgency, 'media');
  assert.match(result.recommendedService, /Limpeza/);
});

test('diagnoseSymptoms escalates to alta urgency when breaker trips or pump + water issues combine', () => {
  const pumpOnly = diagnoseSymptoms(['bomba-desarmando']);
  assert.equal(pumpOnly.urgency, 'alta');
  assert.match(pumpOnly.recommendedService, /Bomba Submersa/);

  const combined = diagnoseSymptoms(['agua-turva', 'bomba-desarmando']);
  assert.equal(combined.count, 2);
  assert.equal(combined.urgency, 'alta');
  assert.match(combined.recommendedService, /Limpeza de Poço \+ Conserto de Bomba/);
});

test('formatBrPhone formats 10-digit and 11-digit Brazilian numbers', () => {
  assert.equal(formatBrPhone('11987654321'), '(11) 98765-4321');
  assert.equal(formatBrPhone('1133445566'), '(11) 3344-5566');
  assert.equal(formatBrPhone('(19) 99123-4567 extra'), '(19) 99123-4567');
  assert.equal(formatBrPhone(''), '');
});

test('validateQuoteForm rejects invalid inputs and accepts valid data', () => {
  const invalid = validateQuoteForm({
    name: 'A',
    phone: '11999',
    propertyType: 'Residencial',
    details: 'oi',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.details);

  const valid = validateQuoteForm({
    name: 'Carlos Henrique',
    phone: '(11) 98765-4321',
    propertyType: 'Condomínio',
    details: 'Água saindo barrenta há dois dias.',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildWhatsAppUrl and buildDiagnosticMessage produce properly encoded WhatsApp links', () => {
  const message = buildDiagnosticMessage(['agua-turva'], {
    name: 'Mariana Silva',
    phone: '(11) 98888-7777',
    propertyType: 'Rural / Sítio',
    details: 'Queda de pressão na caixa principal.',
  });
  assert.match(message, /Mariana Silva/);
  assert.match(message, /Rural \/ Sítio/);
  assert.match(message, /Água amarelada/);

  const url = buildWhatsAppUrl('+55 (11) 99999-9999', message);
  assert.ok(url.startsWith('https://wa.me/5511999999999?text='));
  assert.ok(url.includes(encodeURIComponent('Mariana Silva')));
});
