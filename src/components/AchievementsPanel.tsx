import React from "react";
import { Trophy, Award, Variable, GitBranch, GitMerge, RotateCw, Database, Cpu, Check, Lock, Zap, Sparkles } from "lucide-react";
import { ACHIEVEMENTS_DATA } from "../data/gameData";
import { Achievement, UserStats } from "../types";
import { motion } from "motion/react";

interface AchievementsPanelProps {
  userStats: UserStats;
}

// Custom Icon Map to render Lucide icons by name securely
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Variable: Variable,
  GitBranch: GitBranch,
  GitMerge: GitMerge,
  RotateCw: RotateCw,
  Database: Database,
  Cpu: Cpu,
  Award: Award,
  Trophy: Trophy
};

export default function AchievementsPanel({ userStats }: AchievementsPanelProps) {
  const isUnlocked = (ach: Achievement) => {
    // Check various criteria
    if (userStats.unlockedAchievements.includes(ach.id)) return true;
    
    if (ach.xpRequirement && userStats.xp >= ach.xpRequirement) return true;
    
    if (ach.levelCountRequirement && userStats.completedLevels.length >= ach.levelCountRequirement) return true;
    
    if (ach.projectCountRequirement && userStats.completedProjects.length >= ach.projectCountRequirement) return true;
    
    return false;
  };

  const unlockedCount = ACHIEVEMENTS_DATA.filter(isUnlocked).length;

  return (
    <div id="achievements-panel" className="max-w-6xl mx-auto space-y-8 p-1">
      {/* Overview Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-950/80 via-violet-950/80 to-slate-900 border border-violet-800/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl -z-10" />

        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" /> Lemari Pencapaian Mahasiswa IT
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Piala & Lencana Prestasi</h2>
          <p className="text-slate-300 max-w-xl text-sm sm:text-base leading-relaxed">
            Setiap tantangan level yang diselesaikan dan project simulasi yang berhasil berjalan akan membuka medali kustom. Kumpulkan semua untuk menjadi Master Alpro!
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/60 p-5 rounded-xl text-center min-w-[200px] shadow-lg flex flex-col items-center justify-center">
          <Trophy className="w-12 h-12 text-yellow-400 mb-2 filter drop-shadow-[0_0_10px_rgba(250,204,21,0.3)] animate-pulse" />
          <div className="text-3xl font-black text-white">{unlockedCount} / {ACHIEVEMENTS_DATA.length}</div>
          <div className="text-xs text-slate-400 font-medium mt-1">Lencana Terbuka</div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-sky-400 to-violet-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${(unlockedCount / ACHIEVEMENTS_DATA.length) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Grid Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ACHIEVEMENTS_DATA.map((ach, idx) => {
          const unlocked = isUnlocked(ach);
          const IconComponent = ICON_MAP[ach.iconName] || Award;
          
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className={`relative overflow-hidden rounded-xl border p-5 flex flex-col items-center text-center transition-all ${
                unlocked 
                  ? "bg-gradient-to-b from-slate-900 to-slate-950 border-violet-800/40 shadow-[0_10px_30px_rgba(139,92,246,0.1)]" 
                  : "bg-slate-900/40 border-slate-800/80 grayscale opacity-65"
              }`}
            >
              {/* Unlock Indicator Badge */}
              <div className="absolute top-3 right-3">
                {unlocked ? (
                  <div className="p-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="p-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-500">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Glowing Background Radial */}
              {unlocked && (
                <div className="absolute -top-12 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl -z-10" />
              )}

              {/* Badge Icon circle */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border transition-all ${
                unlocked
                  ? "bg-gradient-to-tr from-sky-500/10 to-violet-500/10 border-violet-500 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                  : "bg-slate-950 border-slate-800 text-slate-600"
              }`}>
                <IconComponent className={`w-8 h-8 ${unlocked ? "animate-wiggle" : ""}`} />
              </div>

              {/* Text details */}
              <h3 className={`font-bold text-base ${unlocked ? "text-slate-100" : "text-slate-500"}`}>{ach.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed flex-1">{ach.description}</p>

              {/* Progress/Condition indicator footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/50 w-full text-[10px] font-mono text-slate-500">
                {ach.levelCountRequirement && `Syarat: Selesaikan ${ach.levelCountRequirement} level`}
                {ach.projectCountRequirement && `Syarat: Selesaikan ${ach.projectCountRequirement} project`}
                {ach.xpRequirement && `Syarat: Kumpulkan ${ach.xpRequirement} XP`}
                {!ach.levelCountRequirement && !ach.projectCountRequirement && !ach.xpRequirement && "Lencana Spesial"}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mini Tips Card */}
      <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-800/30 flex items-start gap-3">
        <Zap className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-sky-300">Tips Mahasiswa Pintar:</span> Lencana membantu mempercantik profil digitalmu. Selesaikan seluruh level dari <span className="text-violet-300 font-bold">Variabel</span> hingga <span className="text-violet-300 font-bold">Functions</span> untuk mengklaim gelar kehormatan <span className="text-amber-300 font-bold">LogicLab Master Architect</span>!
        </div>
      </div>
    </div>
  );
}
