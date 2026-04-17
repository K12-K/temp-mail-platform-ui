import React from 'react';
import { motion } from 'motion/react';
import { 
  Wrench, 
  Search, 
  Globe, 
  Smartphone, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  Code2,
  Lock
} from 'lucide-react';
import { Button } from './Button';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  isPopular?: boolean;
  key?: string;
}

function ToolCard({ title, description, icon, category, isPopular }: ToolCardProps) {
  return (
    <div className="group relative bg-white dark:bg-gray-900 border border-border dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
          {icon}
        </div>
        {isPopular && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-2 py-1 rounded">
            Popular
          </span>
        )}
      </div>
      <div className="mb-6">
        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 block">
          {category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
      <Button variant="ghost" className="w-full justify-between text-sm group/btn">
        Open Tool
        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}

export function ToolsPage() {
  const tools: ToolCardProps[] = [
    {
      title: 'Email Validator',
      description: 'Check if an email address is real, deliverable, or a known disposable service.',
      icon: <ShieldCheck size={24} />,
      category: 'Security',
      isPopular: true,
    },
    {
      title: 'Domain Checker',
      description: 'Search for and verify the reputation of email domains used for temporary addresses.',
      icon: <Globe size={24} />,
      category: 'Network',
    },
    {
      title: 'QR Code Generator',
      description: 'Generate instant QR codes for your temporary addresses to scan on mobile devices.',
      icon: <Smartphone size={24} />,
      category: 'Utility',
    },
    {
      title: 'API Playground',
      description: 'Test our API endpoints in real-time with our interactive sandbox environment.',
      icon: <Code2 size={24} />,
      category: 'Developer',
      isPopular: true,
    },
    {
      title: 'Encrypted Vault',
      description: 'Securely store sensitive message content with end-to-end encryption tools.',
      icon: <Lock size={24} />,
      category: 'Privacy',
    },
    {
      title: 'Webhook Tester',
      description: 'Simulate and test webhook payloads from incoming email events.',
      icon: <ExternalLink size={24} />,
      category: 'Automation',
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="max-w-6xl mx-auto px-4 py-16"
    >
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <Wrench size={14} /> Tools & Utilities
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          Developer <span className="text-brand">Toolbox</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          A collection of essential utilities for developers building around communication, security, and automated testing workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>

      <div className="mt-20 bg-gray-900 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need a custom integration?
            </h2>
            <p className="text-gray-400 mb-8">
              We provide enterprise-grade solutions for engineering teams. Build custom tools directly on top of our secure infrastructure.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Contact Sales
              </Button>
              <Button variant="outline" size="lg" className="border-gray-700 text-white hover:bg-gray-800">
                Read Enterprise Docs
              </Button>
            </div>
          </div>
          <div className="hidden lg:block w-64 h-64 bg-brand/20 rounded-full blur-3xl animate-pulse" />
        </div>
        {/* Background circuit pattern simulation */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
