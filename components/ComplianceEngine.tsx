"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { checkCompliance, Industry } from '@/lib/compliance';
import { Shield, CheckCircle2, AlertTriangle, FileText, Send, Lock, Eye, EyeOff, Terminal } from 'lucide-react';

export const ComplianceEngine = () => {
    const [industry, setIndustry] = useState<Industry>('B2B_SAAS');
    const [draft, setDraft] = useState("Hi team, checking in on the deal. We can offer you unlimited storage and a forever free trial if you sign this medical record release by Friday.");
    const [analysis, setAnalysis] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setAnalysis(null);
        
        setTimeout(() => {
            const result = checkCompliance(draft, industry);
            setAnalysis(result);
            setIsAnalyzing(false);
        }, 1200);
    };

    return (
        <div className="glass-card bg-[#020203]/40 border-white/5 p-8 space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[80px] rounded-full group-hover:bg-purple-500/10 transition-all duration-700"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black tracking-tighter flex items-center gap-3">
                            Compliance Guardrails
                        </h3>
                        <p className="text-gray-500 text-sm font-medium mt-1">Real-time regulatory validation for outbound drafts.</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-1.5 focus-within:border-purple-500/50 transition-all">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-3">Context:</span>
                    <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value as Industry)}
                        className="bg-transparent text-xs font-black uppercase tracking-widest outline-none cursor-pointer py-2 pr-4 text-purple-400"
                    >
                        <option value="B2B_SAAS">B2B SaaS</option>
                        <option value="HEALTHCARE">Healthcare (HIPAA)</option>
                        <option value="FINANCE">Finance (FINRA)</option>
                    </select>
                </div>
            </div>

            <div className="space-y-6">
                <div className="relative group/input">
                    <div className="absolute -top-3 left-6 px-3 bg-[#020203] border-x border-white/10 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] z-10 group-focus-within/input:text-purple-400 transition-colors">
                        Outbound Content
                    </div>
                    <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        className="w-full h-40 bg-white/[0.02] border border-white/5 rounded-3xl p-8 text-base outline-none focus:border-purple-500/50 transition-all resize-none font-medium leading-relaxed placeholder:text-gray-700 focus:bg-white/[0.04]"
                        placeholder="Paste or type your follow-up draft here..."
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="absolute bottom-6 right-6 bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-110 active:scale-95 disabled:opacity-50"
                    >
                        {isAnalyzing ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Lock size={20} /></motion.div> : <Terminal size={20} />}
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {analysis && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className={`p-6 rounded-3xl border-2 shadow-2xl ${analysis.isCompliant ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`p-2 rounded-xl ${analysis.isCompliant ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500'}`}>
                                        {analysis.isCompliant ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                                    </div>
                                    <div>
                                        <h4 className={`font-black tracking-tighter text-lg ${analysis.isCompliant ? 'text-green-400' : 'text-red-400'}`}>
                                            {analysis.isCompliant ? 'Security Verified' : 'Compliance Violations Prevented'}
                                        </h4>
                                        <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mt-0.5">
                                            {analysis.isCompliant ? 'Ready for release' : `${analysis.violations.length} Potential regulatory risks found`}
                                        </p>
                                    </div>
                                </div>

                                {!analysis.isCompliant && (
                                    <div className="ml-14 space-y-3">
                                        {analysis.violations.map((v: string, i: number) => (
                                            <div key={i} className="flex items-start gap-2 group/vio">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shadow-[0_0_8px_#ef4444]"></div>
                                                <p className="text-sm text-red-400/80 font-bold tracking-tight">{v}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="relative group/correct">
                                <div className="absolute -top-3 left-6 px-3 bg-[#020203] border-x border-white/10 text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] z-10">
                                    Proposed Safe Version
                                </div>
                                <div className="p-8 bg-purple-500/[0.03] rounded-3xl border border-purple-500/20 backdrop-blur-md">
                                    <p className="text-lg italic text-white/90 leading-relaxed font-outfit">
                                        "{analysis.processedText}"
                                    </p>
                                    <div className="mt-6 flex items-center gap-4">
                                        <button className="px-6 py-2.5 rounded-xl bg-purple-500 text-white font-black text-xs uppercase tracking-widest hover:bg-purple-400 transition-colors">
                                            Apply Changes
                                        </button>
                                        <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors">
                                            Ignore Risk
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
