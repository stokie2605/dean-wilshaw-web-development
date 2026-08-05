import { 
  Zap, 
  MessageSquare, 
  ShieldCheck, 
  Star, 
  Award, 
  Shield, 
  Home, 
  AlertTriangle, 
  BatteryCharging, 
  ArrowRight, 
  Wrench, 
  Clock, 
  FileText,
  Phone,
  Sun,
  Moon
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EvansElectricalLanding() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.title = "Evans Electrical Services | Northwich Electrician";
    
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden pt-20 pb-16 md:pb-0 min-h-screen">
      
      {/* TopNavBar */}
      <header className="bg-surface/80 w-full top-0 fixed backdrop-blur-xl border-b border-outline-variant/20 shadow-sm z-50">
        <div className="flex justify-between items-center w-full px-gutter py-4 max-w-7xl mx-auto">
          <div className="text-headline-md font-headline-md font-extrabold text-on-background">
            Evans Electrical
          </div>
          <nav className="hidden md:flex items-center gap-8 font-body-md text-body-md">
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">Residential</a>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">Commercial</a>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">Industrial</a>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">Emergency</a>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">Case Studies</a>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface-variant transition-colors text-on-background"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded hover:scale-95 opacity-90 transition-all">
              Get Quote
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-gutter py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-8 z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
            Expert Electricians in Northwich
            <span className="text-[#F59E0B] block mt-2"> - Powering Your Home & Business</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            Fast, reliable, and NICEIC certified electrical services for residential and commercial properties across Cheshire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-on-primary w-full sm:w-auto px-6 py-3 font-bold rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg">
              <Zap className="w-5 h-5 flex-shrink-0" />
              Get a Free Quote
            </button>
            <button className="bg-tertiary text-on-tertiary w-full sm:w-auto px-6 py-3 font-bold rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg">
              <MessageSquare className="w-5 h-5 flex-shrink-0" />
              WhatsApp Us
            </button>
          </div>
        </div>
        <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1200')"}}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="w-full bg-surface-container-highest py-8 border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-gutter flex flex-wrap justify-center md:justify-between items-center gap-8">
          <div className="flex items-center gap-3 text-on-surface">
            <ShieldCheck className="text-primary w-8 h-8 flex-shrink-0" />
            <span className="font-label-md text-label-md">10+ Years Exp</span>
          </div>
          <div className="flex items-center gap-3 text-on-surface">
            <Star className="text-primary w-8 h-8 flex-shrink-0" />
            <span className="font-label-md text-label-md">5.0 Google Reviews</span>
          </div>
          <div className="flex items-center gap-3 text-on-surface">
            <Award className="text-primary w-8 h-8 flex-shrink-0" />
            <span className="font-label-md text-label-md">#1 In Northwich</span>
          </div>
          <div className="flex items-center gap-3 text-on-surface">
            <Shield className="text-primary w-8 h-8 flex-shrink-0" />
            <span className="font-label-md text-label-md">NICEIC Registered</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full max-w-7xl mx-auto py-16 sm:py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">Our Electrical Services</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Comprehensive solutions for every requirement, delivered with uncompromising safety standards.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-[#161E2E] border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300 group relative overflow-hidden">
            <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Home className="text-primary w-6 h-6 flex-shrink-0" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Residential Rewires</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Complete home rewiring ensuring your property meets the latest safety regulations.</p>
            <a className="text-primary font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all" href="#">
              Learn More <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </a>
          </div>

          <div className="bg-[#161E2E] border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8"></div>
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <AlertTriangle className="text-primary w-6 h-6 flex-shrink-0" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 relative z-10">24/7 Emergency</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10">Rapid response call-outs for urgent faults, power loss, and dangerous electrical issues.</p>
            <a className="text-primary font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all relative z-10" href="#">
              Call Now <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </a>
          </div>

          <div className="bg-[#161E2E] border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300 group relative overflow-hidden">
            <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BatteryCharging className="text-primary w-6 h-6 flex-shrink-0" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">EV Charging</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Professional installation of home and commercial electric vehicle charging points.</p>
            <a className="text-primary font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all" href="#">
              Learn More <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </a>
          </div>

        </div>
      </section>

      {/* Why Choose Us (Bento Layout) */}
      <section className="w-full bg-surface-container-low py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 text-center">Why Choose Evans Electrical</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            
            <div className="md:col-span-2 bg-surface-container-highest rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden group">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" 
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1544427500-2d93eecdbfb6?auto=format&fit=crop&q=80&w=1200')"}}>
              </div>
              <div className="relative z-10">
                <Wrench className="text-primary w-10 h-10 flex-shrink-0 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Unmatched Precision</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md">Every wire, every connection executed to the highest industry standards for total peace of mind.</p>
              </div>
            </div>

            <div className="bg-[#161E2E] border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-center items-start">
              <Clock className="text-primary w-10 h-10 flex-shrink-0 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Punctual</h3>
              <p className="text-slate-400 text-sm leading-relaxed">We respect your time, arriving exactly when promised.</p>
            </div>

            <div className="bg-[#161E2E] border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-center items-start">
              <FileText className="text-primary w-10 h-10 flex-shrink-0 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Transparent</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Clear, upfront pricing with no hidden surprises.</p>
            </div>

            <div className="md:col-span-2 bg-primary rounded-2xl p-8 flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10 max-w-md">
                <h3 className="text-xl font-semibold text-white mb-2">Fully Accredited</h3>
                <p className="font-body-md text-body-md text-on-primary/80">NICEIC approved contractors, fully insured and compliant with all current safety regulations.</p>
              </div>
              <Award className="w-64 h-64 text-on-primary/10 absolute -right-8 -bottom-8 flex-shrink-0" />
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/10 w-full full-width bottom pb-24 md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 w-full px-gutter py-16 max-w-7xl mx-auto">
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <span className="text-headline-md font-headline-md font-extrabold text-on-background">
                Evans Electrical
            </span>
            <p className="text-slate-400 text-sm leading-relaxed">
                Expert electrical services across Northwich and Cheshire. Powering homes and businesses with precision.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="font-label-md text-label-md text-on-background mb-2 font-bold uppercase tracking-wider">Services</h4>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Emergency Call-Out</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Full Rewires</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">EICR Testing</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">EV Charging</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-label-md text-label-md text-on-background mb-2 font-bold uppercase tracking-wider">Legal</h4>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <h4 className="font-label-md text-label-md text-on-background mb-2 font-bold uppercase tracking-wider">Contact</h4>
            <button className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded hover:bg-opacity-90 transition-all w-full text-center font-bold">
                Get Quote
            </button>
          </div>
        </div>
        <div className="w-full text-center py-6 border-t border-outline-variant/10">
          <p className="font-body-md text-body-md text-on-surface-variant text-sm">
            © 2024 Evans Electrical Services. All Rights Reserved. NICEIC Certified.
          </p>
        </div>
      </footer>

      {/* BottomNavBar (Mobile Only) - Extracted from Mobile Layout */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#0B0F17]/95 backdrop-blur-md md:hidden border-t border-outline-variant/30 shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
        <div className="flex justify-around items-center px-2 py-2 pb-safe w-full">
          
          <a className="flex flex-col items-center justify-center text-primary bg-surface-container-lowest rounded-xl px-2 py-2 active:scale-90 duration-200 w-1/4" href="#">
            <Home className="w-6 h-6 flex-shrink-0" />
            <span className="font-label-bold text-label-bold text-[10px] mt-1 font-bold">Home</span>
          </a>
          
          <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90 duration-200 w-1/4" href="#services">
            <Wrench className="w-6 h-6 flex-shrink-0" />
            <span className="font-label-bold text-label-bold text-[10px] mt-1 font-bold">Services</span>
          </a>
          
          <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-error transition-all active:scale-90 duration-200 w-1/4 relative" href="#emergency">
            <AlertTriangle className="text-error w-6 h-6 flex-shrink-0" />
            <span className="font-label-bold text-label-bold text-[10px] mt-1 text-error font-bold">Emergency</span>
          </a>
          
          <a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90 duration-200 w-1/4" href="#contact">
            <Phone className="w-6 h-6 flex-shrink-0" />
            <span className="font-label-bold text-label-bold text-[10px] mt-1 font-bold">Contact</span>
          </a>
          
        </div>
      </nav>

    </div>
  );
}

