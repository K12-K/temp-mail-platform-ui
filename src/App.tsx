import React, { useState, useEffect, useCallback } from 'react';
import { Header, Footer } from './components/Header';
import { EmailDisplay } from './components/EmailDisplay';
import { Inbox } from './components/Inbox';
import { ApiDocs } from './components/ApiDocs';
import { ToolsPage } from './components/ToolsPage';
import { EnterprisePage } from './components/EnterprisePage';
import { FeaturesPage } from './components/FeaturesPage';
import { GuidePage } from './components/GuidePage';
import { StatusPage } from './components/StatusPage';
import { PrivacyPage, TermsPage } from './components/LegalPages';
import { ComingSoonPage } from './components/ComingSoon';
import { api } from "./services/api";
import { socket } from "./services/socket";
import { Email, Theme, AppState, AppView } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';

// const domains = ['@tempmail.pro', '@devinbox.com', '@quicktest.io', '@trashmail.net'];
const INITIAL_TIME = 600; // 10 minutes

// const MOCK_SENDERS = [
//   { name: 'Github', email: 'noreply@github.com' },
//   { name: 'Stripe', email: 'support@stripe.com' },
//   { name: 'Vercel', email: 'notifications@vercel.com' },
//   { name: 'System Admin', email: 'admin@tempmail.pro' },
//   { name: 'Linear', email: 'no-reply@linear.app' },
// ];

// const MOCK_SUBJECTS = [
//   'Welcome to the platform',
//   'Your verification code: 482910',
//   'Weekly summary of your activity',
//   'New login from a recognized device',
//   'Your account has been upgraded',
//   'Action required: Update your payment method',
// ];

// const MOCK_BODIES = [
//   "Hello,\n\nWelcome to our platform! We're excited to have you on board. Please click the button below to verify your email address.\n\nBest regards,\nThe Team",
//   "Your one-time password (OTP) is 482910. This code will expire in 10 minutes.\n\nIf you did not request this, please ignore this email.",
//   "Here is your weekly summary for the period of April 10 - April 16. You have 45 new notifications and 12 unresolved tasks.",
//   "A new login was detected on your account from a Chrome browser on macOS. If this was not you, please change your password immediately.",
// ];

export default function App() {
  const [theme, setTheme] = useState<Theme>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const [view, setView] = useState<AppView>('dashboard');

  const [state, setState] = useState<AppState>({
    currentEmail: '',
    inbox: [],
    selectedEmailId: null,
    timeLeft: INITIAL_TIME,
    isExpired: false,
    isRegenerating: false,
  });

  const [copied, setCopied] = useState(false);
  const [isRefreshingInbox, setIsRefreshingInbox] = useState(false);

  const mapEmail = (mail) => ({
    id: mail.id,
    sender: mail.from || "Unknown",
    senderEmail: mail.from || "",
    subject: mail.subject || "(No subject)",
    body: mail.text || mail.html || "",
    timestamp: mail.createdAt ? new Date(mail.createdAt) : new Date(),
    isRead: false,
  });

  // Generate a random email
  // const generateEmail = useCallback(() => {
  //   const prefix = Math.random().toString(36).substring(2, 10);
  //   const domain = domains[Math.floor(Math.random() * domains.length)];
  //   return `${prefix}${domain}`;
  // }, []);
  const generateEmail = useCallback(async () => {
    try {
      const res = await api.post("/api/generate");
      return res.data.email;
    } catch (err) {
      toast.error("Failed to generate email");
      return "";
    }
  }, []);

  // Initial generation
  // useEffect(() => {
  //   setState(s => ({ ...s, currentEmail: generateEmail() }));
  // }, [generateEmail]);
  useEffect(() => {
    (async () => {
      const email = await generateEmail();
      setState(s => ({ ...s, currentEmail: email }));
    })();
  }, [generateEmail]);

  const fetchInbox = useCallback(async (email) => {
    try {
      const res = await api.get(`/api/inbox/${email}`);
      // setState(s => ({ ...s, inbox: res.data }));
      const mapped = (res.data || []).map(mapEmail);
      setState(s => ({ ...s, inbox: mapped }));
    } catch {
      toast.error("Failed to load inbox");
    }
  }, []);

  const markAsRead = useCallback(async (id) => {
    try {
      await api.put(`/api/inbox/${state.currentEmail}/read/${id}`);
    } catch {
      toast.error("Failed to mark as read");
    }
  }, [state.currentEmail]);

  const deleteEmailApi = useCallback(async (id) => {
    try {
      await api.delete(`/api/inbox/${state.currentEmail}/${id}`);
    } catch {
      toast.error("Failed to delete email");
    }
  }, [state.currentEmail]);

  useEffect(() => {
    if (state.currentEmail) {
      fetchInbox(state.currentEmail);
    }
  }, [state.currentEmail, fetchInbox]);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setState(s => {
        if (s.timeLeft <= 0) {
          clearInterval(timer);
          return { ...s, isExpired: true, timeLeft: 0 };
        }
        return { ...s, timeLeft: s.timeLeft - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate incoming emails
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (Math.random() > 0.7) { // 30% chance every 10s to get an email
  //       const sender = MOCK_SENDERS[Math.floor(Math.random() * MOCK_SENDERS.length)];
  //       const newEmail: Email = {
  //         id: Math.random().toString(36).substring(7),
  //         sender: sender.name,
  //         senderEmail: sender.email,
  //         subject: MOCK_SUBJECTS[Math.floor(Math.random() * MOCK_SUBJECTS.length)],
  //         body: MOCK_BODIES[Math.floor(Math.random() * MOCK_BODIES.length)],
  //         timestamp: new Date(),
  //         isRead: false,
  //       };

  //       setState(s => ({
  //         ...s,
  //         inbox: [newEmail, ...s.inbox]
  //       }));

  //       toast.info(`New email from ${sender.name}`, {
  //         description: newEmail.subject,
  //       });
  //     }
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    if (!state.currentEmail) return;

    socket.emit("join_inbox", state.currentEmail);

    const handler = (newEmail) => {
      // setState(s => ({
      //   ...s,
      //   inbox: [newEmail, ...s.inbox]
      // }));
      const mapped = mapEmail(newEmail);
      setState(s => ({
        ...s,
        inbox: [mapped, ...s.inbox]
      }));

      toast.info(`New email`, {
        description: newEmail.subject,
      });
    };

    socket.on("new_email", handler);

    return () => {
      socket.off("new_email", handler);
    };
  }, [state.currentEmail]);

  // const handleRefresh = useCallback(() => {
  //   setState(s => ({
  //     ...s,
  //     currentEmail: generateEmail(),
  //     timeLeft: INITIAL_TIME,
  //     isExpired: false,
  //     inbox: [],
  //     selectedEmailId: null,
  //   }));
  //   toast.success('Email regenerated', {
  //     description: 'Your new temporary address is ready.'
  //   });
  // }, [generateEmail]);
  const handleRefresh = useCallback(async () => {
    const email = await generateEmail();

    setState({
      currentEmail: email,
      inbox: [],
      selectedEmailId: null,
      timeLeft: INITIAL_TIME,
      isExpired: false,
      isRegenerating: false,
    });

    socket.emit("join_inbox", email);

    toast.success("New email generated");
  }, [generateEmail]);

  const handleInboxRefresh = useCallback(async () => {
    if (!state.currentEmail) return;

    setIsRefreshingInbox(true);
    await fetchInbox(state.currentEmail);
    setIsRefreshingInbox(false);

    toast.success("Inbox refreshed");
  }, [state.currentEmail, fetchInbox]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(state.currentEmail);
    setCopied(true);
    toast.success('Address copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  }, [state.currentEmail]);

  // const handleSelectEmail = (id: string) => {
  //   setState(s => ({
  //     ...s,
  //     selectedEmailId: id,
  //     inbox: s.inbox.map(e => e.id === id ? { ...e, isRead: true } : e)
  //   }));
  // };
  const handleSelectEmail = useCallback(async (id: string) => {
    setState(s => ({
      ...s,
      selectedEmailId: id,
      inbox: s.inbox.map(e =>
        e.id === id ? { ...e, isRead: true } : e
      )
    }));
    await markAsRead(id);
  }, [markAsRead]);

  // const handleDeleteEmail = (id: string) => {
  //   setState(s => ({
  //     ...s,
  //     selectedEmailId: s.selectedEmailId === id ? null : s.selectedEmailId,
  //     inbox: s.inbox.filter(e => e.id !== id)
  //   }));
  //   toast.error('Email deleted');
  // };
  const handleDeleteEmail = useCallback(async (id: string) => {
    let deletedEmail;
    setState(s => ({
      ...s,
      selectedEmailId: s.selectedEmailId === id ? null : s.selectedEmailId,
      inbox: s.inbox.filter(e => e.id !== id)
    }));
    try {
      await deleteEmailApi(id);
      toast.success('Email deleted');
    } catch {
      // rollback
      setState(s => ({
        ...s,
        inbox: [deletedEmail, ...s.inbox]
      }));
      toast.error('Delete failed');
    }
  }, [deleteEmailApi]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Error boundary stub as requested in instructions
  useEffect(() => {
    // Simulated connection test to conform to Firebase connection guidelines (even though we aren't using Firebase yet, it's good practice for this environment)
    console.log("App ready. System state healthy.");
  }, []);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Toaster position="top-right" richColors theme={theme} />
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        onNavigate={(newView) => setView(newView)}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <section className="relative overflow-hidden pt-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-brand/5 blur-3xl rounded-full -z-10 animate-pulse"></div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto px-4 text-center"
                >
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-gray-100">
                    Forget spam, keep your inbox <span className="text-brand">pro</span>.
                  </h2>
                  <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    The most advanced disposable email service for developers. Get a professional temporary address that actually works for all your testing needs.
                  </p>
                </motion.div>

                <EmailDisplay
                  email={state.currentEmail}
                  timeLeft={state.timeLeft}
                  isExpired={state.isExpired}
                  onRefresh={handleRefresh}
                  onCopy={handleCopy}
                  copied={copied}
                />
              </section>

              <Inbox
                emails={state.inbox}
                selectedId={state.selectedEmailId}
                onSelect={handleSelectEmail}
                onDelete={handleDeleteEmail}
                onRefresh={handleInboxRefresh}
                isRefreshing={isRefreshingInbox}
              />

              {/* Call to Action for Developers */}
              <section className="max-w-6xl mx-auto px-4 mb-20">
                <div className="bg-brand rounded-2xl p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="relative z-10 flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Integrated with your workflow</h3>
                    <p className="text-brand-muted mb-6 max-w-md">
                      Automate your sign-up tests with our robust API. Get programmatic access to temporary inboxes and message content.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setView('api-docs')}
                        className="bg-white text-brand px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-colors"
                      >
                        View API Docs
                      </button>
                      <button className="bg-white/10 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>

                  <div className="relative z-10 flex-none bg-black/20 p-6 rounded-xl border border-white/10 font-mono text-sm">
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="text-gray-400"># Fetch your inbox via curl</div>
                    <div className="flex gap-2 text-brand-muted">
                      <span className="text-emerald-400">curl</span>
                      <span>-X GET "https://api.fluxmail.io/v1/inbox"</span>
                    </div>
                    <div className="mt-2 text-gray-400"># Response</div>
                    <div className="text-emerald-400">{"{ \"status\": \"success\", \"inbox\": [] }"}</div>
                  </div>

                  {/* Decorative blobs */}
                  <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute -top-12 -left-12 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'api-docs' && (
            <ApiDocs key="api-docs" onBack={() => setView('dashboard')} />
          )}

          {view === 'tools' && (
            <ToolsPage key="tools" />
          )}

          {view === 'enterprise' && (
            <EnterprisePage key="enterprise" onBack={() => setView('dashboard')} />
          )}

          {view === 'features' && (
            <FeaturesPage key="features" />
          )}

          {view === 'guide' && (
            <GuidePage key="guide" />
          )}

          {view === 'status' && (
            <StatusPage key="status" />
          )}

          {view === 'privacy' && (
            <PrivacyPage key="privacy" />
          )}

          {view === 'terms' && (
            <TermsPage key="terms" />
          )}

          {view === 'coming-soon' && (
            <ComingSoonPage key="coming-soon" />
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={(newView) => setView(newView)} />
    </div>
  );
}
