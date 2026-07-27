import React, { useState } from 'react';
import { Gauge, Zap, AlertTriangle, ShieldCheck, ArrowRight, Play, RefreshCw, Trophy } from 'lucide-react';
import { BenchmarkData } from '../types';

export const SpeedTestTool: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('Plumbing & Heating');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BenchmarkData>({
    domain: 'cheshire-plumbing-example.co.uk',
    wordpress: {
      loadTimeSeconds: 4.1,
      pageWeightMB: 3.4,
      lighthouseScore: 38,
      vulnerabilities: 8,
      pluginCount: 26,
    },
    reactBuild: {
      loadTimeSeconds: 0.38,
      pageWeightMB: 0.18,
      lighthouseScore: 99,
      vulnerabilities: 0,
      pluginCount: 0,
    },
    estimatedConversionGain: '+38% More Inquiries',
  });

  const handleRunAudit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/speed-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput, industry: selectedIndustry }),
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Audit failed', err);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  return (
    <section id="speed-test" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#f2f4f6] border-b border-[#c6c6cd]/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#111111] text-white px-3.5 py-1 rounded-full text-xs font-mono font-semibold mb-3">
            <Gauge className="w-3.5 h-3.5 text-[#dc2626]" />
            <span>Interactive Speed Benchmark</span>
          </div>
          <h2 className="font-geist font-bold text-2xl sm:text-4xl text-[#191c1e] mb-3">
            How Much Speed Are You Losing?
          </h2>
          <p className="text-[#45464d] max-w-2xl text-sm sm:text-base">
            According to Google research, 53% of mobile users abandon sites that take longer than 3 seconds to load. Compare standard WordPress templates vs Dean's Custom React engine.
          </p>
        </div>

        {/* Input Controls Card */}
        <div className="bg-white border border-[#c6c6cd] rounded-xl p-4 sm:p-6 shadow-sm mb-8 max-w-3xl mx-auto">
          <form onSubmit={handleRunAudit} className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="w-full flex-grow">
              <label htmlFor="urlInput" className="block text-xs font-semibold font-mono text-[#191c1e] mb-1">
                Enter Your Website Domain:
              </label>
              <input
                id="urlInput"
                type="text"
                placeholder="e.g. mybusiness.co.uk"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full bg-[#f7f9fb] border border-[#c6c6cd] rounded-lg px-3.5 py-2.5 text-sm font-mono text-[#191c1e] focus:outline-none focus:border-[#dc2626] transition-colors"
              />
            </div>

            <div className="w-full sm:w-auto shrink-0">
              <label htmlFor="industrySelect" className="block text-xs font-semibold font-mono text-[#191c1e] mb-1">
                Local Industry Benchmark:
              </label>
              <select
                id="industrySelect"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-[#f7f9fb] border border-[#c6c6cd] rounded-lg px-3.5 py-2.5 text-sm font-sans text-[#191c1e] focus:outline-none focus:border-[#dc2626]"
              >
                <option value="Plumbing & Heating">Plumbing &amp; Heating</option>
                <option value="Legal & Conveyancing">Legal &amp; Conveyancing</option>
                <option value="Dental & Medical">Dental &amp; Medical</option>
                <option value="Trades & Construction">Trades &amp; Construction</option>
                <option value="E-Commerce / Retail">E-Commerce / Retail</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto mt-auto bg-[#dc2626] hover:bg-[#b91c1c] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shrink-0 shadow-xs"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Auditing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  Benchmark Now
                </>
              )}
            </button>
          </form>
        </div>

        {/* Audit Results Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Box: WordPress / Template Performance */}
          <div className="bg-white border border-rose-200 rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-bl-lg">
              SLUGGISH TEMPLATE
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-geist font-bold text-lg text-slate-900">WordPress / Theme Builder</h3>
                  <p className="text-xs text-slate-500 font-mono">20+ plugins, database queries &amp; render locks</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="bg-rose-50/60 p-3 rounded-lg border border-rose-100">
                  <span className="text-2xl font-bold font-geist text-rose-600">
                    {data.wordpress.loadTimeSeconds.toFixed(2)}s
                  </span>
                  <p className="text-xs text-slate-600">Page Load Time</p>
                </div>

                <div className="bg-rose-50/60 p-3 rounded-lg border border-rose-100">
                  <span className="text-2xl font-bold font-geist text-rose-600">
                    {data.wordpress.lighthouseScore}/100
                  </span>
                  <p className="text-xs text-slate-600">Lighthouse Speed Score</p>
                </div>

                <div className="bg-rose-50/60 p-3 rounded-lg border border-rose-100">
                  <span className="text-lg font-bold font-geist text-slate-800">
                    {data.wordpress.pageWeightMB.toFixed(1)} MB
                  </span>
                  <p className="text-xs text-slate-600">Page Weight (Heavy)</p>
                </div>

                <div className="bg-rose-50/60 p-3 rounded-lg border border-rose-100">
                  <span className="text-lg font-bold font-geist text-amber-700">
                    {data.wordpress.pluginCount} Plugins
                  </span>
                  <p className="text-xs text-slate-600">Update Vulnerabilities</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 space-y-1">
              <span className="font-bold">Estimated Local Business Risk:</span>
              <p>Losing ~40% of mobile search visitors before the header even renders.</p>
            </div>
          </div>

          {/* Right Box: Dean Wilshaw Custom React Build */}
          <div className="bg-white border-2 border-[#dc2626] rounded-xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#dc2626] text-white text-[10px] font-mono font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
              <Trophy className="w-3 h-3" /> DEAN WILSHAW BUILD
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 text-[#991b1b] flex items-center justify-center">
                  <Zap className="w-5 h-5 fill-[#dc2626] text-[#dc2626]" />
                </div>
                <div>
                  <h3 className="font-geist font-bold text-lg text-slate-900">Custom React Engine</h3>
                  <p className="text-xs text-emerald-700 font-mono font-semibold">Zero bloat, instant static edge deployment</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="bg-red-50/80 p-3 rounded-lg border border-red-100">
                  <span className="text-2xl font-bold font-geist text-emerald-600">
                    {data.reactBuild.loadTimeSeconds.toFixed(2)}s
                  </span>
                  <p className="text-xs text-slate-600">Instant Load Time</p>
                </div>

                <div className="bg-red-50/80 p-3 rounded-lg border border-red-100">
                  <span className="text-2xl font-bold font-geist text-[#991b1b]">
                    {data.reactBuild.lighthouseScore}/100
                  </span>
                  <p className="text-xs text-slate-600">Perfect Core Web Vitals</p>
                </div>

                <div className="bg-red-50/80 p-3 rounded-lg border border-red-100">
                  <span className="text-lg font-bold font-geist text-slate-800">
                    {data.reactBuild.pageWeightMB} MB
                  </span>
                  <p className="text-xs text-slate-600">Ultralight Codebase</p>
                </div>

                <div className="bg-red-50/80 p-3 rounded-lg border border-red-100">
                  <span className="text-lg font-bold font-geist text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> 0 Vulnerable
                  </span>
                  <p className="text-xs text-slate-600">Stateless Security</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
              <div>
                <span className="font-bold">Projected Conversion Uplift:</span>
                <p className="text-emerald-700 font-semibold">{data.estimatedConversionGain}</p>
              </div>
              <a
                href="#contact"
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1 shrink-0"
              >
                Upgrade <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

