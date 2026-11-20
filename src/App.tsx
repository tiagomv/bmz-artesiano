import { useState } from 'react';
import { ConversionFooter } from './components/ConversionFooter';
import { FaqSection } from './components/FaqSection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { QuoteSection } from './components/QuoteSection';
import { ServicesSection } from './components/ServicesSection';
import { SymptomsSection } from './components/SymptomsSection';
import { WhyBmzSection } from './components/WhyBmzSection';
import type { SymptomId } from './utils/wellDiagnostic';

export default function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomId[]>([]);

  function handleToggleSymptom(id: SymptomId) {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleClearSymptoms() {
    setSelectedSymptoms([]);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <SymptomsSection
          selectedSymptoms={selectedSymptoms}
          onToggleSymptom={handleToggleSymptom}
          onClearSymptoms={handleClearSymptoms}
        />
        <WhyBmzSection />
        <QuoteSection selectedSymptoms={selectedSymptoms} />
        <FaqSection />
      </main>
      <ConversionFooter />
    </div>
  );
}
