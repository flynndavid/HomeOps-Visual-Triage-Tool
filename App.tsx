import React, { useState } from 'react';
import { Upload, Camera, Zap, CheckCircle2, ArrowRight, Home, Menu, ChevronDown, DollarSign, Wrench, Search } from 'lucide-react';
import { AppStatus, EquipmentData } from './types';
import { analyzeEquipmentImage } from './services/geminiService';
import { AnalysisLogs } from './components/AnalysisLogs';
import { ResultsCard } from './components/ResultsCard';

export default function App() {
  const [status, setStatus] = useState<AppStatus>('idle');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [result, setResult] = useState<EquipmentData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files) as File[];
      
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
      setStatus('analyzing');
      setErrorMsg(null);

      try {
        const data = await analyzeEquipmentImage(files);
        setResult(data);
        setStatus('complete');
      } catch (err: any) {
        console.error(err);
        setStatus('error');
        setErrorMsg("Failed to analyze image. Ensure the data plate text is visible.");
      }
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setPreviewUrls([]);
    setResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="font-sans text-gray-900 bg-white">
      
      {/* Top Banner */}
      <div className="bg-orange-50 py-2 text-center text-xs font-bold tracking-widest text-orange-600 uppercase print:hidden">
        HomeOps Technology Demo
      </div>

      {/* Navbar */}
      <nav className="border-b border-gray-100 py-4 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg text-white">
              <Home size={20} fill="currentColor" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">HomeOps</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-gray-900">Why HomeOps</a>
            <a href="#" className="hover:text-gray-900 flex items-center gap-1">Case Studies <ChevronDown size={14}/></a>
            <a href="#" className="hover:text-gray-900 flex items-center gap-1">Products <ChevronDown size={14}/></a>
            <a href="#" className="hover:text-gray-900 flex items-center gap-1">Resources <ChevronDown size={14}/></a>
            <a href="#" className="hover:text-gray-900">Blog</a>
          </div>

          <div className="flex items-center gap-4">
             <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-6 rounded-md transition-colors text-sm">
              Book Intro Call
            </button>
            <button className="md:hidden text-gray-500">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 text-center max-w-5xl mx-auto print:hidden">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          Turn Every Service Call into a <br className="hidden md:block" />
          <span className="text-orange-500">Replacement Opportunity.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
          Your dispatchers are losing $10k+ in replacement revenue every month because equipment research takes too long. This agent fixes the bottleneck.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-b border-gray-100 py-8">
          <div>
            <div className="text-4xl font-bold text-orange-500 mb-1">90%</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Reduction in Research Time</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-500 mb-1">15%</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Lift in Replacement Quotes</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-500 mb-1">Instant</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Warranty & Manual Lookups</div>
          </div>
        </div>
      </section>

      {/* Interactive Proof Section */}
      <section className="py-12 bg-gray-50/50 print:bg-white print:p-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 print:hidden">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Interactive Proof</h3>
            <p className="text-gray-500 mb-8">Test the engine that powers the replacement uplift.</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Plate Analysis</h2>
            <p className="text-gray-600">Upload a photo of the unit's data plate to run the analysis.</p>
          </div>

          {/* THE APP CONTAINER */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-4 md:p-8 min-h-[400px] relative">
            
            {status === 'idle' && (
              <div className="max-w-2xl mx-auto py-12">
                 <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-orange-300 transition-colors relative bg-gray-50/50">
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Camera size={32} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Data Plate</h3>
                    <p className="text-gray-500 mb-8">Select clear photos of the model and serial number.</p>
                    
                    <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-black transition-colors inline-flex items-center gap-2 pointer-events-none">
                      <Upload size={18} />
                      Select Photos
                    </button>
                 </div>

                 {/* Mock input field to match design */}
                 <div className="mt-6 flex items-center gap-2 max-w-md mx-auto opacity-50 pointer-events-none grayscale">
                    <div className="flex-grow bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-400 text-sm flex items-center justify-between">
                       <span>flynnd.2140@gmail.com</span>
                       <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    </div>
                    <button className="bg-orange-200 text-white font-bold py-3 px-6 rounded-lg cursor-not-allowed">
                       Analyze Now
                    </button>
                 </div>
                 <p className="text-center text-xs text-gray-300 mt-2">Upload a photo to enable analysis.</p>
              </div>
            )}

            {status === 'analyzing' && previewUrls.length > 0 && (
              <div className="max-w-5xl mx-auto py-8">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-gray-900 bg-black p-1 aspect-video">
                        <div className={`grid gap-1 h-full w-full ${previewUrls.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                          {previewUrls.map((url, idx) => (
                             <div key={idx} className="relative w-full h-full overflow-hidden rounded bg-gray-800">
                               <img 
                                  src={url} 
                                  alt={`Evidence ${idx}`} 
                                  className="w-full h-full object-cover opacity-80"
                              />
                             </div>
                          ))}
                        </div>
                        <div className="scan-line"></div>
                        <div className="absolute top-4 left-4 bg-black/80 text-orange-400 text-xs font-mono px-3 py-1.5 rounded z-20 flex items-center gap-2 border border-orange-500/30">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            PROCESSING IMAGE DATA...
                        </div>
                    </div>
                    <div className="w-full">
                        <AnalysisLogs />
                    </div>
                 </div>
              </div>
            )}

            {status === 'complete' && result && (
               <ResultsCard data={result} onReset={handleReset} />
            )}

            {status === 'error' && (
              <div className="max-w-md mx-auto py-12 text-center">
                 <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                     <div className="text-red-500 mb-4 flex justify-center">
                         <Camera size={48} />
                     </div>
                     <h3 className="text-lg font-bold text-red-900 mb-2">Analysis Failed</h3>
                     <p className="text-red-700 mb-6 text-sm">{errorMsg || "Something went wrong."}</p>
                     <button 
                         onClick={handleReset}
                         className="bg-white border border-red-200 text-red-700 px-6 py-2 rounded-lg font-medium hover:bg-red-50 text-sm"
                     >
                         Try Again
                     </button>
                 </div>
              </div>
            )}
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 print:hidden">
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center">
               <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl">📸</div>
               <h3 className="font-bold text-gray-900 mb-2">Vision + Web Search</h3>
               <p className="text-sm text-gray-500 leading-relaxed">Reads model/serial from multiple photos and verifies warranty status in real-time.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center">
               <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl">💰</div>
               <h3 className="font-bold text-gray-900 mb-2">Instant ROI Scoring</h3>
               <p className="text-sm text-gray-500 leading-relaxed">Calculates repair cost vs. replacement opportunity—so your techs quote with confidence.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center">
               <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl">🔧</div>
               <h3 className="font-bold text-gray-900 mb-2">Sales Enablement</h3>
               <p className="text-sm text-gray-500 leading-relaxed">Turns service calls into upsell opportunities by showing the numbers, not just the gut feel.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Bottleneck Section */}
      <section className="py-20 bg-white print:hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-3xl font-bold text-gray-900 mb-6">Eliminate the "Dispatcher Bottleneck"</h2>
                 <p className="text-gray-600 mb-8 leading-relaxed">
                   Most HVAC and Plumbing companies lose hours every day waiting for dispatchers to lookup warranty status or find part numbers. This agent does the work in seconds, allowing your team to quote replacements while the tech is still on-site.
                 </p>
                 
                 <div className="space-y-6">
                    <div className="flex gap-4">
                       <div className="mt-1 bg-orange-100 p-1 rounded-full h-fit">
                          <CheckCircle2 size={16} className="text-orange-600" />
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900 text-sm">Technician Confidence</h4>
                          <p className="text-sm text-gray-500 mt-1">Every tech knows exactly what they are looking at before they even open the unit.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="mt-1 bg-orange-100 p-1 rounded-full h-fit">
                          <CheckCircle2 size={16} className="text-orange-600" />
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900 text-sm">Sales Velocity</h4>
                          <p className="text-sm text-gray-500 mt-1">Quote replacements in 5 minutes, not 24 hours.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="mt-1 bg-orange-100 p-1 rounded-full h-fit">
                          <CheckCircle2 size={16} className="text-orange-600" />
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900 text-sm">Dispatcher Leverage</h4>
                          <p className="text-sm text-gray-500 mt-1">One dispatcher handles 3x the volume by automating lookup grunt work.</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Dark ROI Card */}
              <div className="bg-[#111827] rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">MEASURABLE ROI</div>
                    <h3 className="text-2xl font-bold mb-4">The $50k Error</h3>
                    <p className="text-gray-400 text-sm mb-8">
                      A mid-sized HVAC company with 5 techs loses an average of 2 replacement opportunities per week due to slow dispatch follow-up.
                    </p>

                    <div className="space-y-4 border-t border-gray-800 pt-6">
                       <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Avg. Replacement Ticket</span>
                          <span className="font-mono text-orange-400 font-bold">$8,500</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Missed Jobs / Month</span>
                          <span className="font-mono text-orange-400 font-bold">8</span>
                       </div>
                       <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                          <span className="font-bold">Potential Revenue Leak</span>
                          <span className="font-bold text-xl">$68,000 / mo</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
         </div>
      </section>

      {/* Not SaaS Section */}
      <section className="py-20 bg-gray-50 print:hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold text-gray-900 mb-4">This Isn't a SaaS Tool. It's a Module You Own.</h2>
           <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
             Most AI demos are cool, but they don't fit your workflow. This agent is designed to be <span className="font-bold text-gray-900">cloned, customized, and integrated</span> into your existing systems—ServiceTitan, Jobber, Housecall Pro, or your internal CRM.
           </p>

           <h3 className="font-bold text-gray-900 mb-8">How This Works in Your Business</h3>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                 <div className="text-orange-500 font-bold mb-2">1. Audit</div>
                 <p className="text-sm text-gray-600">We map your current dispatch and quoting workflow to identify where this agent adds the most value.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                 <div className="text-orange-500 font-bold mb-2">2. Build</div>
                 <p className="text-sm text-gray-600">We customize the agent's output format, integrate it with your CRM, and train it on your pricing models.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                 <div className="text-orange-500 font-bold mb-2">3. Deploy</div>
                 <p className="text-sm text-gray-600">Your techs get a link (or it lives inside your app). They snap a photo, get a recommendation, and close more deals.</p>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white print:hidden">
         <div className="max-w-4xl mx-auto px-4">
            <div className="border border-orange-100 rounded-2xl p-10 text-center shadow-sm">
                <h3 className="font-bold text-gray-900 text-xl mb-6">The Goal: Empower Your Technicians</h3>
                <div className="flex flex-col gap-3 items-start max-w-lg mx-auto mb-10">
                   <div className="flex gap-2 text-left">
                      <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm"><span className="font-bold">Reduce dispatcher load</span> by automating equipment research</span>
                   </div>
                   <div className="flex gap-2 text-left">
                      <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm"><span className="font-bold">Increase conversion rates</span> on replacement quotes by showing the data</span>
                   </div>
                   <div className="flex gap-2 text-left">
                      <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm"><span className="font-bold">Eliminate errors</span> from misread model numbers or outdated warranty info</span>
                   </div>
                </div>

                <div className="text-sm text-gray-500 mb-8 max-w-lg mx-auto">
                   This is production-grade infrastructure, not a toy. If you want to see how this agent fits into your operation, let's talk.
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md transition-colors shadow-md">
                      Schedule an Audit
                   </button>
                   <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-bold py-3 px-8 rounded-md transition-colors">
                      Learn About Implementation
                   </button>
                </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-gray-400 py-12 text-sm print:hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
               <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-4 text-white">
                    <div className="bg-orange-500 p-1 rounded">
                      <Home size={16} fill="currentColor" strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-lg tracking-tight">HomeOps</span>
                  </div>
                  <p className="max-w-xs mb-6">AI transformation partner for home services. We audit what's broken, build infrastructure that works, and stay engaged as you grow.</p>
                  <div className="flex gap-4">
                     <a href="#" className="hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                     </a>
                     <a href="#" className="hover:text-white transition-colors">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg>
                     </a>
                  </div>
               </div>
               <div>
                  <h4 className="font-bold text-white mb-4">Company</h4>
                  <ul className="space-y-2">
                     <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                     <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                     <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                     <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold text-white mb-4">Resources</h4>
                  <ul className="space-y-2">
                     <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                     <li><a href="#" className="hover:text-white transition-colors">Revenue Calculator</a></li>
                     <li><a href="#" className="hover:text-white transition-colors">Quote Generator</a></li>
                     <li><a href="#" className="hover:text-white transition-colors">HomeOps vs Admin</a></li>
                  </ul>
               </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
               <p>© 2026 Automatic. All rights reserved.</p>
               <p>Built by Automatic</p>
            </div>
         </div>
      </footer>
    </div>
  );
}
