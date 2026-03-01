import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  LayoutDashboard, 
  Send, 
  Plus, 
  Search, 
  Bell, 
  Settings,
  TrendingUp,
  CreditCard,
  Sparkles,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction, UserProfile, FinancialInsight } from './types';
import { getFinancialInsights } from './services/geminiService';

const MOCK_USER: UserProfile = {
  name: "Sukyam User",
  email: "user@sukyamrepo.com",
  balance: 12450.80,
  currency: "INR",
  avatar: "https://picsum.photos/seed/sukyam/200"
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'send', amount: 1200, currency: 'INR', timestamp: '2024-03-01T10:30:00', recipient: 'Amazon India', category: 'Shopping', status: 'completed' },
  { id: '2', type: 'receive', amount: 5000, currency: 'INR', timestamp: '2024-02-28T15:45:00', sender: 'Salary Credit', category: 'Income', status: 'completed' },
  { id: '3', type: 'send', amount: 450, currency: 'INR', timestamp: '2024-02-28T09:12:00', recipient: 'Starbucks', category: 'Food', status: 'completed' },
  { id: '4', type: 'send', amount: 2100, currency: 'INR', timestamp: '2024-02-27T18:20:00', recipient: 'Airtel Bill', category: 'Utilities', status: 'completed' },
  { id: '5', type: 'receive', amount: 150, currency: 'INR', timestamp: '2024-02-27T12:00:00', sender: 'Rahul K.', category: 'Transfer', status: 'completed' },
];

export default function App() {
  const [user] = useState<UserProfile>(MOCK_USER);
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [insights, setInsights] = useState<FinancialInsight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  useEffect(() => {
    async function fetchInsights() {
      setLoadingInsights(true);
      const data = await getFinancialInsights(transactions, user.balance);
      setInsights(data);
      setLoadingInsights(false);
    }
    fetchInsights();
  }, [transactions, user.balance]);

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 bg-white hidden lg:flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Wallet size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900">Sukyamrepo</span>
        </div>

        <nav className="space-y-1 flex-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<History size={20} />} label="Transactions" active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} />
          <NavItem icon={<CreditCard size={20} />} label="Cards" active={activeTab === 'cards'} onClick={() => setActiveTab('cards')} />
          <NavItem icon={<TrendingUp size={20} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
        </nav>

        <div className="pt-6 border-t border-zinc-100">
          <NavItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-zinc-200 bg-white px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 bg-zinc-100 px-4 py-2 rounded-full w-96">
            <Search size={18} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search transactions, people..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-zinc-500 hover:text-zinc-900 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-zinc-900">{user.name}</p>
                <p className="text-xs text-zinc-500">Premium Member</p>
              </div>
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-zinc-200"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Balance Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2 bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl"
              >
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm font-medium mb-1 uppercase tracking-widest">Total Balance</p>
                    <h2 className="text-5xl font-bold tracking-tight">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(user.balance)}
                    </h2>
                  </div>
                  
                  <div className="flex gap-4 mt-10">
                    <button 
                      onClick={() => setIsSendModalOpen(true)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <Send size={20} />
                      Send Money
                    </button>
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 backdrop-blur-sm">
                      <Plus size={20} />
                      Add Funds
                    </button>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
              </motion.div>

              {/* AI Insights Panel */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm flex flex-col"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles size={20} className="text-emerald-600" />
                  <h3 className="font-bold text-zinc-900">AI Financial Insights</h3>
                </div>

                <div className="space-y-4 flex-1">
                  {loadingInsights ? (
                    Array(3).fill(0).map((_, i) => (
                      <div key={i} className="animate-pulse flex gap-3">
                        <div className="w-10 h-10 bg-zinc-100 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-zinc-100 rounded w-3/4"></div>
                          <div className="h-3 bg-zinc-100 rounded w-full"></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    insights.map((insight, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className={`p-4 rounded-2xl border ${
                          insight.type === 'warning' ? 'bg-amber-50 border-amber-100' : 
                          insight.type === 'positive' ? 'bg-emerald-50 border-emerald-100' : 
                          'bg-blue-50 border-blue-100'
                        }`}
                      >
                        <h4 className={`text-sm font-bold mb-1 ${
                          insight.type === 'warning' ? 'text-amber-900' : 
                          insight.type === 'positive' ? 'text-emerald-900' : 
                          'text-blue-900'
                        }`}>{insight.title}</h4>
                        <p className="text-xs leading-relaxed opacity-80">{insight.description}</p>
                      </motion.div>
                    ))
                  )}
                </div>
                
                <button className="mt-6 text-sm font-semibold text-emerald-600 flex items-center gap-1 hover:gap-2 transition-all">
                  View full report <ChevronRight size={16} />
                </button>
              </motion.div>
            </div>

            {/* Transactions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-zinc-900">Recent Transactions</h3>
                  <button className="text-sm font-semibold text-emerald-600 hover:underline">See All</button>
                </div>
                
                <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
                  {transactions.map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-5 border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          t.type === 'send' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {t.type === 'send' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900">{t.recipient || t.sender}</p>
                          <p className="text-xs text-zinc-500">{t.category} • {new Date(t.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${t.type === 'send' ? 'text-zinc-900' : 'text-emerald-600'}`}>
                          {t.type === 'send' ? '-' : '+'} {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(t.amount)}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">{t.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Transfer */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-900">Quick Transfer</h3>
                <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm">
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {[1, 2, 3, 4, 5].map(i => (
                      <button key={i} className="flex-shrink-0 flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 rounded-full border-2 border-transparent group-hover:border-emerald-500 p-0.5 transition-all">
                          <img 
                            src={`https://picsum.photos/seed/user${i}/100`} 
                            className="w-full h-full rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-xs font-medium text-zinc-600">User {i}</span>
                      </button>
                    ))}
                    <button className="flex-shrink-0 flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-zinc-200 transition-colors">
                        <Plus size={24} />
                      </div>
                      <span className="text-xs font-medium text-zinc-600">Add</span>
                    </button>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                      <p className="text-xs text-zinc-500 mb-1">Amount to send</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-zinc-900">₹</span>
                        <input 
                          type="number" 
                          placeholder="0.00" 
                          className="bg-transparent text-2xl font-bold text-right outline-none w-full"
                        />
                      </div>
                    </div>
                    <button className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-colors active:scale-95">
                      Send Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Send Money Modal */}
      <AnimatePresence>
        {isSendModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSendModalOpen(false)}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">Send Money</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Recipient UPI ID or Phone</label>
                  <input 
                    type="text" 
                    placeholder="e.g. user@sukyam" 
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-4 outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-xl">₹</span>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-10 pr-4 py-4 text-xl font-bold outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setIsSendModalOpen(false)}
                    className="flex-1 py-4 rounded-2xl font-bold text-zinc-500 hover:bg-zinc-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-200">
                    Confirm Send
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        active 
          ? 'bg-emerald-50 text-emerald-700 font-bold' 
          : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
      {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 bg-emerald-600 rounded-full" />}
    </button>
  );
}
