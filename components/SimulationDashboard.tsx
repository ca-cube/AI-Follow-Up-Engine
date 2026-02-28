"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { simulateDealOutcome, SalesState, BuyerBehavior } from '@/lib/simulation';
import { Play, TrendingUp, Clock, DollarSign, AlertCircle } from 'lucide-react';

export const SimulationDashboard = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState<any>(null);

    const runSimulation = () => {
        setIsRunning(true);

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
        }, 1500);
    };

    return (
        <div className="card bg-black/40 border-white/10 p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp className="text-blue-500" /> Outcome Simulator
                </h3>
                <button
                    onClick={runSimulation}
                    disabled={isRunning}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${isRunning ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20'}`}
                >
                    {isRunning ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <Play size={18} fill="white" />
                        </motion.div>
                    ) : <Play size={18} fill="white" />}
                    {isRunning ? "Simulating..." : "Run Analysis"}
                </button>
            </div>

            {!result && !isRunning && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500 border-2 border-dashed border-white/5 rounded-xl">
                    <AlertCircle size={48} className="mb-4 opacity-20" />
                    <p>Select a deal and click 'Run Analysis' to simulate 1,000 outcomes.</p>
                </div>
            )}

            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                            <TrendingUp size={14} /> Win Probability
                        </div>
                        <div className="text-2xl font-bold text-green-400">
                            {(result.winProbability * 100).toFixed(1)}%
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                            <Clock size={14} /> Est. Time to Close
                        </div>
                        <div className="text-2xl font-bold text-blue-400">
                            {Math.round(result.predictedDaysToClose)} Days
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                            <DollarSign size={14} /> Expected Value
                        </div>
                        <div className="text-2xl font-bold text-white">
                            ${Math.round(result.expectedRevenue).toLocaleString()}
                        </div>
                    </div>

                    <div className="md:col-span-3 p-4 bg-white/5 rounded-xl border border-white/5">
                        <h4 className="text-xs font-bold uppercase text-gray-400 mb-4">Sample Deal Trajectories (Intent State)</h4>
                        <div className="h-48 w-full relative group">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {result.paths.map((path: number[], idx: number) => (
                                    <motion.polyline
                                        key={idx}
                                        fill="none"
                                        stroke={idx === 0 ? "rgba(59, 130, 246, 0.8)" : "rgba(255, 255, 255, 0.1)"}
                                        strokeWidth={idx === 0 ? "2" : "1"}
                                        points={path.map((val, i) => `${(i / path.length) * 100},${100 - val * 100}`).join(' ')}
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1 }}
                                    />
                                ))}
                            </svg>
                            <div className="absolute top-0 left-0 w-full flex justify-between px-1">
                                <span className="text-[10px] text-gray-600">Decision Point</span>
                                <span className="text-[10px] text-gray-600">Completion</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
