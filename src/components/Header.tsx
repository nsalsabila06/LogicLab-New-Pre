import { Cpu, Flame, Zap, Award, BookOpen, Menu, X, Terminal } from "lucide-react";
import { UserStats } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface HeaderProps {
  activeTab: "dashboard" | "projects" | "achievements";
  setActiveTab: (tab: "dashboard" | "projects" | "achievements") => void;
  userStats: UserStats;
  onOpenTheory: () => void;
}

export default function Header({ activeTab, setActiveTab, userStats, onOpenTheory }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate current level based on XP (e.g., 100 XP per level)
  const currentLevel = Math.floor(userStats.xp / 100) + 1;
  const xpInCurrentLevel = userStats.xp % 100;

  const navItems = [
    { id: "dashboard", label: "Peta Belajar", icon: Cpu },
    { id: "projects", label: "Simulasi Project", icon: Terminal },
    { id: "achievements", label: "Piala Prestasi", icon: Award }
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              onClick={() => setActiveTab("dashboard")}
              className="cursor-pointer w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-violet-600 flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(56,189,248,0.4)]"
            >
              L²
            </motion.div>
            <div className="cursor-pointer" onClick={() => setActiveTab("dashboard")}>
              <h1 className="text-lg font-black bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent font-sans tracking-tight">
                LogicLab
              </h1>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">IT Academy</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? "text-sky-300" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-sky-400 to-violet-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Area (XP, Streaks, Dictionary) */}
          <div className="hidden md:flex items-center gap-5">
            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{userStats.streakDays} HARI STREAK</span>
            </div>

            {/* XP and Level Bar */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-slate-500 font-mono">LEVEL {currentLevel}</div>
                <div className="text-xs text-sky-400 font-bold font-mono">{userStats.xp} XP</div>
              </div>
              <div className="w-24 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-sky-400 to-violet-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${xpInCurrentLevel}%` }}
                />
              </div>
            </div>

            {/* Dictionary / Guide Sheet */}
            <button
              onClick={onOpenTheory}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors shadow-sm cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Kamus</span>
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{userStats.streakDays}D</span>
            </div>
            
            <button
              onClick={onOpenTheory}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
              title="Kamus Koding"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-900 bg-slate-950 px-4 py-4 space-y-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold w-full transition-all ${
                      isActive 
                        ? "bg-gradient-to-r from-sky-500/10 to-violet-500/10 text-sky-300 border-l-2 border-sky-400" 
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Level stats inside mobile drawer */}
            <div className="pt-4 border-t border-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-sky-400" />
                <div>
                  <div className="text-xs text-white font-bold">Level {currentLevel} Mahasiswa</div>
                  <div className="text-[10px] text-slate-400">{userStats.xp} Total XP koding</div>
                </div>
              </div>
              <div className="w-24 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-sky-400 to-violet-500 h-full rounded-full"
                  style={{ width: `${xpInCurrentLevel}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
