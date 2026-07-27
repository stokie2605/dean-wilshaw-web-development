export interface ChatMessage {
  id: string;
  sender: 'user' | 'stitch';
  text: string;
  timestamp: Date;
}

export interface QuoteFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  details: string;
}

export interface QuoteResult {
  refNumber: string;
  clientName: string;
  estimatedCost: string;
  turnaround: string;
  message: string;
}

export interface BenchmarkData {
  domain: string;
  wordpress: {
    loadTimeSeconds: number;
    pageWeightMB: number;
    lighthouseScore: number;
    vulnerabilities: number;
    pluginCount: number;
  };
  reactBuild: {
    loadTimeSeconds: number;
    pageWeightMB: number;
    lighthouseScore: number;
    vulnerabilities: number;
    pluginCount: number;
  };
  estimatedConversionGain: string;
}

