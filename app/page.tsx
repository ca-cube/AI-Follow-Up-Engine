"use client";

import React, { useState, useEffect } from "react";
import {
    TrendingUp,
    MessageSquare,
    ShieldCheck,
    Zap,
    Target,
    BarChart3,
    ChevronRight,
    Search,
    LayoutDashboard,
    Users,
    Briefcase,
    Settings,
    Bell,
    Cpu,
    RefreshCw,
    Shield,
    Play
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SimulationDashboard } from "@/components/SimulationDashboard";
import { ComplianceEngine } from "@/components/ComplianceEngine";
import { Industry } from "@/lib/compliance";

const MetricCard = ({ title, value, change, icon: Icon, color }: any) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="card group cursor-pointer"
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-500 group-hover:bg-${color}-500 group-hover:text-white transition-all duration-300`}>
                <Icon size={24} />
            </div>
            <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {change}
            </span>
        </div>
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold mt-1">{value}</p>
    </motion.div>
);

const DealHighlight = ({ deal }: any) => (
    <div className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                {deal.company.substring(0, 2).toUpperCase()}
            </div>
            <div>
                <h4 className="font-semibold text-gray-200">{deal.company}</h4>
                <p className="text-xs text-gray-500">{deal.stage} • {deal.lastActivity}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-bold text-white">${deal.value.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1 justify-end">
                <div className={`w-2 h-2 rounded-full ${deal.sentiment === 'positive' ? 'bg-green-500' : deal.sentiment === 'neutral' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
                    Win Prob: {(deal.probability * 100).toFixed(0)}%
                </p>
            </div>
        </div>
    </div>
);

export default function Dashboard() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const deals = [
        { id: 1, company: "Vertex Data", value: 45000, stage: "Negotiation", probability: 0.82, lastActivity: "2h ago", sentiment: "positive" },
        { id: 2, company: "CloudScale", value: 12000, stage: "Initial Pitch", probability: 0.45, lastActivity: "5h ago", sentiment: "neutral" },
        { id: 3, company: "Nexus Health", value: 85000, stage: "Compliance Review", probability: 0.68, lastActivity: "1d ago", sentiment: "positive" },
        { id: 4, company: "FinTech Pro", value: 32000, stage: "Legal", probability: 0.91, lastActivity: "3h ago", sentiment: "positive" },
        { id: 5, company: "Global Logistics", value: 55000, stage: "Discovery", probability: 0.25, lastActivity: "4d ago", sentiment: "negative" },
    ];

    if (!isLoaded) return null;

    return (
        <div className="min-h-screen flex bg-[#050505] text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 glass hidden lg:flex flex-col p-6 z-10">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Zap size={18} fill="white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">FollowUp<span className="text-blue-500">AI</span></h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <div className="py-2 px-3 rounded-lg bg-blue-600/10 text-blue-500 flex items-center gap-3 cursor-pointer">
                        <LayoutDashboard size={20} />
                        <span className="font-semibold">Dashboard</span>
                    </div>
                    <div className="py-2 px-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white flex items-center gap-3 cursor-pointer transition-all">
                        <Briefcase size={20} />
                        <span className="font-medium">Deals</span>
                    </div>
                    <div className="py-2 px-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white flex items-center gap-3 cursor-pointer transition-all">
                        <MessageSquare size={20} />
                        <span className="font-medium">Follow-ups</span>
                    </div>
                    <div className="py-2 px-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white flex items-center gap-3 cursor-pointer transition-all">
                        <Target size={20} />
                        <span className="font-medium">Simulation</span>
                    </div>
                    <div className="py-2 px-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white flex items-center gap-3 cursor-pointer transition-all">
                        <ShieldCheck size={20} />
                        <span className="font-medium">Compliance</span>
                    </div>
                </nav>

                <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
                    <div className="py-2 px-3 rounded-lg hover:bg-white/5 text-gray-400 flex items-center gap-3 cursor-pointer">
                        <Users size={20} />
                        <span className="font-medium">Team</span>
                    </div>
                    <div className="py-2 px-3 rounded-lg hover:bg-white/5 text-gray-400 flex items-center gap-3 cursor-pointer">
                        <Settings size={20} />
                        <span className="font-medium">Settings</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-screen overflow-y-auto relative custom-scrollbar">
                {/* Top Header */}
                <header className="sticky top-0 z-20 glass border-b border-white/5 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-96">
                        <Search size={18} className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search deals, follow-ups, or clients..."
                            className="bg-transparent border-none outline-none text-sm w-full"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative cursor-pointer text-gray-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#050505]"></span>
                        </div>
                        <div className="flex items-center gap-3 cursor-pointer pl-6 border-l border-white/10">
                            <div className="text-right">
                                <p className="text-sm font-bold">Alex Founder</p>
                                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Enterprise Plan</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/20"></div>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
                    {/* Hero Section / Welcome */}
                    <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight mb-2">
                                Good morning, <span className="gradient-text">Strategist.</span>
                            </h2>
                            <p className="text-gray-400 flex items-center gap-2">
                                <Cpu size={16} className="text-blue-500" />
                                AI is currently simulating <span className="text-white font-semibold">1,240</span> deal outcomes across your pipeline.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2">
                                <RefreshCw size={16} /> Sync CRM
                            </button>
                            <button className="btn-primary flex items-center gap-2">
                                <Zap size={16} fill="white" /> New Campaign
                            </button>
                        </div>
                    </section>

                    {/* Metrics Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard title="Win Probability" value="68.4%" change="+4.2%" icon={TrendingUp} color="blue" />
                        <MetricCard title="Sales Velocity" value="24 Days" change="-2 Days" icon={Zap} color="yellow" />
                        <MetricCard title="Drafts Pending" value="12" change="+3 new" icon={MessageSquare} color="green" />
                        <MetricCard title="Risk Exposure" value="$145k" change="-12%" icon={ShieldCheck} color="red" />
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Simulation & Compliance */}
                        <div className="lg:col-span-2 space-y-8">
                            <SimulationDashboard />

                            <ComplianceEngine />

                            <section className="card p-0 overflow-hidden">
                                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                    <h3 className="font-bold flex items-center gap-2 text-lg">
                                        <BarChart3 size={20} className="text-blue-500" /> Pipeline Intensity
                                    </h3>
                                    <button className="text-sm text-blue-500 font-bold hover:underline flex items-center gap-1">
                                        View Pipeline <ChevronRight size={14} />
                                    </button>
                                </div>
                                <div>
                                    {deals.map(deal => <DealHighlight key={deal.id} deal={deal} />)}
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Mini Simulation Engine UI */}
                        <aside className="space-y-6">
                            <div className="card glass border-blue-500/30">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Cpu size={18} className="text-blue-500" /> Deal Simulator
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Select Deal</label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-blue-500 transition-colors">
                                            <option>Vertex Data ($45k)</option>
                                            <option>Nexus Health ($85k)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Scenario Variable</label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-blue-500 transition-colors">
                                            <option>10% Discount Offer</option>
                                            <option>Extend Pilot Phase</option>
                                            <option>Price Increase Announcement</option>
                                        </select>
                                    </div>

                                    <div className="pt-4 pb-2">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-400">Simulation Progress</span>
                                            <span className="text-blue-500 font-bold">100%</span>
                                        </div>
                                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 1.5 }}
                                                className="bg-blue-500 h-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 bg-black/40 rounded-lg border border-white/5 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">Win Prob. Delta</span>
                                            <span className="text-xs text-green-400 font-bold">+12.4%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">Time-to-Close Delta</span>
                                            <span className="text-xs text-red-400 font-bold">-6 Days</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">E(R) Impact</span>
                                            <span className="text-xs text-white font-bold">+$4,200</span>
                                        </div>
                                    </div>

                                    <button className="w-full btn-primary py-3 rounded-xl text-sm font-bold shadow-blue-500/20 mt-2">
                                        Run Monte Carlo Analysis
                                    </button>
                                </div>
                            </div>

                            {/* Engagement Timeline */}
                            <div className="card">
                                <h3 className="font-bold mb-4 text-sm flex items-center gap-2">
                                    <TrendingUp size={16} className="text-gray-400" /> Global Pipeline State
                                </h3>
                                <div className="h-40 flex items-end gap-1 px-2">
                                    {[40, 60, 45, 90, 65, 80, 50, 70, 85, 95, 60, 75, 55, 80, 90].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.05, duration: 0.5 }}
                                            className="flex-1 bg-gradient-to-t from-blue-600/20 to-blue-500/60 rounded-t-sm hover:from-blue-500 hover:to-blue-400 transition-all cursor-pointer"
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2 px-1">
                                    <span className="text-[10px] text-gray-500 font-bold">JAN</span>
                                    <span className="text-[10px] text-gray-500 font-bold">FEB</span>
                                    <span className="text-[10px] text-gray-500 font-bold">MAR</span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
        </div>
    );
}
