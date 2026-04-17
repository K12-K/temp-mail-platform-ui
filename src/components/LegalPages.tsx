import React from 'react';
import { motion } from 'motion/react';
import { Shield, FileText, Lock, Eye, Scale, AlertTriangle } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  lastUpdated: string;
}

function LegalLayout({ title, icon, lastUpdated, children }: LegalLayoutProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-4xl mx-auto px-4 py-20"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center text-brand">
          {icon}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
        </div>
      </div>
      
      <div className="prose prose-sm dark:prose-invert max-w-none mt-12 text-gray-600 dark:text-gray-400 leading-relaxed space-y-8">
        {children}
      </div>
    </motion.div>
  );
}

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" icon={<Shield size={24} />} lastUpdated="April 16, 2024">
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
        <p>
          FluxMail is designed to collect as little information as possible. We do not require an account to use our basic temporary email service.
        </p>
        <ul className="list-disc pl-5 mt-4 space-y-2">
          <li><strong>Temporary Email Data:</strong> We store emails received at the generated address for the duration of your session (default 10 minutes).</li>
          <li><strong>Usage Logs:</strong> We maintain minimal logs of API requests to prevent abuse. This includes request timestamps and rate limit data.</li>
          <li><strong>No PII:</strong> We do not link your temporary inbox to your personal IP address, name, or location in a persistent manner.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Data</h2>
        <p>
          Data is used strictly to provide the temporary email service. We do not sell your data, use it for advertising, or build user profiles.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Data Retention</h2>
        <p>
          All temporary emails and addresses are automatically deleted from our servers after your session expires or when you manually regenerate your address. We do not maintain backups of ephemeral data.
        </p>
      </section>

      <section className="p-6 bg-brand/5 rounded-2xl border border-brand/10">
        <h3 className="text-brand font-bold mb-2 flex items-center gap-2">
          <Lock size={18} />
          Our Commitment
        </h3>
        <p className="text-sm italic">
          We believe privacy is a fundamental human right. Our infrastructure is built to ensure that "temporary" actually means temporary.
        </p>
      </section>
    </LegalLayout>
  );
}

export function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" icon={<Scale size={24} />} lastUpdated="April 16, 2024">
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing FluxMail, you agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Use License</h2>
        <p>
          FluxMail is provided for temporary testing and privacy purposes. You may not:
        </p>
        <ul className="list-disc pl-5 mt-4 space-y-2">
          <li>Use the service for any illegal activities or to facilitate spam.</li>
          <li>Attempt to decompile or reverse engineer any software contained on FluxMail's website.</li>
          <li>Automate mass address generation beyond the stated API rate limits.</li>
          <li>Use temporary addresses for long-term account storage where security is critical.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Disclaimer</h2>
        <p>
          The materials on FluxMail are provided on an 'as is' basis. FluxMail makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.
        </p>
      </section>

      <section className="p-6 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-2xl">
        <h3 className="text-amber-800 dark:text-amber-400 font-bold mb-2 flex items-center gap-2">
          <AlertTriangle size={18} />
          Important Notice
        </h3>
        <p className="text-sm text-amber-700 dark:text-amber-300/80">
          Temporary emails can be accessed by anyone who has your unique URL or inbox ID during its lifetime. Do not use for sensitive personal information.
        </p>
      </section>
    </LegalLayout>
  );
}
