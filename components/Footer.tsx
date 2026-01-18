
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Home, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-32 pb-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white">
                <Home size={22} />
              </div>
              <span className="text-3xl font-black text-black tracking-tighter uppercase">HomiFy</span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed max-w-xs">
              Setting the global standard for luxury real estate and architectural excellence since 2024.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-black font-black uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Portfolio', 'Market Insights', 'List Property', 'Concierge'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-black transition-colors text-sm font-bold uppercase tracking-widest">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-black font-black uppercase tracking-widest text-xs mb-8">Organization</h4>
            <ul className="space-y-4">
              {['About HomiFy', 'Founders', 'Careers', 'Press Portfolio'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-black transition-colors text-sm font-bold uppercase tracking-widest">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-black font-black uppercase tracking-widest text-xs mb-8">Quarterly Report</h4>
            <p className="text-gray-400 mb-6 text-sm font-medium leading-relaxed">Subscribe to receive exclusive market analysis and off-market opportunities.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Secure Email" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-xs font-bold focus:ring-4 focus:ring-black/5 focus:border-black focus:bg-white outline-none transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-black text-white text-[10px] font-bold rounded-xl uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-105 transition-all">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
          <p>© 2024 HOMIFY HOLDINGS. ARCHITECTURAL EXCELLENCE ASSURED.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Compliance</a>
            <a href="#" className="hover:text-black transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
