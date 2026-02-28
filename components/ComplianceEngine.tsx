"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { checkCompliance, Industry } from '@/lib/compliance';
import { Shield, CheckCircle2, AlertTriangle, FileText, Send } from 'lucide-react';

export const ComplianceEngine = () => {
    const [industry, setIndustry] = useState<Industry>('B2B_SAAS');
    const [draft, setDraft] = useState("Hi team, checking in on the deal. We can offer you unlimited storage and a forever free trial if you sign this medical record release by Friday.");
    const [analysis, setAnalysis] = useState<any>(null);

    const handleAnalyze = () => {
        const result = checkCompliance(draft, industry);
        setAnalysis(result);
    };

    return (
        <div className="card bg-black/40 border-white/10 p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Shield className="text-purple-500" /> Compliance Checker
                </h3>
                <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value as Industry)}
                    className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs font-bold outline-none cursor-pointer"
                >
                    <option value="B2B_SAAS">B2B SaaS</option>
                    <option value="HEALTHCARE">Healthcare (HIPAA)</option>
                    <option value="FINANCE">Finance (FINRA)</option>
                </select>
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-purple-500 transition-all resize-none font-medium"
                        placeholder="Enter follow-up draft..."
                    />
                    <button
                        onClick={handleAnalyze}
                        className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-500 p-2 rounded-lg transition-all"
                    >
                        <Send size={18} />
                    </button>
                </div>

                <AnimatePresence>
                    {analysis && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                        >
                            <div className={`p-4 rounded-xl border ${analysis.isCompliant ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {analysis.isCompliant ? <CheckCircle2 size={18} className="text-green-500" /> : <AlertTriangle size={18} className="text-red-500" />}
                                    <h4 className={`font-bold text-sm ${analysis.isCompliant ? 'text-green-500' : 'text-red-500'}`}>
                                        {analysis.isCompliant ? 'Compliance Verified' : 'Compliance Violations Detected'}
                                    </h4>
                                </div>

                                {!analysis.isCompliant && (
                                    <ul className="space-y-1 ml-6">
                                        {analysis.violations.map((v: string, i: number) => (
                                            <li key={i} className="text-xs text-red-400 font-medium">• {v}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                                <h4 className="text-[10px] uppercase font-bold text-gray-500 mb-2">Auto-Corrected Proposal</h4>
                                <p className="text-sm italic text-gray-300">"{analysis.processedText}"</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
