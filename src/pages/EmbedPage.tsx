import React from 'react';
import { useParams } from 'react-router-dom';
import { QuoteEstimator } from '../components/tools/QuoteEstimator';
import { AreaCalculator } from '../components/tools/AreaCalculator';
import { MissedCallWidget } from '../components/tools/MissedCallWidget';
import { BeforeAfterSlider } from '../components/tools/BeforeAfterSlider';
import { BookingForm } from '../components/tools/BookingForm';

function renderTool(toolId: string | undefined) {
  switch (toolId) {
    case 'quote-calculator': return <QuoteEstimator />;
    case 'area-calculator':  return <AreaCalculator />;
    case 'missed-call':      return <MissedCallWidget />;
    case 'before-after':     return <BeforeAfterSlider />;
    case 'booking-form':     return <BookingForm />;
    default:                 return <QuoteEstimator />;
  }
}

export function EmbedPage() {
  const { toolId } = useParams<{ toolId: string }>();
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-2">
      {renderTool(toolId)}
    </div>
  );
}

