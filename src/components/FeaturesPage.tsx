import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Globe, 
  Code2, 
  RefreshCw, 
  Clock, 
  Bell, 
  Smartphone,
  Check
} from 'lucide-react';
import { Button } from './Button';

export function FeaturesPage() {
  const mainFeatures = [
    {
      title: 'Real-time Inbox',
      description: 'Receive emails instantly without refreshing. Our system uses advanced push technology to deliver messages to your browser in milliseconds.',
      icon: <Bell className="text-brand" />,
    },
    {
      title: 'Multiple Domains',
      description: 'Choose from a variety of premium domains to ensure your temporary addresses work across all types of registration filters.',
      icon: <Globe className="text-brand" />,
    },
    {
      title: 'Developer API',
      description: 'Full programmatic access to your temporary mailboxes. Integrate FluxMail into your CI/CD pipelines and automated tests.',
      icon: <Code2 className="text-brand" />,
    },
    {
      title: 'Privacy Focused',
      description: 'We do not log your real IP address or metadata. Your temporary data is strictly isolated and self-destructs after use.',
      icon: <Shield className="text-brand" />,
    },
    {
      title: 'Instant Disposal',
      description: 'Need a new identity? Regenerate your address and clear your inbox with a single click. Total control at your fingertips.',
      icon: <RefreshCw className="text-brand" />,
    },
    {
      title: 'Mobile Optimized',
      description: 'A responsive interface that works perfectly on your phone, tablet, or desktop. Access your temporary mail anywhere.',
      icon: <Smartphone className="text-brand" />,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 py-20"
    >
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Powerful features for <span className="text-brand">modern privacy</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          FluxMail is designed with a "security-first" mindset, providing the tools you need to stay anonymous and automate your workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
        {mainFeatures.map((feature, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center">
              {React.cloneElement(feature.icon as React.ReactElement, { size: 24 })}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Why developers choose FluxMail</h2>
          <div className="space-y-6">
            {[
              'Zero setup API integration',
              'Deterministic address generation',
              'HTML and plaintext body support',
              'Attachment-friendly processing',
              'Webhooks for incoming mail (Enterprise)',
              'Priority dedicated infrastructure'
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center shrink-0">
                  <Check size={14} className="text-success" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{text}</span>
              </div>
            ))}
          </div>
          <Button size="lg" className="mt-10">Start Testing for Free</Button>
        </div>
        <div className="relative">
           <div className="absolute -inset-4 bg-brand/5 blur-3xl rounded-full -z-10 animate-pulse"></div>
           <div className="bg-white dark:bg-gray-900 border border-border dark:border-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex gap-2 mb-6">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="space-y-4 font-mono text-sm leading-relaxed">
                 <div className="flex gap-4">
                    <span className="text-gray-400">01</span>
                    <span className="text-emerald-400">const</span>
                    <span className="text-blue-400">flux</span>
                    <span className="text-white">=</span>
                    <span className="text-emerald-400">new</span>
                    <span className="text-yellow-400">FluxMail</span>
                    <span className="text-white">();</span>
                 </div>
                 <div className="flex gap-4">
                    <span className="text-gray-400">02</span>
                    <span className="text-emerald-400">const</span>
                    <span className="text-blue-400">account</span>
                    <span className="text-white">=</span>
                    <span className="text-emerald-400">await</span>
                    <span className="text-blue-400">flux</span>
                    <span className="text-white">.</span>
                    <span className="text-yellow-400">createAccount</span>
                    <span className="text-white">();</span>
                 </div>
                 <div className="flex gap-4">
                    <span className="text-gray-400">03</span>
                    <span className="text-emerald-400">const</span>
                    <span className="text-blue-400">messages</span>
                    <span className="text-white">=</span>
                    <span className="text-emerald-400">await</span>
                    <span className="text-blue-400">account</span>
                    <span className="text-white">.</span>
                    <span className="text-yellow-400">getMessages</span>
                    <span className="text-white">();</span>
                 </div>
                 <div className="mt-8 text-gray-500 italic">// Clean, simple, powerful.</div>
              </div>
           </div>
        </div>
      </div>

      <section className="text-center bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-16 border border-border dark:border-gray-800">
         <Zap className="text-brand mx-auto mb-6" size={40} />
         <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Built for speed</h2>
         <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10">
           We understand that testing workflows should be fast. Our internal routing engine is optimized for high-performance delivery, so you never have to wait for your test emails.
         </p>
         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl border border-border dark:border-gray-700">
               <Clock size={16} className="text-brand" />
               <span className="text-sm font-bold text-gray-900 dark:text-white">50ms Average Latency</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl border border-border dark:border-gray-700">
               <Zap size={16} className="text-brand" />
               <span className="text-sm font-bold text-gray-900 dark:text-white">99.9% Uptime Guarantee</span>
            </div>
         </div>
      </section>
    </motion.div>
  );
}
