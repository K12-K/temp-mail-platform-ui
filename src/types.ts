export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  bodyHtml?: string;
  timestamp: Date;
  isRead: boolean;
}

export type Theme = 'light' | 'dark';
export type AppView = 'dashboard' | 'api-docs' | 'tools' | 'enterprise' | 'features' | 'guide' | 'status' | 'privacy' | 'terms' | 'coming-soon';

export interface AppState {
  currentEmail: string;
  inbox: Email[];
  selectedEmailId: string | null;
  timeLeft: number; // seconds
  isExpired: boolean;
  isRegenerating: boolean;
}
