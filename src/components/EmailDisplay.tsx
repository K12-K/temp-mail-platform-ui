import React from 'react';
import { Copy, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { formatTime } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface EmailDisplayProps {
  email: string;
  timeLeft: number;
  isExpired: boolean;
  onRefresh: () => void;
  onCopy: () => void;
  copied: boolean;
}

export function EmailDisplay({ email, timeLeft, isExpired, onRefresh, onCopy, copied }: EmailDisplayProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-12 px-4">
      <div className="bg-white dark:bg-gray-900 border border-border dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 w-full text-center md:text-left">
            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">
              Your Temporary Address
            </span>
            <div className="inline-block md:block font-mono text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 break-all">
              {email}
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <Button 
               variant="outline" 
               size="lg" 
               className="h-12 w-12 p-0" 
               onClick={onRefresh}
            >
              <RefreshCw size={18} className="text-gray-500" />
            </Button>
            <Button size="lg" onClick={onCopy} className="h-12 px-6 min-w-[140px]">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 size={18} /> Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <Copy size={18} /> Copy Address
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 mt-6">
        <div className="flex items-center gap-2 text-xs font-bold text-success">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          System Active
        </div>
        <div className="text-xs font-medium text-gray-500">
          Expires in <span className="text-gray-900 dark:text-gray-100 font-bold ml-1">{formatTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  );
}
