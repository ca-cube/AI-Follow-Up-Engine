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
    Play,
    Activity,
    Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SimulationDashboard } from "@/components/SimulationDashboard";
import { ComplianceEngine } from "@/components/ComplianceEngine";

const MetricCard = ({ title, value, change, icon: Icon, color }: any) => (
    <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="glass-card p-6 group cursor-pointer relative overflow-hidden"
    >
        <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/5 blur-3xl -mr-12 -mt-12 group-hover:bg-${color}-500/10 transition-all duration-500`}></div>
        
        <div className="flex justify-between items-start mb-6">
            <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-400 group-hover:bg-${color}-500 group-hover:text-white transition-all duration-300 shadow-lg`}>
                <Icon size={22} />
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {change.startsWith('+') ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />}
                {change}
            </div>
        </div>
        
        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-[0.15em] mb-1">{title}</h3>
        <p className="text-3xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">{value}</p>
        
        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                className={`h-full bg-${color}-500/50`}
            />
        </div>
    </motion.div>
);

const DealHighlight = ({ deal }: any) => (
    <motion.div 
        whileHover={{ x: 4 }}
        className="flex items-center justify-between p-5 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-all cursor-pointer group"
    >
        <div className="flex items-center gap-5">
            <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center text-sm font-black border border-white/10 group-hover:border-blue-500/50 transition-all">
                    {deal.company.substring(0, 2).toUpperCase()}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#020203] ${deal.sentiment === 'positive' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            </div>
            <div>
                <h4 className="font-bold text-gray-100 group-hover:text-blue-400 transition-colors">{deal.company}</h4>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-gray-500 uppercase tracking-tighter">{deal.stage}</span>
                    <span className="text-[10px] text-gray-600 font-medium">• {deal.lastActivity}</span>
                </div>
            </div>
        </div>
        <div className="text-right">
            <p className="font-black text-lg text-white">${deal.value.toLocaleString()}</p>
            <div className="flex items-center gap-2 mt-1 justify-end">
                <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500/40" style={{ width: `${deal.probability * 100}%` }}></div>
                </div>
                <p className="text-[10px] text-blue-400 font-black tracking-widest leading-none">
                    {(deal.probability * 100).toFixed(0)}%
                </p>
            </div>
        </div>
    </motion.div>
);

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");

    const deals = [
        { id: 1, company: "Vertex Data", value: 45000, stage: "Negotiation", probability: 0.82, lastActivity: "2h ago", sentiment: "positive" },
        { id: 2, company: "CloudScale", value: 12000, stage: "Initial Pitch", probability: 0.45, lastActivity: "5h ago", sentiment: "neutral" },
        { id: 3, company: "Nexus Health", value: 85000, stage: "Compliance Review", probability: 0.68, lastActivity: "1d ago", sentiment: "positive" },
        { id: 4, company: "FinTech Pro", value: 32000, stage: "Legal", probability: 0.91, lastActivity: "3h ago", sentiment: "positive" },
        { id: 5, company: "Global Logistics", value: 55000, stage: "Discovery", probability: 0.25, lastActivity: "4d ago", sentiment: "negative" },
    ];

    const menuItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
        { id: "deals", icon: Briefcase, label: "Deal Pipeline" },
        { id: "followups", icon: MessageSquare, label: "Draft Engine" },
        { id: "simulation", icon: Target, label: "Monte Carlo" },
        { id: "compliance", icon: ShieldCheck, label: "Guardrails" },
    ];

    return (
        <div className="min-h-screen flex bg-[#020203] text-white font-sans overflow-hidden selec">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 glass hidden lg:flex flex-col p-8 z-30">
                <div className="flex items-center gap-4 mb-12 px-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] overflow-hidden">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-150" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter leading-none">FOLLOWUP<span className="text-blue-500">.AI</span></h1>
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Strategic Engine</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <div 
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`group py-3 px-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all duration-300 ${activeTab === item.id ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-500 hover:text-gray-200 hover:bg-white/5 border border-transparent'}`}
                        >
                            <item.icon size={20} />
                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                            {activeTab === item.id && (
                                <motion.div layoutId="activeDot" className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></motion.div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="mt-auto p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                            <Lock size={14} />
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Security</p>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Compliance-aware processing is active for <span className="text-blue-400">Healthcare</span> & <span className="text-purple-400">Finance</span> verticals.</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-screen overflow-y-auto relative custom-scrollbar z-10 font-outfit">
                {/* Decorative Header Gradient */}
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none"></div>

                {/* Top Header */}
                <header className="sticky top-0 z-40 glass border-b border-white/5 px-10 py-5 flex items-center justify-between backdrop-blur-2xl">
                    <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 px-5 py-2.5 rounded-2xl w-[450px] focus-within:border-blue-500/50 transition-all">
                        <Search size={18} className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Command center: Search deals, behavior or logs..."
                            className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-gray-600"
                        />
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="relative group cursor-pointer">
                            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 group-hover:bg-white/5 transition-all">
                                <Bell size={20} className="text-gray-400 group-hover:text-white" />
                            </div>
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#020203] shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
                        </div>
                        
                        <div className="flex items-center gap-4 pl-8 border-l border-white/10">
                            <div className="text-right">
                                <p className="text-xs font-black uppercase tracking-tighter text-blue-400">Strategist Account</p>
                                <p className="text-sm font-black text-white">Alex Sterling</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/20 p-0.5 hover:rotate-3 transition-transform cursor-pointer">
                                <div className="w-full h-full rounded-[14px] bg-[#020203] flex items-center justify-center overflow-hidden">
                                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-10 max-w-[1400px] mx-auto space-y-12">
                    {/* Welcome Section */}
                    <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-4">
                        <div className="space-y-2">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-[0.3em]"
                            >
                                <div className="w-8 h-[2px] bg-blue-500"></div> System Status: Online
                            </motion.div>
                            <h2 className="text-5xl font-black tracking-tighter">
                                Welcome back, <span className="gradient-text">Alex Sterling.</span>
                            </h2>
                            <p className="text-gray-500 flex items-center gap-2 font-medium text-lg">
                                <Cpu size={20} className="text-blue-500 animate-pulse" />
                                Behavioral engines are simulating <span className="text-white font-black underline decoration-blue-500/50 underline-offset-4">1,240</span> outcomes.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button className="px-6 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 font-bold text-sm hover:bg-white/[0.06] transition-all flex items-center gap-2 group">
                                <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" /> 
                                <span className="tracking-tight">Sync Ecosystem</span>
                            </button>
                            <button className="btn-premium flex items-center gap-2">
                                <Zap size={18} fill="white" className="animate-bounce" /> 
                                <span className="tracking-tight">New Strategy</span>
                            </button>
                        </div>
                    </section>

                    {/* Metrics Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <MetricCard title="Win Probability" value="68.4%" change="+4.2%" icon={TrendingUp} color="blue" />
                        <MetricCard title="Sales Velocity" value="24 Days" change="-2 Days" icon={Zap} color="indigo" />
                        <MetricCard title="Compliance Health" value="99.2%" change="+0.5%" icon={ShieldCheck} color="purple" />
                        <MetricCard title="Revenue At Risk" value="$145k" change="-12%" icon={Target} color="red" />
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Simulation & Compliance Column */}
                        <div className="lg:col-span-8 space-y-10">
                            <SimulationDashboard />

                            <ComplianceEngine />

                            <section className="glass overflow-hidden border-white/[0.03]">
                                <div className="p-8 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                                    <h3 className="font-black text-xl tracking-tighter flex items-center gap-3">
                                        <BarChart3 size={24} className="text-blue-500" /> Live Pipeline Intensity
                                    </h3>
                                    <button className="group text-xs text-blue-400 font-extrabold tracking-widest uppercase flex items-center gap-2 hover:text-white transition-colors">
                                        Explorer <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                                <div className="p-2">
                                    {deals.map(deal => <DealHighlight key={deal.id} deal={deal} />)}
                                </div>
                            </section>
                        </div>

                        {/* Right Sidebar Widgets */}
                        <aside className="lg:col-span-4 space-y-8">
                            <div className="glass-card p-8 border-blue-500/20 relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[80px] rounded-full"></div>
                                <h3 className="font-black text-lg mb-6 flex items-center gap-3 tracking-tighter">
                                    <Cpu size={22} className="text-blue-500" /> Scenario Sandbox
                                </h3>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] ml-1">Target Account</label>
                                        <div className="relative group">
                                            <select className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-blue-500/50 appearance-none cursor-pointer transition-all">
                                                <option>Vertex Data ($45k)</option>
                                                <option>Nexus Health ($85k)</option>
                                            </select>
                                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-500" size={16} />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] ml-1">Strategy Variable</label>
                                        <div className="relative group">
                                            <select className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-blue-500/50 appearance-none cursor-pointer transition-all">
                                                <option>Incentive Structural Offer</option>
                                                <option>Pilot Duration Extension</option>
                                                <option>Executive Access Bundle</option>
                                            </select>
                                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-500" size={16} />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <div className="flex justify-between text-[11px] mb-2 font-black tracking-widest text-gray-500 uppercase">
                                            <span>Engine Resonance</span>
                                            <span className="text-blue-500">92%</span>
                                        </div>
                                        <div className="w-full bg-white/[0.03] h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "92%" }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full shadow-[0_0_10px_#2563eb]"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/[0.05] space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.03]">
                                            <span className="text-xs text-gray-500 font-bold">Win Prob. Δ</span>
                                            <span className="text-sm text-green-400 font-black">+14.2%</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.03]">
                                            <span className="text-xs text-gray-500 font-bold">Velocity Δ</span>
                                            <span className="text-sm text-red-400 font-black">-8 Days</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500 font-bold">E(R) Impact</span>
                                            <span className="text-sm text-white font-black">+$5,800</span>
                                        </div>
                                    </div>

                                    <button className="w-full btn-premium py-4 rounded-2xl text-sm font-black shadow-blue-600/20 group uppercase tracking-widest">
                                        Initiate Simulation
                                    </button>
                                </div>
                            </div>

                            {/* Global Sentiment Chart */}
                            <div className="glass-card p-8 border-white/[0.03]">
                                <h3 className="font-black text-sm mb-8 flex items-center gap-3 tracking-widest uppercase text-gray-400">
                                    <Activity size={18} className="text-indigo-400" /> Pipeline Drift
                                </h3>
                                <div className="h-44 flex items-end gap-1.5 px-1">
                                    {[45, 65, 40, 85, 70, 95, 55, 75, 90, 80, 65, 85, 60, 95, 88].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: `${h}%`, opacity: 1 }}
                                            transition={{ delay: i * 0.05, duration: 0.8, ease: "circOut" }}
                                            className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-600/10 via-blue-500/40 to-blue-400/80 hover:scale-x-125 transition-all cursor-pointer relative group"
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                {h}%
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-5 px-1 font-black text-[9px] text-gray-600 tracking-[0.2em]">
                                    <span>Q1 BASELINE</span>
                                    <span>REALTIME ADAPT</span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(255, 255, 255, 0.05);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(59, 130, 246, 0.3);
                }
                
                @media (min-width: 1024px) {
                  .custom-scrollbar {
                    scrollbar-gutter: stable;
                  }
                }
            `}</style>
        </div>
    );
}
