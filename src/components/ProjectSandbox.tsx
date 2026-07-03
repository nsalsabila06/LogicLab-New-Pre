import { Terminal, Play, RefreshCw, Layers, Sparkles, CheckCircle2, AlertTriangle, Key, ShieldAlert, ShieldCheck, Car, HelpCircle, ArrowRight } from "lucide-react";
import { SIMULATION_PROJECTS } from "../data/gameData";
import { CodeBlock, SimulationProject } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface ProjectSandboxProps {
  completedProjects: string[];
  onProjectComplete: (projectId: string, xpGained: number) => void;
}

export default function ProjectSandbox({ completedProjects, onProjectComplete }: ProjectSandboxProps) {
  const [selectedProjIdx, setSelectedProjIdx] = useState(0);
  const activeProject = SIMULATION_PROJECTS[selectedProjIdx];

  // IDE assembly workspace state
  const [workspaceBlocks, setWorkspaceBlocks] = useState<CodeBlock[]>([]);
  
  // Execution logs
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionPassed, setExecutionPassed] = useState(false);
  const [executionFeedback, setExecutionFeedback] = useState<string | null>(null);

  // Live simulation states (matches project visual states)
  const [simState, setSimState] = useState<any>(activeProject.simulationVisual.initialState);

  // Reset workspace and simulation whenever the project changes
  useEffect(() => {
    setWorkspaceBlocks([]);
    setConsoleLogs([]);
    setExecutionPassed(false);
    setExecutionFeedback(null);
    setIsExecuting(false);
    setSimState(activeProject.simulationVisual.initialState);
  }, [selectedProjIdx]);

  // Click handler to select blocks
  const handleBlockClick = (block: CodeBlock) => {
    if (isExecuting) return;
    setWorkspaceBlocks(prev => [...prev, block]);
  };

  const handleRemoveBlock = (index: number) => {
    if (isExecuting) return;
    setWorkspaceBlocks(prev => prev.filter((_, i) => i !== index));
  };

  const moveBlockUp = (index: number) => {
    if (index === 0 || isExecuting) return;
    const updated = [...workspaceBlocks];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setWorkspaceBlocks(updated);
  };

  const moveBlockDown = (index: number) => {
    if (index === workspaceBlocks.length - 1 || isExecuting) return;
    const updated = [...workspaceBlocks];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setWorkspaceBlocks(updated);
  };

  // Run the assembled blocks code validation
  const handleRunProject = () => {
    if (workspaceBlocks.length === 0) {
      setExecutionFeedback("Workspace masih kosong! Masukan minimal satu blok kode logika terlebih dahulu.");
      return;
    }

    setIsExecuting(true);
    setConsoleLogs(["Initializing virtual runtime environment..."]);
    setExecutionFeedback(null);
    setExecutionPassed(false);
    
    // Check order of blocks
    const userBlockIds = workspaceBlocks.map(b => b.id).join(",");
    const correctBlockIds = activeProject.availableBlocks.map(b => b.id).join(",");

    let logsToPrint: string[] = ["&gt; Compiling blocks... OK."];
    let isCorrect = userBlockIds === correctBlockIds;

    // Simulate running test cases
    setTimeout(() => {
      logsToPrint = [...logsToPrint, `&gt; Running test cases (${activeProject.testCases.length} cases)...`];
      setConsoleLogs([...logsToPrint]);

      activeProject.testCases.forEach((tc, tcIdx) => {
        setTimeout(() => {
          logsToPrint = [...logsToPrint, `\n[TEST CASE ${tcIdx + 1}]: ${tc.description}`];
          
          if (isCorrect) {
            tc.expectedOutput.forEach((outLine) => {
              logsToPrint = [...logsToPrint, `  PRINT: ${outLine}`];
            });
            logsToPrint = [...logsToPrint, `  STATUS: PASS`];
          } else {
            // Print partial outputs or failure
            logsToPrint = [...logsToPrint, `  PRINT: ${tc.expectedOutput[0] || "total = 0"}`];
            logsToPrint = [...logsToPrint, `  ERROR: Logical outputs do not match expectation!`];
            logsToPrint = [...logsToPrint, `  STATUS: FAIL`];
          }
          setConsoleLogs([...logsToPrint]);
          
          // Last testcase trigger
          if (tcIdx === activeProject.testCases.length - 1) {
            setTimeout(() => {
              setIsExecuting(false);
              if (isCorrect) {
                setExecutionPassed(true);
                // Trigger visual simulation change based on passed state
                const resultingOutputs = activeProject.testCases[0].expectedOutput;
                const nextVisualState = activeProject.simulationVisual.runStateChange(null, resultingOutputs);
                setSimState(nextVisualState);
              } else {
                setExecutionPassed(false);
                setExecutionFeedback("Struktur urutan logikamu masih salah! Pastikan kamu memahami urutan inisialisasi variabel, if-else percabangan, dan kurung kurawal penutup.");
                const nextVisualState = activeProject.simulationVisual.runStateChange(null, ["error"]);
                setSimState(nextVisualState);
              }
            }, 1000);
          }
        }, (tcIdx + 1) * 1200);
      });

    }, 1000);
  };

  const handleClaimReward = () => {
    onProjectComplete(activeProject.id, activeProject.xpReward);
  };

  return (
    <div id="project-sandbox-panel" className="max-w-6xl mx-auto space-y-6 p-1">
      
      {/* Overview header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-900">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Simulasi Project LogicLab</h2>
          <p className="text-xs text-slate-400">Rakit potongan kode logika untuk memecahkan studi kasus aplikasi nyata!</p>
        </div>

        {/* Horizontal Project Selector */}
        <div className="flex gap-2 text-xs">
          {SIMULATION_PROJECTS.map((proj, pIdx) => {
            const isSelected = selectedProjIdx === pIdx;
            const isCompleted = completedProjects.includes(proj.id);
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProjIdx(pIdx)}
                className={`px-3 py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                  isSelected 
                    ? "bg-sky-500/10 border-sky-400 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.15)]" 
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {isCompleted && "✅ "}{proj.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: REQUIREMENTS & WORKSPACE BUILDER (7 Columns) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          
          {/* Project Details */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                activeProject.difficulty === "Muda" ? "bg-sky-500/10 text-sky-300" :
                activeProject.difficulty === "Sedang" ? "bg-violet-500/10 text-violet-300" : "bg-amber-500/10 text-amber-300"
              }`}>Tingkat {activeProject.difficulty}</span>
              <span className="text-xs text-sky-400 font-bold font-mono">+{activeProject.xpReward} XP REWARD</span>
            </div>
            
            <h3 className="text-base font-extrabold text-white">{activeProject.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{activeProject.description}</p>
            
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 text-[11px] text-slate-300 leading-relaxed">
              <span className="font-bold text-sky-400">Target Algoritma: </span> {activeProject.objective}
            </div>
          </div>

          {/* Assembly Workspace Workspace */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-900 flex-1 flex flex-col justify-between min-h-[350px]">
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> Workspace Kompiler Blok ({workspaceBlocks.length})
                </span>
                <button 
                  onClick={() => setWorkspaceBlocks([])}
                  className="text-slate-500 hover:text-slate-300 transition-colors text-[10px] font-bold flex items-center gap-0.5"
                >
                  <RefreshCw className="w-3 h-3" /> Bersihkan
                </button>
              </div>

              {/* Assembled Blocks List */}
              <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
                {workspaceBlocks.length === 0 ? (
                  <div className="text-center py-16">
                    <Terminal className="w-8 h-8 text-slate-800 mx-auto mb-2" />
                    <p className="text-xs text-slate-600 font-mono">Assembling Workspace Kosong. Klik laci potongan blok kode di bawah untuk memindahkannya ke sini!</p>
                  </div>
                ) : (
                  workspaceBlocks.map((block, idx) => (
                    <motion.div
                      key={idx}
                      layout
                      className="p-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs font-mono shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-slate-600 text-[10px] select-none w-3 text-right">{idx + 1}</span>
                        {/* Interactive spacing margin based on indent level of the block */}
                        <span 
                          style={{ marginLeft: `${block.indent * 16}px` }} 
                          className={`font-semibold ${
                            block.category === "variable" ? "text-amber-400" :
                            block.category === "control" ? "text-sky-400" :
                            block.category === "loop" ? "text-violet-400" : "text-emerald-400"
                          }`}
                        >
                          {block.code}
                        </span>
                      </div>

                      {/* Re-ordering arrows */}
                      <div className="flex items-center gap-1 shrink-0 ml-4">
                        <button 
                          onClick={() => moveBlockUp(idx)}
                          className="p-1 hover:bg-slate-800 text-slate-500 hover:text-white rounded transition-colors"
                        >
                          ▲
                        </button>
                        <button 
                          onClick={() => moveBlockDown(idx)}
                          className="p-1 hover:bg-slate-800 text-slate-500 hover:text-white rounded transition-colors"
                        >
                          ▼
                        </button>
                        <button 
                          onClick={() => handleRemoveBlock(idx)}
                          className="p-1 hover:bg-slate-800 text-rose-500 hover:bg-rose-500/10 rounded transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Run Button bar */}
            <div className="pt-4 border-t border-slate-900/60 mt-4 flex items-center gap-3">
              <button
                disabled={isExecuting || workspaceBlocks.length === 0}
                onClick={handleRunProject}
                className="flex-1 py-3 bg-gradient-to-r from-sky-400 to-violet-500 hover:brightness-110 disabled:bg-slate-800 disabled:text-slate-500 disabled:brightness-100 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isExecuting ? "SEDANG MENGEKSEKUSI..." : "JALANKAN KODE LOGIKA"}</span>
              </button>
            </div>
          </div>

          {/* Available block elements bin */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Loker Potongan Blok Kode Tersedia:</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono max-h-[160px] overflow-y-auto">
              {activeProject.availableBlocks.map((block) => {
                // Check if block is already selected (only one copy allowed for precision logic)
                const isSelected = workspaceBlocks.some(b => b.id === block.id);
                return (
                  <button
                    key={block.id}
                    disabled={isSelected || isExecuting}
                    onClick={() => handleBlockClick(block)}
                    className={`p-2.5 rounded-lg border text-left transition-all font-mono font-semibold cursor-pointer truncate ${
                      isSelected
                        ? "bg-slate-950 border-slate-900 text-slate-700 cursor-not-allowed scale-[0.98]"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-900/80 active:scale-98"
                    }`}
                  >
                    <span className="text-slate-500 mr-1 opacity-70">➔</span> {block.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE VISUAL SIMULATION & TERMINAL (5 Columns) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          {/* Visual Device Screen representation */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-900 flex-1 flex flex-col justify-between shadow-inner min-h-[350px]">
            <div className="text-center pb-3 border-b border-slate-900">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">LogicLab Virtual Screen</span>
              <h4 className="text-xs font-bold text-slate-300 mt-1">{activeProject.simulationVisual.title}</h4>
            </div>

            {/* SIMULATOR WINDOW PANEL */}
            <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden bg-slate-900/30 border border-slate-900 rounded-xl my-4 min-h-[220px]">
              
              {/* --- 1. CASHIER VISUAL --- */}
              {activeProject.theme === "cashier" && (
                <div className="w-full flex flex-col items-center justify-center space-y-4">
                  {/* Floating checkout food tray */}
                  <motion.div 
                    animate={{ 
                      x: simState.trayPosition === "left" ? -80 : simState.trayPosition === "center" ? 0 : 80,
                      opacity: simState.trayPosition === "scanned" ? [1, 0] : 1
                    }}
                    transition={{ duration: 1 }}
                    className="text-4xl filter drop-shadow-md"
                  >
                    🍱🍗🥤
                  </motion.div>

                  {/* Cashier Screen display register box */}
                  <div className="w-48 bg-slate-950 rounded-xl border border-slate-800 p-3 text-center shadow-lg relative">
                    <div className="w-1.5 h-1.5 rounded-full absolute top-2 right-2 bg-emerald-400 animate-ping" />
                    <span className="text-[9px] font-mono text-slate-600 block">KASIR KANTIN v1.0</span>
                    <div className={`text-xs font-mono font-bold mt-2 truncate ${simState.statusColor}`}>
                      {simState.cashierText}
                    </div>
                  </div>

                  {/* Cartoon receipt scroll printout */}
                  {simState.receiptPrinted && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-32 bg-white text-slate-950 font-mono text-[8px] p-2.5 rounded shadow-lg border border-slate-300 flex flex-col space-y-1"
                    >
                      <div className="border-b border-dashed border-slate-400 pb-1 text-center font-bold">KANTIN MAHASISWA</div>
                      <div className="flex justify-between"><span>Soto Ayam</span><span>Rp 15k</span></div>
                      <div className="flex justify-between"><span>Ayam Geprek</span><span>Rp 15k</span></div>
                      <div className="flex justify-between font-bold border-t border-dashed border-slate-300 pt-1">
                        <span>TOTAL</span><span>Rp 54.000</span>
                      </div>
                      <div className="text-center font-black pt-1 border-t border-dashed border-slate-300 text-emerald-600">SUKSES!</div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* --- 2. SMART HOME LOCK DOOR --- */}
              {activeProject.theme === "smart_home" && (
                <div className="w-full flex flex-col items-center justify-center space-y-4">
                  {/* Smart heavy sliding Door representation */}
                  <div className="w-44 h-40 bg-slate-950 border-2 border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center shadow-lg">
                    {/* Sliding steel plates */}
                    <motion.div 
                      animate={simState.doorStatus === "unlocked" ? { x: -80 } : { x: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute left-0 w-1/2 h-full bg-slate-800 border-r border-slate-950 z-20"
                    />
                    <motion.div 
                      animate={simState.doorStatus === "unlocked" ? { x: 80 } : { x: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute right-0 w-1/2 h-full bg-slate-800 border-l border-slate-950 z-20"
                    />

                    {/* Camera scan lens on top */}
                    <div className="absolute top-2 w-16 h-4 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center z-30">
                      <motion.div 
                        animate={simState.cameraLaser === "alarm" ? { backgroundColor: "#f43f5e" } : simState.cameraLaser === "success" ? { backgroundColor: "#10b981" } : { backgroundColor: "#38bdf8" }}
                        className="w-1.5 h-1.5 rounded-full"
                      />
                    </div>

                    {/* Access messages behind door */}
                    <div className="text-center z-10 p-2 text-xs font-bold text-emerald-400 flex flex-col items-center gap-1 font-mono">
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                      <span>TERBUKA!</span>
                    </div>

                    {/* Laser scanning animations */}
                    {isExecuting && (
                      <motion.div 
                        animate={{ y: [0, 140, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-x-0 h-0.5 bg-sky-400 shadow-[0_0_8px_#38bdf8] z-30 pointer-events-none"
                      />
                    )}

                    {/* Alarm Overlay */}
                    {simState.doorStatus === "alarm" && (
                      <div className="absolute inset-0 bg-rose-950/40 border-2 border-rose-500 z-30 flex flex-col items-center justify-center text-center p-2 text-rose-500 font-mono font-bold animate-pulse">
                        <ShieldAlert className="w-8 h-8 text-rose-500 animate-bounce" />
                        <span className="text-[10px] mt-1 leading-none">ALARM KABUR</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Akses Status:</span>
                    <div className={`text-xs font-bold font-mono mt-0.5 ${simState.lockColor}`}>
                      {simState.message}
                    </div>
                  </div>
                </div>
              )}

              {/* --- 3. AUTONOMOUS CAR PARK SENSOR --- */}
              {activeProject.theme === "park_sensor" && (
                <div className="w-full flex flex-col items-center justify-center space-y-4">
                  
                  {/* Obstacle wall */}
                  <div className="absolute right-4 top-10 bottom-10 w-2.5 bg-slate-800 rounded shadow border border-slate-700" />

                  {/* Autonomous Car body box */}
                  <motion.div 
                    animate={
                      simState.carPosition === "start" ? { x: -100 } :
                      simState.carPosition === "stop_emergency" ? { x: 10 } : { x: 50 }
                    }
                    transition={{ duration: 1.5 }}
                    className="w-24 h-12 bg-sky-500 rounded-lg relative flex items-center justify-center shadow-lg border border-sky-400"
                  >
                    <div className="absolute -bottom-1 w-4 h-2 bg-slate-950 rounded" />
                    <div className="absolute -bottom-1 right-2 w-4 h-2 bg-slate-950 rounded" />
                    
                    {/* Brake tail lights */}
                    <div className={`absolute left-0 w-1 h-3 rounded-l ${simState.brakeLightOn ? "bg-rose-500 shadow-[0_0_8px_#f43f5e]" : "bg-rose-950"}`} />

                    <span className="text-[9px] font-mono font-black text-slate-950">RADAR AUTO</span>
                    
                    {/* Interactive ultrasonic wave lines emanating from nose */}
                    <div className="absolute -right-6 flex flex-col items-center justify-center space-y-1">
                      <div className={`w-4 h-4 border-r-2 rounded-full transform rotate-45 ${simState.sensorWaveColor}`} />
                    </div>
                  </motion.div>

                  <div className="text-center pt-8">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Indikator Jarak:</span>
                    <div className="text-xs font-bold font-mono text-sky-400 mt-0.5">
                      {simState.distanceIndicator}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Live Terminal outputs */}
            <div className="space-y-1.5">
              <div className="text-[10px] text-slate-500 font-mono uppercase pb-1 border-b border-slate-900 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" /> Virtual Terminal Console
              </div>

              <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-3 h-32 overflow-y-auto text-[10px] font-mono text-slate-300 space-y-1 shadow-inner">
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className={
                    log.includes("PASS") || log.includes("Sukses!") ? "text-emerald-400 font-bold" :
                    log.includes("FAIL") || log.includes("ERROR") || log.includes("❌") ? "text-rose-400 font-bold" :
                    log.includes("TEST CASE") ? "text-indigo-400 font-semibold" : "text-sky-300"
                  }>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Validation Feedback box & Claim bar */}
            <AnimatePresence>
              {executionFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] leading-relaxed flex items-start gap-1.5"
                >
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{executionFeedback}</span>
                </motion.div>
              )}

              {executionPassed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-500/30 text-emerald-300 space-y-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h5 className="font-extrabold text-xs uppercase font-mono">Project Berhasil Kompilasi & Lulus Tes!</h5>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Potongan algoritma tersusun sangat rapi dan logis. Seluruh test cases dari kami terlampaui sempurna! Kamu berhak mengklaim XP Reward.
                  </p>
                  
                  {/* Claim Reward trigger */}
                  <button
                    onClick={handleClaimReward}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-lg transition-colors shadow-md flex items-center justify-center gap-1 cursor-pointer"
                  >
                    KLAIM +{activeProject.xpReward} XP <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

    </div>
  );
}
