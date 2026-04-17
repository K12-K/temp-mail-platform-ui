import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Rocket, 
  Clock, 
  Shield, 
  Zap, 
  ArrowRight, 
  MessageCircle,
  Construction
} from 'lucide-react';
import { Button } from './Button';
import { toast } from 'sonner';

export function ComingSoonPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('You have been added to the early access list!');
      setEmail('');
    }
  };

  const premiumFeatures = [
    { 
      title: 'Persistent Inboxes', 
      description: 'Keep your temporary addresses active for weeks, not just minutes.',
      icon: <Clock className="text-brand" size={20} />
    },
    { 
      title: 'Global Delivery', 
      description: 'Localized regions for testing geo-locked verification flows.',
      icon: <Zap className="text-brand" size={20} />
    },
    { 
      title: 'Team Analytics', 
      description: 'Visualized data on message volume and delivery success rates.',
      icon: <Sparkles className="text-brand" size={20} />
    },
    { 
      title: 'API Versioning', 
      description: 'Stable, long-term support for advanced automation scripts.',
      icon: <Shield className="text-brand" size={20} />
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 py-20 min-h-[80vh] flex flex-col items-center justify-center text-center"
    >
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-brand/20 blur-2xl rounded-full animate-pulse"></div>
        <div className="relative w-20 h-20 bg-brand rounded-2xl flex items-center justify-center text-white shadow-2xl">
          <Rocket size={40} className="animate-bounce" />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-bold mb-6">
        <Construction size={16} /> New Platform Launching Soon
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight max-w-3xl leading-tight">
        The Future of <span className="text-brand">Professional</span> Temporary Email
      </h1>

      <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">
        We're building a refined dashboard for developers and enterprises who need more than just one-off temporary inboxes. Get early access to our Pro and Enterprise tiers.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3 mb-20">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your work email" 
          required
          className="flex-1 bg-white dark:bg-gray-900 border border-border dark:border-gray-800 rounded-xl px-5 h-14 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand shadow-sm"
        />
        <Button size="lg" className="h-14 px-8 font-bold whitespace-nowrap">
          Join Waitlist
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left w-full">
        {premiumFeatures.map((feature, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="p-6 bg-white dark:bg-gray-950 border border-border dark:border-gray-800 rounded-2xl"
          >
            <div className="w-10 h-10 bg-brand/5 rounded-lg flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center gap-4">
         <p className="text-sm text-gray-400 font-medium">Have questions before we launch?</p>
         <Button variant="ghost" className="text-brand">
           <MessageCircle size={18} className="mr-2" />
           Chat with our founders
         </Button>
      </div>
    </motion.div>
  );
}
