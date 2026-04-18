'use client';

import { motion } from 'motion/react';
import { AlertTriangle, TrendingUp, Zap, Clock, ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';

interface ProjectionInsightsProps {
  churnRate: number;
  growthRate: number;
  months: number;
}

export function ProjectionInsights({ churnRate, growthRate, months }: ProjectionInsightsProps) {
  const insights = useMemo(() => {
    const tips = [];
    
    // Churn Logic
    if (churnRate > 5) {
      tips.push({ 
        title: "High Risk: Churn Bleed", 
        icon: <AlertTriangle size={18} className="text-red-400" />,
        desc: `A ${churnRate}% monthly churn implies you are turning over a massive portion of your audience each year. Compounding breaks under this stress. Prioritize retention immediately.`
      });
    } else if (churnRate >= 2) {
      tips.push({ 
        title: "The Silent Killer", 
        icon: <Clock size={18} className="text-[var(--accent-color)]" />,
        desc: `At a ${churnRate}% monthly churn rate, growth works doubly hard to replace lost revenue. Dropping churn by just 1% exponentially impacts your ${months}-month outlook.`
      });
    } else if (churnRate < 2) {
      tips.push({ 
        title: "Exceptional Retention", 
        icon: <ShieldCheck size={18} className="text-green-400" />,
        desc: "Your churn rate is elite. With a sealed bucket, focus heavily on top-of-funnel acquisition to maximize your long-term compound ceiling."
      });
    }

    // Growth Logic
    if (growthRate > 10) {
      tips.push({ 
        title: "Scaling Velocity", 
        icon: <Zap size={18} className="text-[var(--accent-color)]" />,
        desc: `You are projecting hyper-growth at ${growthRate}% monthly. Ensure your operational infrastructure, support team, and product scalability can handle this rapid compounding.` 
      });
    } else if (growthRate > 0) {
      tips.push({ 
        title: "Momentum Building", 
        icon: <TrendingUp size={18} className="text-[var(--accent-color)]" />,
        desc: `Steady ${growthRate}% growth is phenomenal. Increasing monthly growth slightly via referral mechanics or upselling unlocks significantly higher compounding velocity later on.` 
      });
    }

    return tips.slice(0, 2); // Show top 2 insights
  }, [churnRate, growthRate, months]);

  return (
    <motion.div layout className="w-full">
      <h3 className="text-[13px] font-bold tracking-[2.5px] uppercase text-[var(--accent-color)] mb-6 flex items-center gap-2">
        <Zap size={15} /> Strategy Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex flex-col bg-[var(--card-bg)] backdrop-blur-[28px] border border-white/10 border-t-white/20 rounded-[16px] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-[var(--border-color)] transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/3 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent-color)] opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <h4 className="text-[14px] font-bold tracking-[1.5px] uppercase text-white mb-2 flex items-center gap-3 z-10 relative">
              <span className="p-2 bg-black/40 rounded-lg border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                {insight.icon}
              </span>
              {insight.title}
            </h4>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[var(--accent-color)] to-transparent my-5 opacity-40 z-10 relative" />
            <p className="flex-grow text-[13.5px] text-[var(--text-secondary)] leading-[1.8] z-10 relative">
              {insight.desc}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
