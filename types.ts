export interface EquipmentData {
  brand: string;
  modelNumber: string;
  serialNumber: string;
  manufactureDate: string; // e.g., "February 2011"
  ageYears: number;
  warrantyStatus: 'Active' | 'Expired' | 'Unknown';
  warrantyNotes: string; // e.g., "Standard 10-year parts warranty expired in 2021"
  manualUrl?: string;
  recommendation: 'Repair' | 'Replace' | 'Consult';
  recommendationReason: string;
  costAnalysis: {
    estimatedRepairCost: number;
    replacementOpportunity: number;
    savedTruckRollCost: number;
  };
}

export type AppStatus = 'idle' | 'analyzing' | 'complete' | 'error';

export interface LogEntry {
  id: string;
  message: string;
  timestamp: number;
}
