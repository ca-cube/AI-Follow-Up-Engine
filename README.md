# 📧 AI Follow-Up Engine — Startup Blueprint

## 🎯 Verticalized, Compliance-Aware Negotiation Intelligence

This project implements a verticalized AI engine designed to optimize B2B SaaS, Healthcare, and Finance sales pipelines through probabilistic outcome simulation and compliance-aware automation.

### 🧠 PhD Researcher Lens (Core Logic)

#### 1. Behavioral State Modeling
Instead of simple heuristic scoring, we model buyer intent as a latent state $B$ within a sales state vector $S$.
- **Bayesian Inference**: We update our belief about buyer $B$ after every interaction $A$.
- **Simulation**: We formalize $P(R | S, B, A)$ where $R$ is the revenue outcome.

#### 2. Monte Carlo Deal Simulation
The `SimulationEngine` runs 1,000+ iterations of potential deal paths, calculating:
- **Win Probability**: Proportion of paths ending in a closed-won state.
- **Expected Revenue (E[R])**: Probability-weighted deal value.
- **Sales Velocity**: Predicted time-to-close based on behavioral drift and volatility.

### 💼 Entrepreneur Lens (Market Positioning)

#### 1. Vertical over Horizontal
We don't compete with Gong or Outreach on volume. We win on **depth**:
- **Healthcare**: HIPAA-compliant follow-ups that automatically scrub sensitive PHI.
- **Finance**: FINRA-aware drafting that prevents misleading performance claims.

#### 2. Strategic Strategic Dashboard
The UI is built for the **Strategist**, not just the Rep. It provides a strategic view of "Expected Margin" and "Delay Risk" rather than just "Activity counts."

---

## 🛠 Tech Stack & Architecture

- **UI/UX**: Next.js 14, Framer Motion (Glassmorphism), Lucide Icons.
- **State Engine**: Custom Bayesian update logic in `lib/simulation.ts`.
- **Compliance**: Regex-based rule engine with vertical-specific overrides in `lib/compliance.ts`.
- **Design**: Premium dark mode, high-contrast typography (Inter/Outfit).

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the strategic dashboard.

## 📊 Key Components

- **SimulationDashboard**: Run Monte Carlo analyses on specific deals.
- **ComplianceEngine**: Verify follow-up drafts against industry regulations.
- **Strategic Metrics**: Real-time tracking of Sales Velocity and Win Probability.
