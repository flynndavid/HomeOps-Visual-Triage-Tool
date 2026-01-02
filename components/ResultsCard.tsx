import React from 'react';
import { EquipmentData } from '../types';
import { AlertTriangle, CheckCircle, ExternalLink, Calendar, ShieldAlert, BadgeDollarSign, FileText, Printer, Zap, RefreshCw } from 'lucide-react';

interface ResultsCardProps {
  data: EquipmentData;
  onReset: () => void;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({ data, onReset }) => {
  const isOldOrExpired = data.ageYears > 12 || data.warrantyStatus === 'Expired';
  const headerColor = isOldOrExpired ? 'bg-orange-600 print:bg-white print:text-black' : 'bg-green-600 print:bg-white print:text-black';
  const borderColor = isOldOrExpired ? 'border-orange-200' : 'border-green-200';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in print:max-w-full print:pb-0">
      
      {/* Print-only Header */}
      <div className="hidden print:flex items-center justify-between mb-8 border-b-2 border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <Zap size={24} className="text-black"/>
            <h1 className="text-2xl font-bold">Visual Triage Report</h1>
          </div>
          <div className="text-sm text-gray-500">
            Generated: {new Date().toLocaleDateString()}
          </div>
      </div>

      {/* Main Analysis Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-8 print:shadow-none print:border-gray-800 print:border-2">
        <div className={`${headerColor} px-6 py-4 flex justify-between items-center text-white print:text-black print:border-b print:border-gray-300`}>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                {isOldOrExpired ? <AlertTriangle size={24} className="print:text-orange-600" /> : <CheckCircle size={24} className="print:text-green-600" />}
                {data.recommendation} RECOMMENDED
            </h2>
            <p className="text-white/80 text-sm mt-1 print:text-gray-600">{data.recommendationReason}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{data.ageYears} Years</div>
            <div className="text-sm opacity-80 print:text-gray-600">Equipment Age</div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Asset Fact Sheet */}
          <div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 print:text-black">Asset Fact Sheet</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-2 print:border-gray-300">
                <span className="text-gray-600 print:text-black">Brand</span>
                <span className="font-semibold text-gray-900">{data.brand}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2 print:border-gray-300">
                <span className="text-gray-600 print:text-black">Model #</span>
                <span className="font-mono font-medium text-gray-900">{data.modelNumber}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2 print:border-gray-300">
                <span className="text-gray-600 flex items-center gap-2 print:text-black"><Calendar size={14}/> Mfg. Date</span>
                <span className="font-semibold text-gray-900">{data.manufactureDate}</span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <span className="text-gray-600 flex items-center gap-2 print:text-black"><ShieldAlert size={14}/> Warranty</span>
                <div className="text-right">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${data.warrantyStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} print:bg-gray-100 print:text-black print:border print:border-black`}>
                    {data.warrantyStatus.toUpperCase()}
                  </span>
                  <p className="text-xs text-gray-500 mt-1 max-w-[150px] print:max-w-none print:text-black">{data.warrantyNotes}</p>
                </div>
              </div>
            </div>

            {data.manualUrl && (
              <a 
                href={data.manualUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors print:hidden"
              >
                <FileText size={16} />
                View Installation Manual
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Right: The Cost of Failure Hook */}
          <div className={`bg-gray-50 rounded-lg p-6 border ${borderColor} print:bg-white print:border-2 print:border-gray-300`}>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 print:text-black">Business Impact Analysis</h3>
            
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-600 mb-1 print:text-black">Estimated Repair Cost</div>
                <div className="text-2xl font-bold text-gray-900">
                    ${data.costAnalysis.estimatedRepairCost.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 print:text-gray-600">Includes parts & labor estimate</div>
              </div>

              <div className="relative">
                <div className="absolute -left-3 top-0 bottom-0 w-1 bg-green-500 rounded-full print:bg-black"></div>
                <div className="pl-4">
                  <div className="text-sm text-green-700 font-medium mb-1 flex items-center gap-1 print:text-black">
                    <BadgeDollarSign size={16}/> Opportunity Value
                  </div>
                  <div className="text-3xl font-bold text-green-600 print:text-black">
                    ${data.costAnalysis.replacementOpportunity.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-700 opacity-80 print:text-gray-600">Potential replacement revenue</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 print:border-gray-400">
                <p className="text-sm text-gray-600 italic print:text-black">
                  "By identifying this {data.ageYears}-year-old unit immediately, you avoided a 
                  <span className="font-bold text-red-600 mx-1 print:text-black">${data.costAnalysis.savedTruckRollCost}</span> 
                  wasted truck roll."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center print:hidden">
        <div className="inline-flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <button 
                onClick={handlePrint}
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center gap-2"
              >
                  <Printer size={20} />
                  Download PDF Report
              </button>
              
              <button 
                onClick={onReset}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center gap-2"
              >
                  <RefreshCw size={20} />
                  Analyze Another
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};