import React, { useState } from 'react';
import { Mail, Sun, Moon, Github, ShieldCheck, Menu, X } from 'lucide-react';
import { Button } from './Button';
import { Theme, AppView } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
  onNavigate: (view: AppView) => void;
}

export function Header({ theme, onThemeToggle, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigate = (view: AppView) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-950 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavigate('dashboard')}
        >
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Mail size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            FluxMail
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <button onClick={() => handleNavigate('api-docs')} className="hover:text-brand transition-colors">API Docs</button>
          <button onClick={() => handleNavigate('tools')} className="hover:text-brand transition-colors">Tools</button>
          <button onClick={() => handleNavigate('enterprise')} className="hover:text-brand transition-colors">Enterprise</button>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {/*
          <Button variant="ghost" size="icon" onClick={onThemeToggle} className="relative z-50">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
          */}

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden relative z-50" 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-2 hidden sm:block"></div>
          
          <Button variant="outline" size="sm" className="hidden sm:flex">
             <Github size={16} className="mr-2" /> 
             Developer Portals
          </Button>
          
          {/*
          <Button size="sm" onClick={() => handleNavigate('coming-soon')} className="hidden xs:flex">
            Get Started
          </Button>
          */}
          <Button size="sm" onClick={() => handleNavigate('coming-soon')} className="flex">
            Get Started
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white dark:bg-gray-950 z-50 md:hidden p-6 pt-20 shadow-2xl border-l border-border dark:border-gray-800"
            >
              <nav className="flex flex-col gap-6">
                {/*
                <button 
                  onClick={() => handleNavigate('dashboard')}
                  className="flex items-center gap-3 text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  <Mail size={18} className="text-brand" />
                  <span className="font-semibold text-gray-900 dark:text-white">Dashboard</span>
                </button>
                
                <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                */}
                
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Navigation</span>
                  <button 
                    onClick={() => handleNavigate('api-docs')}
                    className="text-left px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-brand transition-colors"
                  >
                    API Documentation
                  </button>
                  <button 
                    onClick={() => handleNavigate('tools')}
                    className="text-left px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-brand transition-colors"
                  >
                    Developer Tools
                  </button>
                  <button 
                    onClick={() => handleNavigate('enterprise')}
                    className="text-left px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-brand transition-colors"
                  >
                    Enterprise Solutions
                  </button>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => handleNavigate('coming-soon')}
                  >
                    <Github size={16} className="mr-2" />
                    Developer Portals
                  </Button>
                  {/*
                  <Button 
                    className="w-full"
                    onClick={() => handleNavigate('coming-soon')}
                  >
                    Get Started Free
                  </Button>
                  */}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
             <ShieldCheck size={20} className="text-brand" />
             <span className="font-bold">FluxMail</span>
           </div>
           <p className="text-sm text-gray-500 max-w-xs">
             Disposable email services for privacy-conscious developers and automated testing.
           </p>
        </div>

        <div className="grid grid-cols-3 gap-12 text-sm">
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-gray-900 dark:text-gray-100">Product</span>
            <button onClick={() => onNavigate('features')} className="text-gray-500 hover:text-brand transition-colors text-left">Features</button>
            <button onClick={() => onNavigate('api-docs')} className="text-gray-500 hover:text-brand transition-colors text-left">API</button>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-gray-900 dark:text-gray-100">Support</span>
            <button onClick={() => onNavigate('guide')} className="text-gray-500 hover:text-brand transition-colors text-left">Guide</button>
            <button onClick={() => onNavigate('status')} className="text-gray-500 hover:text-brand transition-colors text-left">Status</button>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-gray-900 dark:text-gray-100">Legal</span>
            <button onClick={() => onNavigate('privacy')} className="text-gray-500 hover:text-brand transition-colors text-left">Privacy</button>
            <button onClick={() => onNavigate('terms')} className="text-gray-500 hover:text-brand transition-colors text-left">Terms</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-50 dark:border-gray-900 text-center text-xs text-gray-400">
        © 2024 FluxMail. Crafted for the modern web.
      </div>
    </footer>
  );
}
