import React from 'react';
import { useParams } from 'react-router-dom';
import { QuoteEstimator } from '../components/tools/QuoteEstimator';
import { MissedCallWidget } from '../components/tools/MissedCallWidget';

function renderTool(toolId: string | undefined) {
  switch (toolId) {
    case 'quote-calculator': return <QuoteEstimator />;
    case 'missed-call':      return <MissedCallWidget />;
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

