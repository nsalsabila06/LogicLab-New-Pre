import React from "react";
import { Trophy, CheckCircle2, Lock, ArrowRight, BookOpen, Star, HelpCircle, Variable, GitBranch, GitMerge, RotateCw, Database, Cpu, Milestone, Flame, Sparkles } from "lucide-react";
import { LEVELS_DATA } from "../data/gameData";
import { LevelConcept, UserStats } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface DashboardProps {
  userStats: UserStats;
  onSelectLevel: (levelId: string) => void;
  onOpenTheory: () => void;
}

// Map level icons securely
const LEVEL_ICONS: Record<string, React.ComponentType<any>> = {
  Box: Variable,
  GitBranch: GitBranch,
  GitMerge: GitMerge,
  RotateCw: RotateCw,
  Database: Database,
  Cpu: Cpu
};

export default function Dashboard({ userStats, onSelectLevel, onOpenTheory }: DashboardProps) {
  // Simple state for trivia game
  const [triviaAnswer, setTriviaAnswer] = useState<number | null>(null);
  const [triviaResult, setTriviaResult] = useState<string | null>(null);

  const totalLevels = LEVELS_DATA.length;
  const completedCount = userStats.completedLevels.length;
  const progressPercent = Math.round((completedCount / totalLevels) * 100);

  // Helper to check if a level is unlocked
  const isLevelUnlocked = (level: LevelConcept, idx: number) => {
    if (idx === 0) return true; // Level 1 always unlocked
    // Unlocked if previous level is completed
    const prevLevel = LEVELS_DATA[idx - 1];
    return userStats.completedLevels.includes(prevLevel.id);
  };

  const handleTriviaClick = (optionIdx: number) => {
    setTriviaAnswer(optionIdx);
    if (optionIdx === 2) {
      setTriviaResult("Betul! 🎉 Indeks 0 merujuk pada jarak offset (geseran posisi) dari alamat memori dasar array.");
    } else {
      setTriviaResult("Hampir tepat! 😅 Cobalah ingat kembali konsep offset memori di kelas Alpro.");
    }
  };

  return (
    <div id="dashboard-container" className="max-w-6xl mx-auto space-y-8 p-1">
      
      {/* 1. Welcome & Stats Panel (Bento Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-violet-600 p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between"
        >
          {/* Drifting Clouds / Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-sky-300/20 rounded-full blur-xl pointer-events-none" />

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
              <Star className="w-3 h-3 fill-current" /> MAHASISWA INFORMATIKA SEMESTER 1
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-sans leading-tight">
              Selamat Datang di LogicLab! 👋
            </h2>
            <p className="text-sky-100 max-w-md text-sm leading-relaxed">
              Taklukan tantangan algoritma interaktif, raih XP koding, dan mulailah membangun program pertamamu dari nol secara visual dan asyik!
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => {
                // Find first unfinished level or level 1
                const nextLevel = LEVELS_DATA.find(l => !userStats.completedLevels.includes(l.id)) || LEVELS_DATA[0];
                onSelectLevel(nextLevel.id);
              }}
              className="px-5 py-2.5 rounded-xl bg-white text-violet-700 font-bold text-sm shadow-md hover:bg-sky-50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Mulai Belajar Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenTheory}
              className="px-5 py-2.5 rounded-xl bg-violet-700/30 text-white border border-violet-400/30 font-bold text-sm hover:bg-violet-700/50 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Buka Kamus</span>
            </button>
          </div>
        </motion.div>

        {/* Level & XP Stats box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-lg"
        >
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono">Progress Belajar</h3>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-5xl font-black text-white">{progressPercent}%</span>
              <span className="text-sm text-slate-400">Kurikulum Selesai</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-3 rounded-full mt-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-sky-400 to-violet-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800/80">
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-slate-500">LEVEL COMPLETED</div>
              <div className="text-lg font-black text-slate-200">{completedCount} / {totalLevels}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-slate-500">TOTAL SCORE</div>
              <div className="text-lg font-black text-sky-400 font-mono">{userStats.xp} XP</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. Interactive Island Pathway Map & Right Side-panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left: Road of Level Islands */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Milestone className="w-5 h-5 text-sky-400" />
              <h3 className="text-lg font-extrabold text-slate-100">Peta Petualangan Algoritma</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Klik pulau untuk mendarat & koding</span>
          </div>

          {/* Islands container */}
          <div className="relative rounded-2xl bg-slate-950/40 border border-slate-900 p-8 flex flex-col items-center overflow-hidden min-h-[600px]">
            {/* Background Sky Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute top-10 left-10 w-44 h-44 bg-sky-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-44 h-44 bg-violet-600/5 rounded-full blur-3xl" />

            {/* Dotted Connection SVG line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-0" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M 280,100 Q 150,220 280,340 T 280,580 Q 400,700 280,820" 
                fill="none" 
                stroke="#6366f1" 
                strokeWidth="4" 
                strokeDasharray="8,8" 
                className="opacity-25 animate-[dash_15s_linear_infinite]"
              />
            </svg>

            {/* Render islands vertically with custom alignment */}
            <div className="space-y-12 w-full relative z-10 flex flex-col items-center">
              {LEVELS_DATA.map((level, idx) => {
                const unlocked = isLevelUnlocked(level, idx);
                const completed = userStats.completedLevels.includes(level.id);
                const IconComponent = LEVEL_ICONS[level.iconName] || Cpu;
                
                // Zig Zag margins based on index
                const alignClasses = idx % 2 === 0 ? "md:mr-32" : "md:ml-32";

                return (
                  <motion.div
                    key={level.id}
                    className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl max-w-sm sm:max-w-md w-full transition-all border ${alignClasses} ${
                      completed 
                        ? "bg-slate-900/90 border-emerald-500/30 hover:border-emerald-500/60" 
                        : unlocked 
                          ? "bg-slate-900/90 border-violet-800/40 hover:border-sky-400 shadow-[0_4px_20px_rgba(139,92,246,0.15)] animate-pulse-slow" 
                          : "bg-slate-950/60 border-slate-900 pointer-events-none opacity-50"
                    }`}
                  >
                    {/* Island circle badge */}
                    <div className="relative shrink-0">
                      {unlocked && !completed && (
                        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 blur opacity-40 animate-pulse" />
                      )}
                      
                      <button
                        onClick={() => unlocked && onSelectLevel(level.id)}
                        disabled={!unlocked}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer relative z-10 ${
                          completed 
                            ? "bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400" 
                            : unlocked 
                              ? "bg-gradient-to-tr from-sky-400 to-violet-600 border-2 border-transparent text-white shadow-lg" 
                              : "bg-slate-900 border border-slate-800 text-slate-500"
                        }`}
                      >
                        {completed ? (
                          <CheckCircle2 className="w-7 h-7 filter drop-shadow-[0_0_4px_rgba(16,185,129,0.3)]" />
                        ) : !unlocked ? (
                          <Lock className="w-5 h-5 text-slate-500" />
                        ) : (
                          <IconComponent className="w-6 h-6" />
                        )}
                      </button>
                    </div>

                    {/* Level descriptions */}
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-1">
                        <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">Level {idx + 1}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold w-fit mx-auto sm:mx-0 ${
                          level.difficulty === "Pemula" ? "bg-sky-500/10 text-sky-300" :
                          level.difficulty === "Menengah" ? "bg-violet-500/10 text-violet-300" : "bg-amber-500/10 text-amber-300"
                        }`}>{level.difficulty}</span>
                      </div>
                      <h4 className={`font-bold text-base mt-0.5 ${unlocked ? "text-slate-100" : "text-slate-500"}`}>
                        {level.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {level.subtitle} • {level.description}
                      </p>
                    </div>

                    {/* Play action button */}
                    {unlocked && (
                      <button
                        onClick={() => onSelectLevel(level.id)}
                        className={`shrink-0 p-2 rounded-lg transition-colors cursor-pointer ${
                          completed 
                            ? "hover:bg-slate-800 text-emerald-400" 
                            : "bg-violet-600/20 hover:bg-violet-600 text-sky-300 hover:text-white"
                        }`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Pane: Daily Challenge, Trivia and Tips */}
        <div className="space-y-6">
          
          {/* Daily Trivia Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-lg space-y-4"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
              <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-200 text-sm">Trivia Alpro Hari Ini</h4>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                Mengapa indeks Array di sebagian besar bahasa pemrograman dimulai dari angka 0, bukan 1?
              </p>

              <div className="space-y-2 text-xs">
                {[
                  "Karena pencipta bahasa pemrograman salah ketik.",
                  "Agar mahasiswa semester awal merasa bingung saat ujian.",
                  "Karena indeks menunjukkan jarak geseran (offset) dari lokasi memori awal.",
                  "Karena angka 0 adalah angka favorit Bill Gates."
                ].map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleTriviaClick(oIdx)}
                    disabled={triviaAnswer !== null}
                    className={`w-full p-2.5 rounded-lg border text-left transition-all ${
                      triviaAnswer === oIdx
                        ? oIdx === 2
                          ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-300"
                          : "bg-rose-500/10 border-rose-500/50 text-rose-300"
                        : triviaAnswer !== null && oIdx === 2
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                          : "bg-slate-950 border-slate-800/80 text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    <span className="font-bold font-mono mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {triviaResult && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] p-3 rounded bg-slate-950 text-slate-300 border border-slate-800 leading-relaxed"
                >
                  {triviaResult}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Quick Study Tips */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-lg space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
              <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-200 text-sm">Tips Lulus Kelas Alpro A+</h4>
            </div>

            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex gap-2 leading-relaxed">
                <span className="text-sky-400 font-bold shrink-0">1.</span>
                <span>Jangan sekedar dihafal! Gambarlah coret-coretan flowchart di kertas untuk merelasikan kode dan alurnya.</span>
              </li>
              <li className="flex gap-2 leading-relaxed">
                <span className="text-sky-400 font-bold shrink-0">2.</span>
                <span>Gunakan tab <span className="text-violet-300 font-bold">Simulasi Project</span> untuk melatih logika kodingmu pada studi kasus aplikasi dunia nyata seperti kasir dan sensor otonom.</span>
              </li>
              <li className="flex gap-2 leading-relaxed">
                <span className="text-sky-400 font-bold shrink-0">3.</span>
                <span>Jika menemui error di koding atau kuis, klik tombol <span className="text-sky-300 font-bold">Kamus</span> di header untuk mencontek contoh sintaksis yang benar.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
