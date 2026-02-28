/**
 * Monte Carlo Simulation Engine for Deal Outcomes
 * Formalizing P(R | S, B, A)
 */

export interface SalesState {
    dealValue: number;
    currentStage: string;
    daysInPipeline: number;
    interactionCount: number;
}

export interface BuyerBehavior {
    intentScore: number; // Latent state belief
    responsiveness: number;
    riskAversion: number;
}

export interface SimulationResult {
    winProbability: number;
    expectedRevenue: number;
    predictedDaysToClose: number;
    paths: number[][];
}

export const simulateDealOutcome = (
    state: SalesState,
    behavior: BuyerBehavior,
    iterations: number = 1000
): SimulationResult => {
    let wins = 0;
    let totalRevenue = 0;
    let totalDays = 0;
    const paths: number[][] = [];

    for (let i = 0; i < iterations; i++) {
        let currentProb = behavior.intentScore;
        let days = state.daysInPipeline;
        const currentPath: number[] = [currentProb];

        // Simulate day-by-day or event-by-event progression
        // Logic: Intent decays over time if no action, grows with interaction
        while (currentProb > 0.1 && currentProb < 0.95 && days < 180) {
            days += 1;

            // Random walk with drift based on behavior
            const drift = (behavior.responsiveness - 0.5) * 0.02 - (behavior.riskAversion * 0.01);
            const volatility = 0.05;
            const change = drift + (Math.random() - 0.5) * volatility;

            currentProb = Math.max(0, Math.min(1, currentProb + change));
            currentPath.push(currentProb);

            if (currentProb >= 0.95) {
                wins++;
                totalRevenue += state.dealValue;
                totalDays += days;
                break;
            }

            if (currentProb <= 0.1 || days >= 180) {
                // Deal lost or stalled
                break;
            }
        }

        if (i < 5) paths.push(currentPath); // Save a few paths for visualization
    }

    return {
        winProbability: wins / iterations,
        expectedRevenue: totalRevenue / iterations,
        predictedDaysToClose: wins > 0 ? totalDays / wins : 180,
        paths
    };
};

/**
 * Bayesian Update for Buyer Intent
 * Update belief B after interaction A
 */
export const updateBelief = (prior: number, interactionQuality: number): number => {
    // Simple Bayesian-style update: Prior P(H) updated by likelihood P(E|H)
    // interactionQuality acts as the 'evidence'
    const likelihood = interactionQuality;
    const posterior = (likelihood * prior) / (likelihood * prior + (1 - likelihood) * (1 - prior));
    return posterior;
};
