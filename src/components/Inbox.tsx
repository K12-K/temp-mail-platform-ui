import React from 'react';
import { Mail, Clock, ChevronRight, Inbox as InboxIcon, ArrowLeft, Trash2, Reply, Share2 } from 'lucide-react';
import Linkify from 'linkify-react';
import DOMPurify from "dompurify";
import { motion, AnimatePresence } from 'motion/react';
import { Email } from '../types';
import { Badge } from './Badge';
import { Button } from './Button';
import { cn, formatDate } from '../lib/utils';

interface InboxProps {
  emails: Email[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function Inbox({ emails, selectedId, onSelect, onDelete }: InboxProps) {
  const selectedEmail = emails.find(e => e.id === selectedId);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20">
      <div className="flex flex-col md:flex-row gap-6 h-[600px] md:h-[700px] min-h-0">
        {/* Inbox List */}
        <div className={cn(
          "flex-1 md:w-[340px] md:flex-none flex flex-col bg-white dark:bg-gray-900 border border-border dark:border-gray-800 rounded-xl overflow-hidden shadow-sm",
          selectedEmail ? "hidden md:flex" : "flex"
        )}>
          <div className="px-6 py-4 border-b border-border dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-tight">
              Inbox ({emails.length})
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            {emails.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-105 duration-300">
                  <Mail size={32} className="text-gray-200 dark:text-gray-600 animate-pulse" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">No emails yet</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-[200px]">
                  Messages will appear here as soon as they are received.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border dark:divide-gray-800/50">
                <AnimatePresence initial={false}>
                  {emails.map((email) => (
                    <motion.div
                      key={email.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={() => onSelect(email.id)}
                      className={cn(
                        "px-6 py-5 cursor-pointer transition-colors relative",
                        selectedId === email.id ? "bg-brand-muted dark:bg-brand/10 border-l-4 border-brand" : "hover:bg-gray-50 dark:hover:bg-white/5 border-l-4 border-transparent"
                      )}
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {email.sender}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-gray-400">
                          {formatDate(email.timestamp)}
                        </span>
                      </div>
                      <h4 className={cn(
                        "text-xs font-medium line-clamp-1 truncate text-gray-500 dark:text-gray-400",
                        !email.isRead && "font-bold text-gray-900 dark:text-gray-100"
                      )}>
                        {email.subject}
                      </h4>
                      {!email.isRead && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Email Preview */}
        <div className={cn(
          "flex-1 flex flex-col bg-white dark:bg-gray-900 border border-border dark:border-gray-800 rounded-xl overflow-hidden shadow-sm",
          !selectedEmail ? "hidden md:flex bg-gray-50/30 dark:bg-black/10" : "flex"
        )}>
          {selectedEmail ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col"
            >
              {/* Toolbar */}
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                {/* <div className="flex items-center gap-2"> */}
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => onSelect('')}>
                  <ArrowLeft size={18} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(selectedEmail.id)}>
                  <Trash2 size={18} />
                </Button>
                {/* </div> */}
                {/*
                <div className="flex items-center gap-2">
                   <Button variant="outline" size="sm">
                      <Reply size={14} className="mr-2" /> Reply
                   </Button>
                   <Button variant="outline" size="sm">
                      <Share2 size={14} className="mr-2" /> Share
                   </Button>
                </div>
                */}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto min-h-0 p-6 md:p-10">
                <div className="max-w-3xl mx-auto">
                  <div className="mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                      {selectedEmail.subject}
                    </h1>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xl uppercase">
                        {selectedEmail.sender[0]}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{selectedEmail.sender}</div>
                        <div className="text-sm text-gray-500 font-mono tracking-tight">{selectedEmail.senderEmail}</div>
                      </div>
                      <div className="text-xs text-gray-400 text-right">
                        <div>{selectedEmail.timestamp.toLocaleDateString()}</div>
                        <div>{selectedEmail.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {/* {selectedEmail.body} */}
                    <Linkify
                      options={{
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "text-brand underline hover:opacity-80"
                      }}
                    >
                      {selectedEmail.body}
                    </Linkify>
                  </div>

                  {selectedEmail.bodyHtml && (
                    <div className="mt-12 p-8 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-white/5">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">HTML Preview</div>
                      {/* <div dangerouslySetInnerHTML={{ __html: selectedEmail.bodyHtml }} /> */}
                      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedEmail.bodyHtml) }} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center mb-6">
                <Mail size={32} className="text-gray-300 dark:text-gray-700" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Select an email to read</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-[280px]">
                Choose a message from the list on the left to view its full content and attachments.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
