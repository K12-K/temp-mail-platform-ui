import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  HelpCircle, 
  Mail, 
  Key, 
  RefreshCw, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Button } from './Button';

export function GuidePage() {
  const steps = [
    {
      title: 'Generate an Address',
      description: 'Upon landing on the dashboard, a professional temporary email address is automatically generated for you. You can regenerate a new one anytime using the refresh button.',
      icon: <RefreshCw size={24} className="text-brand" />,
    },
    {
      title: 'Copy & Use',
      description: 'Click the "Copy Address" button to save it to your clipboard. Use this address anywhere that requires email verification or sign-up.',
      icon: <Mail size={24} className="text-brand" />,
    },
    {
      title: 'Real-time Reception',
      description: 'Incoming emails will appear instantly in your inbox section below the address display. No need to refresh the page manually.',
      icon: <Zap size={24} className="text-brand" />,
    },
    {
      title: 'Automate with API',
      description: 'For developers, navigate to our API docs to learn how to fetch messages programmatically using your unique access token.',
      icon: <Key size={24} className="text-brand" />,
    },
  ];

  const faqs = [
    {
      question: 'How long do emails stay in my inbox?',
      answer: 'By default, emails are kept for 10 minutes of active session time. You can reset the timer by regenerating or interacting with the dashboard.',
    },
    {
      question: 'Can I send emails from FluxMail?',
      answer: 'Currently, FluxMail is an incoming-only service designed for verification and testing. Sending capabilities are disabled to prevent spam abuse.',
    },
    {
      question: 'Are my temporary emails private?',
      answer: 'Yes. Every session is isolated. We do not link your temporary addresses to your personal identity or IP address permanently.',
    },
    {
      question: 'Do you support attachments?',
      answer: 'Yes, we process attachments. However, for security reasons, we scan them for malware and there is a 5MB size limit per message.',
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-4xl mx-auto px-4 py-20"
    >
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-bold mb-6">
          <BookOpen size={16} /> User Guide
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          How to use <span className="text-brand">FluxMail</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Everything you need to know about our disposable email service for developers and privacy advocates.
        </p>
      </div>

      <section className="mb-24">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white">
            <Zap size={20} />
          </div>
          Quick Start Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 border border-border dark:border-gray-800 rounded-2xl p-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 {step.icon}
               </div>
               <div className="relative z-10">
                 <div className="text-brand font-mono font-bold mb-4">0{idx + 1}</div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                 <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                   {step.description}
                 </p>
               </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24 bg-gray-900 rounded-3xl p-8 md:p-12 text-white">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
             <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
               <ShieldCheck size={32} className="text-brand" />
               Security Best Practices
             </h2>
             <p className="text-gray-400 mb-6 font-medium">
               While FluxMail is perfect for testing, follow these tips to stay safe:
             </p>
             <ul className="space-y-4">
               {[
                 'Never use temporary mail for primary banking or sensitive logins.',
                 'Avoid clicking links in emails from untrusted senders.',
                 'Use FluxMail primarily for isolating tracking and spam.',
                 'Clear your inbox after your testing session is complete.'
               ].map((tip, idx) => (
                 <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                   <ChevronRight size={18} className="text-brand shrink-0 mt-0.5" />
                   {tip}
                 </li>
               ))}
             </ul>
          </div>
          <div className="w-full md:w-1/3 bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center">
             <HelpCircle size={48} className="text-brand mb-4" />
             <h4 className="font-bold mb-2">Still have questions?</h4>
             <p className="text-xs text-gray-500 mb-6">Our support team is ready to help with technical integration queries.</p>
             <Button className="w-full bg-white text-brand hover:bg-gray-100 h-12">Contact Support</Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 border border-border dark:border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                <HelpCircle size={18} className="text-brand" />
                {faq.question}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed pl-7">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-20 text-center border-t border-gray-100 dark:border-gray-900 pt-16">
         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ready to build?</h3>
         <Button variant="ghost" className="group">
           Check out the API Documentation
           <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
         </Button>
      </div>
    </motion.div>
  );
}
