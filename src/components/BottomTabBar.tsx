import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wrench, CreditCard, Layers } from 'lucide-react';

export const BottomTabBar: React.FC = () => {
  const location = useLocation();

  const tabs = [
    { label: 'Home',    path: '/',        icon: Home },
    { label: 'Tools',   path: '/tools',   icon: Wrench },
    { label: 'Pricing', path: '/pricing', icon: CreditCard },
    { label: 'Demos',   path: '/demos',   icon: Layers },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0A0D14]/95 backdrop-blur-md border-t border-slate-200 dark:border-white/[0.08] py-1.5 px-4 flex justify-around items-center md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.4)] transition-colors duration-300"
    >
      {tabs.map(({ label, path, icon: Icon }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all duration-150 ${
              isActive
                ? 'text-[#D90429] dark:text-[#D90429] font-bold'
                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white font-medium'
            }`}
          >
            <Icon 
              className={`w-5 h-5 transition-transform ${
                isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.75]'
              }`} 
            />
            <span className="text-[11px] tracking-tight mt-0.5 leading-none">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
