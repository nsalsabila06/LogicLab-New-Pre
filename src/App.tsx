import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import LevelViewer from "./components/LevelViewer";
import ProjectSandbox from "./components/ProjectSandbox";
import AchievementsPanel from "./components/AchievementsPanel";
import TheoryModal from "./components/TheoryModal";
import { LEVELS_DATA } from "./data/gameData";
import { UserStats } from "./types";
import { Sparkles, Trophy, Award, BookOpen } from "lucide-react";

const LOCAL_STORAGE_KEY = "logiclab_user_stats";

const DEFAULT_STATS: UserStats = {
  xp: 0,
  streakDays: 7,
  lastActive: new Date().toISOString(),
  completedLevels: [],
  completedProjects: [],
  unlockedAchievements: []
};

export default function App() {
  const [userStats, setUserStats] = useState<UserStats>(DEFAULT_STATS);
  const [activeScreen, setActiveScreen] = useState<"dashboard" | "level-viewer" | "projects" | "achievements">("dashboard");
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [isTheoryOpen, setIsTheoryOpen] = useState(false);

  // Load stats from local storage on startup
  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUserStats(parsed);
      } catch (e) {
        console.error("Failed to parse user stats, using defaults.", e);
      }
    }
  }, []);

  // Sync stats back to local storage
  const saveStats = (newStats: UserStats) => {
    setUserStats(newStats);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStats));
  };

  const handleSelectLevel = (levelId: string) => {
    setSelectedLevelId(levelId);
    setActiveScreen("level-viewer");
  };

  const handleLevelComplete = (levelId: string, xpGained: number) => {
    const nextCompletedLevels = [...userStats.completedLevels];
    if (!nextCompletedLevels.includes(levelId)) {
      nextCompletedLevels.push(levelId);
    }

    // Determine achievements unlock
    const nextUnlockedAchievements = [...userStats.unlockedAchievements];
    
    // Achievement: Level 1 completed
    if (levelId === "level-1" && !nextUnlockedAchievements.includes("var_vanguard")) {
      nextUnlockedAchievements.push("var_vanguard");
    }
    // Achievement: Level 2 completed
    if (levelId === "level-2" && !nextUnlockedAchievements.includes("branch_boss")) {
      nextUnlockedAchievements.push("branch_boss");
    }
    // Achievement: Level 3 completed
    if (levelId === "level-3" && !nextUnlockedAchievements.includes("flow_master")) {
      nextUnlockedAchievements.push("flow_master");
    }
    // Achievement: Level 4 completed
    if (levelId === "level-4" && !nextUnlockedAchievements.includes("loop_legend")) {
      nextUnlockedAchievements.push("loop_legend");
    }
    // Achievement: Level 5 completed
    if (levelId === "level-5" && !nextUnlockedAchievements.includes("array_ace")) {
      nextUnlockedAchievements.push("array_ace");
    }
    // Achievement: Level 6 completed
    if (levelId === "level-6" && !nextUnlockedAchievements.includes("func_force")) {
      nextUnlockedAchievements.push("func_force");
    }

    const nextXp = userStats.xp + xpGained;

    // Master Achievement
    if (nextCompletedLevels.length === 6 && userStats.completedProjects.length === 3 && nextXp >= 1000 && !nextUnlockedAchievements.includes("sandbox_king")) {
      nextUnlockedAchievements.push("sandbox_king");
    }

    const updatedStats: UserStats = {
      ...userStats,
      xp: nextXp,
      completedLevels: nextCompletedLevels,
      unlockedAchievements: nextUnlockedAchievements,
      lastActive: new Date().toISOString()
    };

    saveStats(updatedStats);
    setActiveScreen("dashboard");
    setSelectedLevelId(null);
  };

  const handleProjectComplete = (projectId: string, xpGained: number) => {
    const nextCompletedProjects = [...userStats.completedProjects];
    if (!nextCompletedProjects.includes(projectId)) {
      nextCompletedProjects.push(projectId);
    }

    const nextUnlockedAchievements = [...userStats.unlockedAchievements];
    if (nextCompletedProjects.length >= 1 && !nextUnlockedAchievements.includes("project_pioneer")) {
      nextUnlockedAchievements.push("project_pioneer");
    }

    const nextXp = userStats.xp + xpGained;

    // Master Achievement
    if (userStats.completedLevels.length === 6 && nextCompletedProjects.length === 3 && nextXp >= 1000 && !nextUnlockedAchievements.includes("sandbox_king")) {
      nextUnlockedAchievements.push("sandbox_king");
    }

    const updatedStats: UserStats = {
      ...userStats,
      xp: nextXp,
      completedProjects: nextCompletedProjects,
      unlockedAchievements: nextUnlockedAchievements,
      lastActive: new Date().toISOString()
    };

    saveStats(updatedStats);
    setActiveScreen("projects"); // remains in sandbox
  };

  const handleResetProgress = () => {
    if (confirm("Apakah kamu yakin ingin mereset semua progress belajarmu di LogicLab?")) {
      saveStats(DEFAULT_STATS);
      setActiveScreen("dashboard");
      setSelectedLevelId(null);
    }
  };

  // Find currently active level data
  const currentLevelData = LEVELS_DATA.find((l) => l.id === selectedLevelId);

  return (
    <div id="logiclab-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* Background ambience orbs (Sky blue and Violet) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Header element */}
      <Header
        activeTab={activeScreen === "level-viewer" ? "dashboard" : activeScreen}
        setActiveTab={(tab) => {
          setActiveScreen(tab);
          setSelectedLevelId(null);
        }}
        userStats={userStats}
        onOpenTheory={() => setIsTheoryOpen(true)}
      />

      {/* Main Container screen slots */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* Dashboard slot */}
          {activeScreen === "dashboard" && (
            <motion.div
              key="dashboard-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <Dashboard
                userStats={userStats}
                onSelectLevel={handleSelectLevel}
                onOpenTheory={() => setIsTheoryOpen(true)}
              />
            </motion.div>
          )}

          {/* Level viewer practice slot */}
          {activeScreen === "level-viewer" && currentLevelData && (
            <motion.div
              key="level-viewer-screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <LevelViewer
                level={currentLevelData}
                onBackToDashboard={() => {
                  setActiveScreen("dashboard");
                  setSelectedLevelId(null);
                }}
                onLevelComplete={handleLevelComplete}
              />
            </motion.div>
          )}

          {/* Project simulation sandbox slot */}
          {activeScreen === "projects" && (
            <motion.div
              key="projects-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectSandbox
                completedProjects={userStats.completedProjects}
                onProjectComplete={handleProjectComplete}
              />
            </motion.div>
          )}

          {/* Trophy Cabinet slot */}
          {activeScreen === "achievements" && (
            <motion.div
              key="achievements-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <AchievementsPanel userStats={userStats} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer information section */}
      <footer className="relative z-10 border-t border-slate-900 py-8 text-center text-xs text-slate-500 bg-slate-950/60 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300">LogicLab IT Academy</span>
            <span className="text-slate-600">|</span>
            <span>Dibuat khusus untuk Mahasiswa Informatika Semester Awal</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleResetProgress}
              className="hover:text-rose-400 font-mono text-[10px] uppercase cursor-pointer tracking-wider"
              title="Mengulang semua progress"
            >
              Reset Data Belajar
            </button>
            <span className="text-slate-700">•</span>
            <span>Aplikasi Interaktif 2026</span>
          </div>
        </div>
      </footer>

      {/* Theory Cheat Sheet Modal element */}
      <TheoryModal isOpen={isTheoryOpen} onClose={() => setIsTheoryOpen(false)} />

    </div>
  );
}
