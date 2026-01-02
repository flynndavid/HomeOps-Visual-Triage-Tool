import React, { useEffect, useState, useRef } from 'react';
import { Bot, Search, BrainCircuit, FileText, CheckCircle2 } from 'lucide-react';

const LOG_STEPS = [
  { text: "Scanning data plate image...", icon: <Bot size={18} /> },
  { text: "Extracting Model & Serial Numbers...", icon: <BrainCircuit size={18} /> },
  { text: "Searching manufacturer database...", icon: <Search size={18} /> },
  { text: "Decoding serial number nomenclature...", icon: <BrainCircuit size={18} /> },
  { text: "Verifying warranty terms...", icon: <FileText size={18} /> },
  { text: "Calculating age and depreciation...", icon: <BrainCircuit size={18} /> },
  { text: "Finalizing triage recommendation...", icon: <CheckCircle2 size={18} /> },
];

export const AnalysisLogs: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeStep < LOG_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setActiveStep(prev => prev + 1);
      }, 1500 + Math.random() * 1000); // Random delay between 1.5s and 2.5s
      return () => clearTimeout(timer);
    }
  }, [activeStep]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeStep]);

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg p-6 shadow-2xl border border-gray-700 font-mono text-sm">
      <div className="flex items-center space-x-2 mb-4 border-b border-gray-700 pb-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-gray-300 font-semibold tracking-wider">AI AGENT ACTIVITY LOG</span>
      </div>
      
      <div 
        ref={scrollRef}
        className="space-y-4 h-48 overflow-y-auto scrollbar-hide"
      >
        {LOG_STEPS.slice(0, activeStep + 1).map((step, index) => (
          <div 
            key={index} 
            className={`flex items-center space-x-3 ${
              index === activeStep ? 'text-blue-400' : 'text-gray-500'
            }`}
          >
            <div className={index === activeStep ? 'animate-bounce' : ''}>
              {step.icon}
            </div>
            <span>{step.text}</span>
            {index < activeStep && (
              <span className="ml-auto text-green-500 text-xs">[OK]</span>
            )}
          </div>
        ))}
        {activeStep === LOG_STEPS.length - 1 && (
            <div className="flex items-center space-x-3 text-green-400">
                <CheckCircle2 size={18} />
                <span>Analysis Complete. Generating Report.</span>
            </div>
        )}
      </div>
    </div>
  );
};
