import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  BarChart3, 
  Globe2, 
  CheckCircle2, 
  Mail, 
  Headphones, 
  ArrowRight 
} from 'lucide-react';
import { Button } from './Button';

interface EnterprisePageProps {
  onBack: () => void;
  key?: string;
}

export function EnterprisePage({ onBack }: EnterprisePageProps) {
  const features = [
    {
      title: 'Custom Domains',
      description: 'Bring your own domains or use our premium dedicated domains for consistent sender reputation.',
      icon: <Globe2 className="text-brand" />,
    },
    {
      title: 'Team Management',
      description: 'Manage access for your entire engineering team with SSO and granular RBAC permissions.',
      icon: <Users className="text-brand" />,
    },
    {
      title: 'Advanced Analytics',
      description: 'Track email volume, delivery rates, and response times with real-time dashboards.',
      icon: <BarChart3 className="text-brand" />,
    },
    {
      title: 'Enhanced Security',
      description: 'Benefit from SOC2 Type II compliance, data encryption at rest, and audit logging.',
      icon: <ShieldCheck className="text-brand" />,
    },
    {
      title: 'High Velocity API',
      description: 'Get custom rate limits designed for high-scale automated sign-up and notification testing.',
      icon: <Building2 className="text-brand" />,
    },
    {
      title: 'Priority Support',
      description: '24/7 access to our engineering team via Slack and dedicated account management.',
      icon: <Headphones className="text-brand" />,
    },
  ];

  const plans = [
    {
      name: 'Startup',
      price: '$49',
      description: 'Perfect for growing teams automating their tests.',
      features: ['Up to 5 team members', '3 Custom domains', '50,000 emails/month', '90-day retention'],
    },
    {
      name: 'Business',
      price: '$199',
      description: 'Advanced features for scaling product organizations.',
      features: ['Up to 25 team members', '10 Custom domains', '500,000 emails/month', '1-year retention', 'Priority Slack support'],
      isPopular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Custom infrastructure tailored to your requirements.',
      features: ['Unlimited team members', 'Unlimited domains', 'Custom retention policy', 'Dedicated account manager', 'SLA guarantees'],
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-6xl mx-auto px-4 py-20"
    >
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          FluxMail for <span className="text-brand">Enterprise</span>
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Scale your automated testing infrastructure with the most reliable disposable email platform. 
          Built for teams that demand security, performance, and reliability.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button size="lg" className="px-8 h-14 text-base">Get a Demo</Button>
          <Button variant="outline" size="lg" className="px-8 h-14 text-base" onClick={onBack}>View Documentation</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-900 border border-border dark:border-gray-800 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-brand/5 rounded-2xl flex items-center justify-center mb-6">
              {React.cloneElement(feature.icon as React.ReactElement, { size: 28 })}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed capitalize">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Plans for every stage</h2>
          <p className="text-gray-500">Transparent pricing that scales with your infrastructure needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative bg-white dark:bg-gray-900 border rounded-3xl p-8 flex flex-col ${
                plan.isPopular ? 'border-brand ring-4 ring-brand/5 shadow-2xl' : 'border-border dark:border-gray-800 shadow-sm'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand text-white text-xs font-bold rounded-full uppercase tracking-widest">
                  Most Popular
                </span>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-500">/mo</span>}
                </div>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>
              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((item, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <Button 
                variant={plan.isPopular ? 'primary' : 'outline'} 
                className="w-full h-12 font-bold"
              >
                {plan.price === 'Custom' ? 'Talk to Sales' : 'Start Trial'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-brand rounded-3xl p-8 md:p-16 text-white overflow-hidden relative">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by the best product teams</h2>
            <p className="text-brand-muted text-lg mb-10 max-w-md">
              From fast-moving startups to Fortune 500 companies, FluxMail is the secret weapon for ironclad sign-up flows.
            </p>
            <div className="flex items-center gap-6 saturate-0 opacity-50">
               <span className="font-bold text-xl italic tracking-widest">GITHUB</span>
               <span className="font-bold text-xl italic tracking-widest">VERCEL</span>
               <span className="font-bold text-xl italic tracking-widest">STRIPE</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold mb-6">Have specific requirements?</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input placeholder="Name" className="bg-white/5 border border-white/10 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-white/20" />
                  <input placeholder="Work Email" className="bg-white/5 border border-white/10 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-white/20" />
               </div>
               <textarea placeholder="Tell us about your needs" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 h-32 focus:outline-none focus:ring-2 focus:ring-white/20" />
               <Button className="w-full bg-white text-brand hover:bg-gray-100 h-14 text-lg">
                 Schedule Consultation
                 <ArrowRight size={20} className="ml-2" />
               </Button>
            </form>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
      </div>
    </motion.div>
  );
}
