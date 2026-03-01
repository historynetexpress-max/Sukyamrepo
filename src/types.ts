export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  currency: string;
  timestamp: string;
  recipient?: string;
  sender?: string;
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface UserProfile {
  name: string;
  email: string;
  balance: number;
  currency: string;
  avatar?: string;
}

export interface FinancialInsight {
  title: string;
  description: string;
  type: 'warning' | 'tip' | 'positive';
}
