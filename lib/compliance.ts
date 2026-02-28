/**
 * Compliance-Aware Follow-Up Engine
 * Filters and modifies content based on industry regulations
 */

export type Industry = 'B2B_SAAS' | 'HEALTHCARE' | 'FINANCE' | 'REAL_ESTATE';

interface ComplianceRule {
    industry: Industry;
    regex: RegExp;
    replacement: string;
    reason: string;
}

const COMPLIANCE_RULES: ComplianceRule[] = [
    {
        industry: 'HEALTHCARE',
        regex: /\b(patient|health record|diagnosis|medical condition)\b/gi,
        replacement: "[PROTECTED ENTITY]",
        reason: "HIPAA violation risk: Direct mention of patient data."
    },
    {
        industry: 'FINANCE',
        regex: /\b(guaranteed return|no risk|risk-free|100% safe)\b/gi,
        replacement: "[DISCLAIMER REQUIRED]",
        reason: "FINRA compliance: Misleading performance claims."
    },
    {
        industry: 'B2B_SAAS',
        regex: /\b(unlimited storage|forever free|never expires)\b/gi,
        replacement: "subject to fair use terms",
        reason: "Legal clarity: Avoiding strictly absolute marketing claims."
    }
];

export const checkCompliance = (text: string, industry: Industry) => {
    let processedText = text;
    const violations: string[] = [];

    COMPLIANCE_RULES.filter(r => r.industry === industry).forEach(rule => {
        if (rule.regex.test(processedText)) {
            violations.push(rule.reason);
            processedText = processedText.replace(rule.regex, rule.replacement);
        }
    });

    return {
        isCompliant: violations.length === 0,
        processedText,
        violations
    };
};

export const generateFollowUp = (
    context: string,
    industry: Industry,
    tone: 'professional' | 'urgent' | 'casual' = 'professional'
): string => {
    // Mock LLM generation logic
    let baseTemplate = "";

    if (industry === 'HEALTHCARE') {
        baseTemplate = "Dear Health Provider, Following up on our discussion regarding the digital health platform. We ensure HIPAA compliance throughout the data lifecycle.";
    } else if (industry === 'FINANCE') {
        baseTemplate = "Hello, Regarding the portfolio management suite. Our platform provides high security for transaction logs and history.";
    } else {
        baseTemplate = "Hi there, Great chatting about the new SaaS integration. Our platform will scale with your team seamlessly.";
    }

    const { processedText } = checkCompliance(baseTemplate, industry);
    return processedText;
};
