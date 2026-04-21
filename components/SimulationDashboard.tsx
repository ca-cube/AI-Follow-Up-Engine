"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { simulateDealOutcome, SalesState, BuyerBehavior } from '@/lib/simulation';
import { Play, TrendingUp, Clock, DollarSign, AlertCircle, Cpu, Zap, Activity } from 'lucide-react';

export const SimulationDashboard = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState<any>(null);

    const runSimulation = () => {
        setIsRunning(true);
        setResult(null);

        // Simulate some latency for 'PhD' processing
        setTimeout(() => {
            const state: SalesState = {
                dealValue: 50000,
                currentStage: 'Negotiation',
                daysInPipeline: 34,
                interactionCount: 8
            };

            const behavior: BuyerBehavior = {
                intentScore: 0.65,
                responsiveness: 0.8,
                riskAversion: 0.3
            };

            const simResult = simulateDealOutcome(state, behavior);
            setResult(simResult);
            setIsRunning(false);
        }, 2000);
    };

    return (
        <div className="glass-card bg-[#020203]/40 border-white/5 p-8 space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h3 className="text-2xl font-black tracking-tighter flex items-center gap-3">
                        <Cpu className="text-blue-500" /> Monte Carlo Strategy Engine
                    </h3>
                    <p className="text-gray-500 text-sm font-medium mt-1">Stochastic outcome modeling for high-stakes negotiation.</p>
                </div>
                <button
                    onClick={runSimulation}
                    disabled={isRunning}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black tracking-widest uppercase text-xs transition-all duration-500 ${isRunning ? 'bg-blue-600/20 text-blue-400 cursor-not-allowed border border-blue-500/30' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95'}`}
                >
                    {isRunning ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <Zap size={18} fill="currentColor" />
                        </motion.div>
                    ) : <Play size={18} fill="white" />}
                    {isRunning ? "Simulating 1,000 Paths..." : "Initiate Analysis"}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {!result && !isRunning && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-gray-600 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01]"
                    >
                        <div className="p-5 rounded-full bg-white/[0.02] mb-6">
                            <Activity size={48} className="opacity-20 animate-pulse" />
                        </div>
                        <p className="font-bold tracking-tight text-lg">Engine Standby</p>
                        <p className="text-sm font-medium opacity-60 mt-1">Awaiting data input for probabilistic forecasting.</p>
                    </motion.div>
                )}

                {isRunning && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 flex flex-col items-center justify-center space-y-8"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-blue-500/10 border-t-blue-500 animate-spin"></div>
                            <Cpu size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400" />
                        </div>
                        <div className="text-center">
                            <p className="font-black tracking-[0.2em] text-blue-400 uppercase text-xs">Processing Latent Beliefs</p>
                            <p className="text-gray-500 text-sm mt-2 font-medium">Updating prior probabilities via Bayesian inference...</p>
                        </div>
                    </motion.div>
                )}

                {result && !isRunning && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                    >
                        {/* Metrics Column */}
                        <div className="lg:col-span-4 space-y-4">
                            <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 group/metric">
                                <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                                    <TrendingUp size={14} className="text-green-400" /> Probabilistic Win
                                </div>
                                <div className="text-4xl font-black text-white flex items-baseline gap-2">
                                    {(result.winProbability * 100).toFixed(1)}<span className="text-xl text-green-400 font-bold">%</span>
                                </div>
                                <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.winProbability * 100}%` }}
                                        className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                    />
                                </div>
                            </div>

                            <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                                <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                                    <Clock size={14} className="text-blue-400" /> Predicted T-Close
                                </div>
                                <div className="text-4xl font-black text-white flex items-baseline gap-2">
                                    {Math.round(result.predictedDaysToClose)}<span className="text-lg text-blue-400 font-bold uppercase tracking-widest">Days</span>
                                </div>
                            </div>

                            <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                                <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                                    <DollarSign size={14} className="text-indigo-400" /> Expected Yield
                                </div>
                                <div className="text-4xl font-black text-white">
                                    ${Math.round(result.expectedRevenue).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* Chart Column */}
                        <div className="lg:col-span-8 p-8 bg-white/[0.02] rounded-3xl border border-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
                            
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-8 flex items-center gap-2">
                                <Activity size={12} /> Trajectory Variance 
                                <span className="text-blue-400 font-black ml-4 px-2 py-0.5 bg-blue-500/10 rounded">N=1,000 Simulations</span>
                            </h4>
                            
                            <div className="h-64 w-full relative">
                                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    {/* Grid Lines */}
                                    {[0, 25, 50, 75, 100].map((line) => (
                                        <line key={line} x1="0" y1={line} x2="100" y2={line} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                                    ))}
                                    
                                    {result.paths.map((path: number[], idx: number) => (
                                        <motion.polyline
                                            key={idx}
                                            fill="none"
                                            stroke={idx === 0 ? "#3b82f6" : "rgba(255, 255, 255, 0.08)"}
                                            strokeWidth={idx === 0 ? "3" : "1"}
                                            points={path.map((val, i) => `${(i / (path.length - 1)) * 100},${100 - val * 100}`).join(' ')}
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1.5, delay: idx * 0.1, ease: "circOut" }}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className={idx === 0 ? "filter drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" : ""}
                                        />
                                    ))}
                                </svg>
                                
                                <div className="absolute -bottom-6 left-0 w-full flex justify-between px-1 text-[9px] font-black text-gray-600 tracking-widest uppercase">
                                    <span>Initiation</span>
                                    <span>Outcome Horizon</span>
                                </div>

                                <div className="absolute -left-8 top-0 h-full flex flex-col justify-between py-1 text-[8px] font-black text-gray-600">
                                    <span>100%</span>
                                    <span>50%</span>
                                    <span>0%</span>
                                </div>
                            </div>

                            <div className="mt-12 flex gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mean Path</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-1 rounded-full bg-white/10"></div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confidence Interval</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
