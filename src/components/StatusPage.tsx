import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Activity, 
  Globe, 
  Database, 
  ShieldCheck, 
  Server
} from 'lucide-react';

export function StatusPage() {
  const systems = [
    { name: 'Core API', status: 'operational', uptime: '99.99%', icon: <Server size={18} /> },
    { name: 'Inbound Mail Routing', status: 'operational', uptime: '99.98%', icon: <Globe size={18} /> },
    { name: 'Dashboard UI', status: 'operational', uptime: '100%', icon: <Activity size={18} /> },
    { name: 'Data Storage', status: 'operational', uptime: '99.99%', icon: <Database size={18} /> },
    { name: 'Authentication Service', status: 'operational', uptime: '100%', icon: <ShieldCheck size={18} /> },
  ];

  const incidents = [
    {
      date: 'April 12, 2024',
      title: 'Scheduled Database Maintenance',
      description: 'The database was upgraded to a new version to improve performance. System remained operational throughout the window.',
      type: 'maintained'
    },
    {
      date: 'March 28, 2024',
      title: 'Minor Latency in APAC Region',
      description: 'Users in the APAC region experienced a 200ms increase in email delivery latency. Resolved after routing optimization.',
      type: 'resolved'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-4xl mx-auto px-4 py-20"
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">System Status</h1>
          <p className="text-gray-500 dark:text-gray-400">Real-time health of the FluxMail infrastructure.</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
          <span className="font-bold text-success">All Systems Operational</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-border dark:border-gray-800 rounded-3xl overflow-hidden mb-16 shadow-sm">
        <div className="px-8 py-6 border-b border-border dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
          <h2 className="font-bold text-gray-900 dark:text-white">Active Components</h2>
          <span className="text-xs text-gray-400 font-mono">Last updated: Just now</span>
        </div>
        <div className="divide-y divide-border dark:divide-gray-800">
          {systems.map((item, idx) => (
            <div key={idx} className="px-8 py-6 flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-gray-400 group-hover:text-brand transition-colors">
                  {item.icon}
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
              </div>
              <div className="flex items-center gap-8">
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Uptime (90d)</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{item.uptime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-success" />
                  <span className="text-sm text-success font-medium">Operational</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Past Incidents</h2>
        <div className="space-y-6">
          {incidents.map((incident, idx) => (
            <div key={idx} className="relative pl-8 border-l-2 border-border dark:border-gray-800">
              <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-border dark:bg-gray-800" />
              <div className="mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{incident.date}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{incident.title}</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                {incident.description}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                <CheckCircle2 size={12} /> {incident.type}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Subscribe to Status Updates</h2>
            <p className="text-gray-400 text-sm">Get notified via email whenever there is a system disturbance.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="email@company.com" 
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand flex-1 md:w-64"
            />
            <button className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm">
              Subscribe
            </button>
          </div>
        </div>
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand/20 rounded-full blur-3xl" />
      </div>
    </motion.div>
  );
}
