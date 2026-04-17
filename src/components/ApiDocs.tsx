import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Copy, Globe, Shield, Zap, Box } from 'lucide-react';
import { Button } from './Button';
import { toast } from 'sonner';

interface ApiDocsProps {
  onBack: () => void;
  key?: string; // Explicitly adding key if required by strict check
}

export function ApiDocs({ onBack }: ApiDocsProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Code copied to clipboard');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl mx-auto px-4 py-12"
    >
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            API Documentation
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Learn how to integrate FluxMail into your automated testing workflows.
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to Inbox
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 hidden lg:block sticky top-28 h-fit">
          <nav className="space-y-1">
            {['Introduction', 'Authentication', 'Endpoints', 'Rate Limits', 'SDKs'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-all"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-16">
          <section id="introduction">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap size={20} className="text-brand" />
              Introduction
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                FluxMail provides a RESTful API that allows developers to programmatically create temporary email addresses and retrieve messages. 
                This is particularly useful for end-to-end testing, account verification automation, and privacy-preserving application development.
              </p>
              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-xl p-4 mt-6">
                <p className="text-amber-800 dark:text-amber-300 text-sm font-medium">
                  <strong>Note:</strong> All API endpoints are rate-limited to 60 requests per minute per IP address to ensure system stability.
                </p>
              </div>
            </div>
          </section>

          <section id="authentication">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield size={20} className="text-brand" />
              Authentication
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              Requests are authenticated via a Bearer token in the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-pink-500">Authorization</code> header.
            </p>
            <div className="bg-gray-900 rounded-xl overflow-hidden">
               <div className="px-4 py-2 bg-gray-800 flex items-center justify-between border-b border-gray-700">
                  <span className="text-xs font-mono text-gray-400 tracking-wider">HEADER</span>
                  <button onClick={() => handleCopy('Authorization: Bearer YOUR_API_KEY')} className="text-gray-400 hover:text-white transition-colors">
                    <Copy size={14} />
                  </button>
               </div>
               <div className="p-4 font-mono text-sm text-brand-muted">
                  Authorization: Bearer YOUR_API_KEY
               </div>
            </div>
          </section>

          <section id="endpoints">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
              <Box size={20} className="text-brand" />
              Endpoints
            </h2>

            <div className="space-y-12">
              {/* GET INBOX */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-xs font-bold font-mono">GET</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">/v1/inbox</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Retrieves all messages currently stored in your temporary inbox.</p>
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                   <div className="px-4 py-2 bg-gray-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-gray-400 tracking-wider">REQUEST</span>
                      <button onClick={() => handleCopy('curl https://api.fluxmail.io/v1/inbox')} className="text-gray-400 hover:text-white transition-colors">
                        <Copy size={14} />
                      </button>
                   </div>
                   <div className="p-4 font-mono text-sm text-brand-muted overflow-x-auto whitespace-pre">
                      {`curl -X GET "https://api.fluxmail.io/v1/inbox" \\
  -H "Authorization: Bearer YOUR_TOKEN"`}
                   </div>
                </div>
              </div>

              {/* GET MESSAGE */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-xs font-bold font-mono">GET</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">/v1/messages/:id</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Fetch the full content of a specific message, including HTML body and headers.</p>
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                   <div className="px-4 py-2 bg-gray-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-gray-400 tracking-wider">REQUEST</span>
                   </div>
                   <div className="p-4 font-mono text-sm text-brand-muted">
                      curl -X GET "https://api.fluxmail.io/v1/messages/msg_8k2l9m"
                   </div>
                </div>
              </div>
            </div>
          </section>

          <section id="sdks">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Terminal size={20} className="text-brand" />
              Community SDKs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 { name: 'Node.js', lang: 'JavaScript', command: 'npm install fluxmail-sdk' },
                 { name: 'Python', lang: 'Python 3', command: 'pip install fluxmail' },
                 { name: 'Go', lang: 'Go 1.18+', command: 'go get github.com/fluxmail/go-sdk' },
                 { name: 'Ruby', lang: 'Ruby 3.1+', command: 'gem install fluxmail' },
               ].map((sdk) => (
                 <div key={sdk.name} className="p-4 border border-border dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900 dark:text-white">{sdk.name}</span>
                      <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">{sdk.lang}</span>
                    </div>
                    <code className="text-xs text-brand truncate block mb-3 group relative">
                       {sdk.command}
                    </code>
                    <Button variant="ghost" size="sm" className="w-full h-8 text-xs" onClick={() => handleCopy(sdk.command)}>
                       Copy Install Command
                    </Button>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
