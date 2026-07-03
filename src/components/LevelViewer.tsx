import { ArrowLeft, ArrowRight, Check, X, Variable, GitBranch, RotateCw, Database, Cpu, HelpCircle, AlertCircle, Play, RefreshCw, Award, Sparkles, Terminal } from "lucide-react";
import { LevelConcept, PuzzleChallenge, SlideContent } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface LevelViewerProps {
  level: LevelConcept;
  onBackToDashboard: () => void;
  onLevelComplete: (levelId: string, xpGained: number) => void;
}

export default function LevelViewer({ level, onBackToDashboard, onLevelComplete }: LevelViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mode, setMode] = useState<"slides" | "puzzles" | "celebration">("slides");
  
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const activePuzzle = level.puzzles[currentPuzzleIdx];

  // --- Puzzle State Management ---
  const [predictorAnswer, setPredictorAnswer] = useState<string | null>(null);
  const [blockOrder, setBlockOrder] = useState<string[]>([]); // Current blocks compiled in workspace
  const [flowchartOrder, setFlowchartOrder] = useState<string[]>([]); // Current flowchart sequence IDs
  const [bugFixAnswer, setBugFixAnswer] = useState("");
  const [showBugHint, setShowBugHint] = useState(false);
  
  const [puzzleError, setPuzzleError] = useState<string | null>(null);
  const [puzzleSuccess, setPuzzleSuccess] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  // --- Interactive Slides State ---
  // 1. Variable Memory Widget state
  const [customVarName, setCustomVarName] = useState("skor");
  const [customVarType, setCustomVarType] = useState<"string" | "number" | "boolean">("number");
  const [customVarVal, setCustomVarVal] = useState("100");
  const [ramCells, setRamCells] = useState<Array<{ address: string; name: string; type: string; value: string; color: string }>>([
    { address: "0x00FF", name: "nama", type: "string", value: "Budi", color: "bg-sky-500/20 text-sky-400 border-sky-500" },
    { address: "0x0100", name: "isLulus", type: "boolean", value: "true", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500" },
    { address: "0x0101", name: "--kosong--", type: "empty", value: "", color: "bg-slate-900 text-slate-500 border-slate-800" }
  ]);

  // 2. If-Else Slider Widget state
  const [ifelseValue, setIfelseValue] = useState(15);
  const [isBallRunning, setIsBallRunning] = useState(false);
  const [ballPath, setBallPath] = useState<"idle" | "true_path" | "false_path">("idle");

  // 3. Loop Wheel state
  const [loopLimit, setLoopLimit] = useState(3);
  const [isLooping, setIsLooping] = useState(false);
  const [loopLogs, setLoopLogs] = useState<string[]>([]);
  const [loopHighlight, setLoopHighlight] = useState(-1);

  // 4. Array Train state
  const [selectedTrainIdx, setSelectedTrainIdx] = useState<number | null>(null);
  const [trainClawState, setTrainClawState] = useState<"idle" | "lowering" | "retrieved">("idle");

  // 5. Function blender state
  const [selectedFruit, setSelectedFruit] = useState("Apel 🍎");
  const [blenderState, setBlenderState] = useState<"idle" | "blending" | "done">("idle");
  const [juiceOutput, setJuiceOutput] = useState("");

  // Reset puzzle state on change
  useEffect(() => {
    setPredictorAnswer(null);
    setBlockOrder([]);
    setFlowchartOrder([]);
    setBugFixAnswer("");
    setShowBugHint(false);
    setPuzzleError(null);
    setPuzzleSuccess(false);
  }, [currentPuzzleIdx, mode]);

  // Handle Variable Memory Allocation
  const handleSaveToRAM = () => {
    if (!customVarName.trim()) return;
    const colorMap = {
      string: "bg-sky-500/20 text-sky-400 border-sky-500",
      number: "bg-amber-500/20 text-amber-400 border-amber-500",
      boolean: "bg-emerald-500/20 text-emerald-400 border-emerald-500"
    };
    
    // Allocate to third cell
    const updated = [...ramCells];
    updated[2] = {
      address: "0x0101",
      name: customVarName,
      type: customVarType,
      value: customVarType === "string" ? `"${customVarVal}"` : customVarVal,
      color: colorMap[customVarType]
    };
    setRamCells(updated);
  };

  // Run ball trigger for If-Else
  const triggerIfelsePath = () => {
    setIsBallRunning(true);
    setBallPath("idle");
    setTimeout(() => {
      if (ifelseValue >= 17) {
        setBallPath("true_path");
      } else {
        setBallPath("false_path");
      }
      setIsBallRunning(false);
    }, 800);
  };

  // Run simulated loop
  const triggerLooping = () => {
    setIsLooping(true);
    setLoopLogs(["Inisialisasi: let total = 0;"]);
    setLoopHighlight(-1);
    
    let currentLog: string[] = ["Inisialisasi: let total = 0;"];
    let accumulated = 0;

    for (let i = 1; i <= loopLimit; i++) {
      setTimeout(() => {
        accumulated += i;
        setLoopHighlight(i);
        currentLog = [...currentLog, `Putaran ${i} (i=${i}): total = ${accumulated - i} + ${i} = ${accumulated}`];
        setLoopLogs([...currentLog]);
        
        if (i === loopLimit) {
          setTimeout(() => {
            setLoopLogs(prev => [...prev, `Loop Selesai! Hasil akhir total = ${accumulated}`]);
            setIsLooping(false);
          }, 600);
        }
      }, i * 800);
    }
  };

  // Trigger train index claw
  const handleTrainClick = (idx: number) => {
    setSelectedTrainIdx(idx);
    setTrainClawState("lowering");
    setTimeout(() => {
      setTrainClawState("retrieved");
    }, 700);
  };

  // Trigger function juicer blender
  const handleBlender = () => {
    setBlenderState("blending");
    setTimeout(() => {
      const outputMap: Record<string, string> = {
        "Apel 🍎": "Jus Apel Sehat 🥤",
        "Jeruk 🍊": "Jus Jeruk Segar 🥤",
        "Alpukat 🥑": "Jus Alpukat Manis 🥤"
      };
      setJuiceOutput(outputMap[selectedFruit]);
      setBlenderState("done");
    }, 1200);
  };

  // Submit Answer handlers for different puzzle types
  const handleCheckAnswer = () => {
    if (!activePuzzle) return;
    
    setPuzzleError(null);
    let isCorrect = false;

    if (activePuzzle.type === "output_predictor") {
      isCorrect = predictorAnswer === activePuzzle.correctOption;
    } 
    else if (activePuzzle.type === "block_builder") {
      const userCodeText = blockOrder.join("\n").replace(/\s/g, "");
      const correctCodeText = activePuzzle.correctBlockOrder?.join("\n").replace(/\s/g, "");
      isCorrect = userCodeText === correctCodeText;
    } 
    else if (activePuzzle.type === "flowchart_connect") {
      const userSeq = flowchartOrder.join(",");
      const correctSeq = activePuzzle.correctFlowchartOrder?.join(",");
      isCorrect = userSeq === correctSeq;
    } 
    else if (activePuzzle.type === "code_bug_fix") {
      const formatCode = (c: string) => c.replace(/\s/g, "");
      isCorrect = formatCode(bugFixAnswer) === formatCode(activePuzzle.correctCode || "");
    }

    if (isCorrect) {
      setPuzzleSuccess(true);
      setXpEarned(prev => prev + activePuzzle.xp);
    } else {
      setPuzzleError("Oops! Susunan kode atau jawabanmu masih kurang tepat. Coba analisa kembali logika alirannya!");
    }
  };

  const handleNextPuzzle = () => {
    if (currentPuzzleIdx < level.puzzles.length - 1) {
      setCurrentPuzzleIdx(prev => prev + 1);
    } else {
      // Finished all puzzles! Transition to Celebration
      setMode("celebration");
    }
  };

  const handleFinishLevel = () => {
    onLevelComplete(level.id, xpEarned + level.xpReward);
  };

  return (
    <div id="level-viewer-container" className="max-w-6xl mx-auto p-1 space-y-6">
      
      {/* 1. Sub-Header breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Map
        </button>
        <div className="text-right">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Belajar Aktif</span>
          <h3 className="text-sm font-bold text-violet-300 font-sans">{level.title}</h3>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* --- MODE A: CONCEPT SLIDES --- */}
        {mode === "slides" && (
          <motion.div
            key="slide-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Box: Theory Presentation (7 Columns) */}
            <div className="lg:col-span-6 rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-xl min-h-[480px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                  <span className="text-xs font-bold text-sky-400 font-mono uppercase tracking-wider">
                    Slide {currentSlide + 1} dari {level.slides.length}
                  </span>
                  <span className="text-[10px] bg-sky-500/10 text-sky-300 font-bold px-2 py-0.5 rounded-full">
                    Materi Inti
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-sans leading-snug">
                  {level.slides[currentSlide].title}
                </h2>

                <div className="text-sm text-slate-300 leading-relaxed space-y-4 whitespace-pre-line font-medium">
                  {level.slides[currentSlide].content}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800/60 mt-6">
                <button
                  onClick={() => currentSlide > 0 && setCurrentSlide(prev => prev - 1)}
                  disabled={currentSlide === 0}
                  className={`px-4 py-2 text-xs font-bold rounded-lg border transition-colors flex items-center gap-1.5 ${
                    currentSlide === 0 
                      ? "border-slate-800 text-slate-600 cursor-not-allowed" 
                      : "border-slate-800 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" /> Sebelumnya
                </button>

                {currentSlide < level.slides.length - 1 ? (
                  <button
                    onClick={() => setCurrentSlide(prev => prev + 1)}
                    className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    Lanjut <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setMode("puzzles")}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-violet-500 hover:brightness-110 text-white font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(139,92,246,0.3)] animate-pulse"
                  >
                    Mulai Uji Logika <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Box: Live Interactive Widget (6 Columns) */}
            <div className="lg:col-span-6 rounded-2xl bg-slate-950 border border-slate-900 p-6 flex flex-col justify-center items-center shadow-inner relative min-h-[480px]">
              
              {/* Variable Memory interactive Widget */}
              {level.slides[currentSlide].visualType === "variable_memory" && (
                <div className="w-full space-y-6">
                  <div className="text-center">
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider">SIMULATOR MEMORI COMPILER</span>
                    <h4 className="text-sm font-bold text-slate-300 mt-1">Ubah input di bawah untuk mengalokasikan RAM!</h4>
                  </div>

                  {/* Allocation Input Panel */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Nama Variabel</label>
                      <input 
                        type="text" 
                        value={customVarName} 
                        onChange={(e) => setCustomVarName(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
                        className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                        placeholder="skor"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Tipe Data</label>
                      <select 
                        value={customVarType} 
                        onChange={(e: any) => {
                          setCustomVarType(e.target.value);
                          setCustomVarVal(e.target.value === "string" ? "Informatika" : e.target.value === "boolean" ? "true" : "100");
                        }}
                        className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                      </select>
                    </div>
                    <div className="flex flex-col justify-between">
                      <label className="text-slate-400 block mb-1">Nilai Data</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={customVarVal} 
                          onChange={(e) => setCustomVarVal(e.target.value)}
                          className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                        />
                        <button 
                          onClick={handleSaveToRAM}
                          className="px-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded text-[11px] transition-colors cursor-pointer"
                        >
                          SET
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Virtual RAM Cells block */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-slate-500 flex justify-between px-2">
                      <span>ALAMAT HEXADECIMAL</span>
                      <span>ALOKASI RAM</span>
                    </div>

                    <div className="space-y-2">
                      {ramCells.map((cell, cIdx) => (
                        <motion.div
                          key={cIdx}
                          layout
                          className={`p-3 rounded-lg border font-mono text-xs flex justify-between items-center transition-all ${cell.color}`}
                        >
                          <span className="text-slate-500">{cell.address}</span>
                          <span className="font-bold flex items-center gap-1.5">
                            {cell.type !== "empty" ? (
                              <>
                                <span className="text-[10px] px-1 bg-white/10 rounded">{cell.type}</span>
                                <span>{cell.name} = {cell.value}</span>
                              </>
                            ) : (
                              <span className="text-slate-600 italic">Laci Kosong (Siap Diisi let/const)</span>
                            )}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* If-Else Fork Slider interactive Widget */}
              {level.slides[currentSlide].visualType === "ifelse_fork" && (
                <div className="w-full space-y-6">
                  <div className="text-center">
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider">SIMULATOR PERCABANGAN UTAS</span>
                    <h4 className="text-sm font-bold text-slate-300 mt-1">Ubah Umur untuk memutar bola ke cabang jalur!</h4>
                  </div>

                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Parameter Umur: <span className="font-black text-sky-400 font-mono text-sm">{ifelseValue}</span> tahun</span>
                      <span className="text-[10px] text-violet-300 font-bold px-1.5 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">if (umur &gt;= 17)</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="25" 
                      value={ifelseValue} 
                      onChange={(e) => setIfelseValue(parseInt(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
                    />
                    <button 
                      onClick={triggerIfelsePath}
                      disabled={isBallRunning}
                      className="w-full py-2 bg-gradient-to-r from-sky-400 to-violet-500 text-white font-bold text-xs rounded-lg shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> JALANKAN LOGIKA
                    </button>
                  </div>

                  {/* Visual Pathway diagram representation */}
                  <div className="relative border border-slate-800 rounded-xl bg-slate-900/40 p-4 h-48 flex items-center justify-center overflow-hidden">
                    {/* Source node */}
                    <div className="absolute top-4 w-28 text-center text-[10px] font-mono py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700">
                      Input Umur ({ifelseValue})
                    </div>

                    {/* Ball animation */}
                    {isBallRunning && (
                      <motion.div 
                        animate={{ 
                          y: [ -45, 0 ],
                          scale: [ 1, 1.2, 1 ]
                        }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-12 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#fff] z-20"
                      />
                    )}

                    {/* Split tracks graphics */}
                    <div className="w-0.5 bg-slate-800 h-10 absolute top-10" />
                    
                    <div className="absolute top-20 flex justify-between w-64 text-center z-10 text-xs">
                      <div className={`p-2.5 rounded-lg border w-28 transition-all ${
                        ballPath === "true_path" 
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold scale-105 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                          : "bg-slate-900/60 border-slate-800 text-slate-500"
                      }`}>
                        <div className="text-[9px] font-mono opacity-60">YA (&gt;=17)</div>
                        <span>🎬 Boleh Masuk</span>
                      </div>

                      <div className={`p-2.5 rounded-lg border w-28 transition-all ${
                        ballPath === "false_path" 
                          ? "bg-rose-500/20 border-rose-500 text-rose-400 font-bold scale-105 shadow-[0_0_15px_rgba(239,68,68,0.2)]" 
                          : "bg-slate-900/60 border-slate-800 text-slate-500"
                      }`}>
                        <div className="text-[9px] font-mono opacity-60">TIDAK (&lt;17)</div>
                        <span>🍼 Pulang Bocil!</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Loop Wheel interactive Widget */}
              {level.slides[currentSlide].visualType === "loop_wheel" && (
                <div className="w-full space-y-6">
                  <div className="text-center">
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider">SIMULATOR FOR / WHILE LOOP</span>
                    <h4 className="text-sm font-bold text-slate-300 mt-1">Atur putaran untuk merapalkan mantra perulangan!</h4>
                  </div>

                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex-1 text-xs">
                      <span className="text-slate-400">Batas Loop (limit): <span className="font-mono text-sky-400 font-black">{loopLimit} kali</span></span>
                      <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        value={loopLimit} 
                        onChange={(e) => setLoopLimit(parseInt(e.target.value))}
                        className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-950 rounded-lg mt-2"
                      />
                    </div>
                    <button 
                      onClick={triggerLooping}
                      disabled={isLooping}
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-lg shadow-md disabled:bg-slate-800 disabled:text-slate-600 transition-colors cursor-pointer"
                    >
                      MUTAR LOOP
                    </button>
                  </div>

                  {/* Cog Wheel Graphics and Output logs side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="flex flex-col items-center justify-center">
                      <motion.div 
                        animate={isLooping ? { rotate: 360 } : {}}
                        transition={isLooping ? { repeat: Infinity, duration: 1.5, ease: "linear" } : {}}
                        className={`w-24 h-24 rounded-full border-4 border-dashed flex items-center justify-center text-sky-400 relative ${
                          isLooping ? "border-sky-400" : "border-slate-800"
                        }`}
                      >
                        <RotateCw className="w-10 h-10" />
                        {/* Interactive floating loop counter inside wheel */}
                        {isLooping && (
                          <div className="absolute text-xs font-black text-white font-mono bg-indigo-600 px-1.5 py-0.5 rounded shadow">
                            i={loopHighlight}
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Console Logger box */}
                    <div className="bg-slate-900 border border-slate-800/80 p-3 rounded-lg h-36 overflow-y-auto text-[10px] font-mono text-slate-300 space-y-1.5 shadow-inner">
                      <div className="text-[9px] text-slate-500 pb-1 border-b border-slate-800/60 uppercase">Virtual Console Terminal</div>
                      {loopLogs.map((log, idx) => (
                        <div key={idx} className={log.includes("Selesai") ? "text-emerald-400 font-bold" : "text-sky-300"}>
                          &gt; {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Array Train interactive Widget */}
              {level.slides[currentSlide].visualType === "array_train" && (
                <div className="w-full space-y-6">
                  <div className="text-center">
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider">SIMULATOR TRAIN ARRAY INDEX</span>
                    <h4 className="text-sm font-bold text-slate-300 mt-1">Klik gerbong kereta untuk menarik muatan berdasarkan indeks!</h4>
                  </div>

                  {/* Virtual Train row layout */}
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {level.slides[currentSlide].visualData.items.map((fruit: string, fIdx: number) => {
                      const isSelected = selectedTrainIdx === fIdx;
                      return (
                        <motion.button
                          key={fIdx}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTrainClick(fIdx)}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                            isSelected 
                              ? "bg-sky-500/15 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.15)] text-sky-400" 
                              : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400"
                          }`}
                        >
                          <span className="text-2xl mb-1">{fruit.split(" ")[1]}</span>
                          <span className="text-[10px] font-mono font-bold block bg-slate-950/80 px-1 py-0.5 rounded">
                            Index [{fIdx}]
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Console Claw Retrieval */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl min-h-[100px] flex flex-col justify-center items-center text-center">
                    {trainClawState === "idle" && (
                      <p className="text-xs text-slate-500 font-mono">Pilih salah satu indeks gerbong di atas!</p>
                    )}
                    {trainClawState === "lowering" && (
                      <div className="space-y-2 animate-pulse text-sky-400">
                        <span className="text-xs font-mono">Mengunduh alamat memori: arr[{selectedTrainIdx}]...</span>
                      </div>
                    )}
                    {trainClawState === "retrieved" && selectedTrainIdx !== null && (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-1.5"
                      >
                        <div className="text-[10px] font-mono text-slate-500 uppercase">Akses Berhasil!</div>
                        <div className="text-sm font-bold text-white">
                          buah[{selectedTrainIdx}] === <span className="text-emerald-400">"{level.slides[currentSlide].visualData.items[selectedTrainIdx].split(" ")[0]}"</span>
                        </div>
                        <p className="text-[11px] text-slate-400 max-w-sm">
                          Komputer langsung meloncat ke laci indeks ke-{selectedTrainIdx} karena ia mengetahui letak offset memorinya secara presisi!
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* Function blender interactive Widget */}
              {level.slides[currentSlide].visualType === "function_box" && (
                <div className="w-full space-y-6">
                  <div className="text-center">
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider">VISUALISATOR FUNGSI BLENDER</span>
                    <h4 className="text-sm font-bold text-slate-300 mt-1">Pilih parameter buah lalu panggil fungsi blender()!</h4>
                  </div>

                  {/* Parameter picker */}
                  <div className="flex justify-center gap-3">
                    {level.slides[currentSlide].visualData.inputs.map((fruit: string, fIdx: number) => (
                      <button
                        key={fIdx}
                        onClick={() => {
                          setSelectedFruit(fruit);
                          setBlenderState("idle");
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedFruit === fruit 
                            ? "bg-violet-600/20 border-violet-500 text-violet-300 shadow" 
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        {fruit}
                      </button>
                    ))}
                  </div>

                  {/* Interactive Blender Graphic representation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        {/* Shaking animation if blending */}
                        <motion.div 
                          animate={blenderState === "blending" ? { x: [-3, 3, -3], rotate: [-2, 2, -2] } : {}}
                          transition={blenderState === "blending" ? { repeat: Infinity, duration: 0.1 } : {}}
                          className={`w-24 h-36 border-2 rounded-xl flex flex-col justify-between p-3 relative bg-slate-900 ${
                            blenderState === "blending" ? "border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]" : "border-slate-800"
                          }`}
                        >
                          <div className="text-[9px] font-mono text-slate-500 text-center uppercase tracking-widest">blender()</div>
                          <div className="text-3xl text-center flex-1 flex items-center justify-center">
                            {blenderState === "idle" ? selectedFruit.split(" ")[1] : blenderState === "blending" ? "🌪️" : "🥤"}
                          </div>
                          <div className="h-4 w-full bg-slate-950 rounded" />
                        </motion.div>
                      </div>

                      <button
                        onClick={handleBlender}
                        disabled={blenderState === "blending"}
                        className="mt-4 px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        {blenderState === "blending" ? "BLENDING..." : "PANGGIL BLENDER()"}
                      </button>
                    </div>

                    {/* Output juice box details */}
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl min-h-[140px] flex flex-col justify-center items-center text-center">
                      {blenderState === "idle" && (
                        <p className="text-xs text-slate-500 font-mono">
                          Menunggu fungsi dipanggil:<br/>
                          <span className="text-sky-400 font-bold">blender("{selectedFruit.split(" ")[0]}")</span>
                        </p>
                      )}
                      {blenderState === "blending" && (
                        <div className="space-y-1 text-violet-400 font-mono animate-pulse text-xs">
                          <p>Melakukan kompilasi...</p>
                          <p>Mencampur parameter...</p>
                        </div>
                      )}
                      {blenderState === "done" && (
                        <motion.div 
                          initial={{ scale: 0.92, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="space-y-2"
                        >
                          <span className="text-[10px] font-mono text-slate-500 uppercase">FUNGSI MENGEMBALIKAN (RETURN) VALUE:</span>
                          <div className="text-base font-black text-emerald-400 font-sans">
                            {juiceOutput}
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Fungsi memproses argumen input <span className="font-mono text-violet-300">"{selectedFruit.split(" ")[0]}"</span> lalu me-return <span className="font-mono text-emerald-300">"{juiceOutput.split(" ")[0] + " " + juiceOutput.split(" ")[1]}"</span>!
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* General Fallback / Flowchart Shape presentation */}
              {level.slides[currentSlide].visualType === "flowchart_builder" && (
                <div className="w-full space-y-6">
                  <div className="text-center">
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider font-bold">KAMUS SIMBOL STANDARD INTERNASIONAL</span>
                    <h4 className="text-sm font-bold text-slate-300 mt-1">Arahkan kursor atau klik simbol flowchart untuk fungsinya!</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-sky-400 transition-colors text-center cursor-help">
                      <div className="w-16 h-8 border-2 border-sky-400 rounded-full mx-auto flex items-center justify-center bg-sky-950/20 mb-2">
                        Start / End
                      </div>
                      <span className="font-bold text-sky-400">Terminator</span>
                      <p className="text-[10px] text-slate-400 mt-1">Memulai atau mengakhiri peta flowchart.</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-indigo-400 transition-colors text-center cursor-help">
                      <div className="w-16 h-8 border-2 border-indigo-400 mx-auto flex items-center justify-center bg-indigo-950/20 mb-2 transform -skew-x-12">
                        Input
                      </div>
                      <span className="font-bold text-indigo-400">Input / Output</span>
                      <p className="text-[10px] text-slate-400 mt-1">Membaca input data atau mengeluarkan print output.</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-violet-400 transition-colors text-center cursor-help">
                      <div className="w-16 h-8 border-2 border-violet-400 mx-auto flex items-center justify-center bg-violet-950/20 mb-2">
                        x = x + 1
                      </div>
                      <span className="font-bold text-violet-400">Process</span>
                      <p className="text-[10px] text-slate-400 mt-1">Perhitungan matematis, deklarasi atau manipulasi laci data.</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-amber-400 transition-colors text-center cursor-help">
                      <div className="w-12 h-12 border-2 border-amber-400 mx-auto flex items-center justify-center bg-amber-950/20 mb-2 rotate-45">
                        <span className="transform -rotate-45 text-[9px] font-bold">if?</span>
                      </div>
                      <span className="font-bold text-amber-400">Decision</span>
                      <p className="text-[10px] text-slate-400 mt-1">Percabangan logika (YA / TIDAK) untuk kondisi If-Else.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}

        {/* --- MODE B: PRACTICE PUZZLES --- */}
        {mode === "puzzles" && activePuzzle && (
          <motion.div
            key="puzzle-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Column: Puzzle requirements & Instruction (5 Columns) */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-xl min-h-[460px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                  <span className="text-xs font-bold text-violet-400 font-mono uppercase tracking-wider">
                    Tantangan {currentPuzzleIdx + 1} dari {level.puzzles.length}
                  </span>
                  <span className="text-[10px] bg-sky-500/10 text-sky-300 font-bold px-2 py-0.5 rounded-full">
                    +{activePuzzle.xp} XP
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-white font-sans">{activePuzzle.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {activePuzzle.instruction}
                </p>

                {activePuzzle.type === "code_bug_fix" && (
                  <div className="pt-4">
                    <button
                      onClick={() => setShowBugHint(!showBugHint)}
                      className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" /> {showBugHint ? "Sembunyikan Petunjuk Kak Logic" : "Tanya Petunjuk Kak Logic"}
                    </button>
                    <AnimatePresence>
                      {showBugHint && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 text-xs p-3 rounded-lg bg-sky-950/20 border border-sky-800/30 text-sky-300 leading-relaxed font-mono"
                        >
                          {activePuzzle.bugHint}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Feedback messages / Proceed button */}
              <div className="pt-6 border-t border-slate-800/60 mt-6 space-y-3">
                {puzzleError && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2 animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{puzzleError}</span>
                  </div>
                )}

                {puzzleSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs space-y-3">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 shrink-0 mt-0.5 bg-emerald-500 text-slate-950 rounded-full p-0.5" />
                      <div>
                        <p className="font-extrabold text-sm">Logika Sempurna! 🎉</p>
                        <p className="mt-1 leading-relaxed text-slate-300">{activePuzzle.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  {!puzzleSuccess ? (
                    <button
                      onClick={handleCheckAnswer}
                      className="w-full py-2.5 bg-gradient-to-r from-sky-400 to-violet-500 text-white font-black text-xs rounded-xl shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer text-center"
                    >
                      PERIKSA LOGIKA JAWABAN
                    </button>
                  ) : (
                    <button
                      onClick={handleNextPuzzle}
                      className="w-full py-2.5 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl shadow-md hover:bg-emerald-400 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Lanjut Tantangan</span> <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Code Play Space / Workspace (7 Columns) */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-900 p-6 flex flex-col justify-between shadow-inner min-h-[460px]">
              
              {/* PUZZLE INTERFACE 1: MULTIPLE CHOICE PREDICTOR */}
              {activePuzzle.type === "output_predictor" && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  {/* Styled Codeblock */}
                  <div className="space-y-2">
                    <div className="text-[10px] text-slate-500 font-mono uppercase pb-1 border-b border-slate-900">Interactive Editor Output</div>
                    <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-xs text-sky-300 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-lg">
                      {activePuzzle.codeSnippet?.split("\n").map((line, lIdx) => {
                        // Highlight keywords
                        let highlighted = line
                          .replace(/(let|const|if|else|function|return)/g, '<span class="text-sky-400 font-bold">$1</span>')
                          .replace(/(\d+)/g, '<span class="text-amber-400">$1</span>')
                          .replace(/("(.*?)")/g, '<span class="text-emerald-400">$1</span>');
                        return (
                          <div key={lIdx} className="flex gap-3">
                            <span className="text-slate-600 select-none w-4 text-right">{lIdx + 1}</span>
                            <span dangerouslySetInnerHTML={{ __html: highlighted }} />
                          </div>
                        );
                      })}
                    </pre>
                  </div>

                  {/* Options Selector Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {activePuzzle.options?.map((opt, oIdx) => {
                      const isSelected = predictorAnswer === opt;
                      return (
                        <button
                          key={oIdx}
                          disabled={puzzleSuccess}
                          onClick={() => setPredictorAnswer(opt)}
                          className={`p-3 rounded-xl border text-left font-mono font-bold transition-all cursor-pointer ${
                            isSelected 
                              ? "bg-sky-500/10 border-sky-400 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.15)]" 
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
                          }`}
                        >
                          <span className="text-slate-500 font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PUZZLE INTERFACE 2: SCRAP CODE BLOCK BUILDER */}
              {activePuzzle.type === "block_builder" && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  
                  {/* Visual Drag/Click compiling workspace */}
                  <div className="space-y-2 flex-1">
                    <div className="text-[10px] text-slate-500 font-mono uppercase pb-1 border-b border-slate-900 flex justify-between">
                      <span>Logika Editor Workspace</span>
                      <button 
                        onClick={() => setBlockOrder([])}
                        className="text-slate-500 hover:text-slate-300 transition-colors text-[9px] flex items-center gap-0.5"
                      >
                        <RefreshCw className="w-2.5 h-2.5" /> Bersihkan
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 min-h-[160px] space-y-2 flex flex-col justify-center">
                      {blockOrder.length === 0 ? (
                        <div className="text-center py-6">
                          <Terminal className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                          <p className="text-xs text-slate-500 font-mono">Workspace Kosong. Klik potongan kode di bawah!</p>
                        </div>
                      ) : (
                        blockOrder.map((blockText, bIdx) => (
                          <motion.div
                            key={bIdx}
                            layout
                            className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-sky-300 flex justify-between items-center group shadow-sm hover:border-rose-500/40"
                          >
                            <span>{blockText}</span>
                            <button
                              disabled={puzzleSuccess}
                              onClick={() => setBlockOrder(prev => prev.filter((_, i) => i !== bIdx))}
                              className="text-slate-600 hover:text-rose-400 p-0.5 rounded opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Scrambled blocks bin */}
                  <div className="space-y-2">
                    <div className="text-[10px] text-slate-500 font-mono uppercase">Potongan Blok Kode Tersedia</div>
                    <div className="flex flex-wrap gap-2">
                      {activePuzzle.blocks?.map((blockText, bIdx) => {
                        const alreadyInWorkspace = blockOrder.includes(blockText);
                        return (
                          <button
                            key={bIdx}
                            disabled={alreadyInWorkspace || puzzleSuccess}
                            onClick={() => setBlockOrder(prev => [...prev, blockText])}
                            className={`px-3 py-2 rounded-lg border text-xs font-mono font-semibold transition-all cursor-pointer ${
                              alreadyInWorkspace 
                                ? "bg-slate-950 border-slate-900/60 text-slate-700 cursor-not-allowed scale-95" 
                                : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-900/80 active:scale-98"
                            }`}
                          >
                            {blockText}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* PUZZLE INTERFACE 3: FLOWCHART CONNECTOR */}
              {activePuzzle.type === "flowchart_connect" && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="text-[10px] text-slate-500 font-mono uppercase pb-1 border-b border-slate-900 flex justify-between">
                      <span>Alur Hubungan Wires</span>
                      <button 
                        onClick={() => setFlowchartOrder([])}
                        className="text-slate-500 hover:text-slate-300 transition-colors text-[9px] flex items-center gap-0.5"
                      >
                        <RefreshCw className="w-2.5 h-2.5" /> Reset Alur
                      </button>
                    </div>

                    {/* Compiled flowchart wire preview */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 min-h-[140px] flex flex-wrap justify-center items-center gap-2">
                      {flowchartOrder.length === 0 ? (
                        <p className="text-xs text-slate-500 font-mono text-center">Urutkan node-node flowchart di bawah agar membentuk algoritma utuh!</p>
                      ) : (
                        flowchartOrder.map((nodeId, idx) => {
                          const originalNode = activePuzzle.flowchartNodes?.find(n => n.id === nodeId);
                          return (
                            <div key={idx} className="flex items-center gap-1.5">
                              {idx > 0 && <span className="text-violet-500 font-bold font-mono">➔</span>}
                              <div className={`px-2.5 py-1 text-[10px] font-bold rounded-lg text-white font-mono shadow ${originalNode?.color}`}>
                                {originalNode?.text}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Scrambled nodes toolbox */}
                  <div className="space-y-2">
                    <div className="text-[10px] text-slate-500 font-mono uppercase">Loker Simbol Alur Tersedia</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {activePuzzle.flowchartNodes?.map((node) => {
                        const selectedIdx = flowchartOrder.indexOf(node.id);
                        const isSelected = selectedIdx !== -1;
                        
                        return (
                          <button
                            key={node.id}
                            disabled={puzzleSuccess}
                            onClick={() => {
                              if (isSelected) {
                                setFlowchartOrder(prev => prev.filter(id => id !== node.id));
                              } else {
                                setFlowchartOrder(prev => [...prev, node.id]);
                              }
                            }}
                            className={`p-2 rounded-xl border text-[11px] font-mono font-bold text-left flex justify-between items-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-violet-950/40 border-violet-500 text-violet-300 scale-[0.98]"
                                : "bg-slate-900 border-slate-800/80 text-slate-400 hover:bg-slate-900"
                            }`}
                          >
                            <span className="truncate">{node.text}</span>
                            {isSelected && (
                              <span className="text-[9px] font-extrabold bg-violet-600 text-white rounded-full w-4 h-4 flex items-center justify-center shrink-0 ml-1">
                                {selectedIdx + 1}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* PUZZLE INTERFACE 4: CODE BUG FIXER */}
              {activePuzzle.type === "code_bug_fix" && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-[10px] text-slate-500 font-mono uppercase pb-1 border-b border-slate-900">Buggy Code Editor</div>
                    <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                      {activePuzzle.buggyCode}
                    </pre>
                  </div>

                  <div className="space-y-2 text-xs">
                    <label className="text-slate-400 block font-mono">Jawaban Solusi Koreksi Kode:</label>
                    <textarea
                      disabled={puzzleSuccess}
                      value={bugFixAnswer}
                      onChange={(e) => setBugFixAnswer(e.target.value)}
                      placeholder="Ketik baris kode atau block logika yang benar di sini..."
                      rows={4}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:border-sky-400 outline-none"
                    />
                    <span className="text-[10px] text-slate-500 font-mono">TIPS: Perhatikan penulisan indentasi dan operator penambah increment.</span>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}

        {/* --- MODE C: LEVEL COMPLETED CELEBRATION --- */}
        {mode === "celebration" && (
          <motion.div
            key="celebration-view"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 border border-violet-800/40 p-8 text-center max-w-xl mx-auto space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient glows */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-sky-400/10 to-transparent pointer-events-none" />
            <div className="absolute -bottom-10 right-10 w-44 h-44 bg-violet-600/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col items-center space-y-4">
              
              {/* Award Icon circle */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-400 to-violet-600 flex items-center justify-center border-4 border-slate-900 shadow-xl text-white relative">
                <Award className="w-10 h-10 animate-bounce" />
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -inset-1 rounded-full border border-sky-400/40 border-dashed"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest">KULIAH SELESAI</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-sans">
                  Hebat! Kamu Lulus {level.title}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed mt-2">
                  Kamu telah berhasil melahap semua slide materi dan memecahkan teka-teki logika koding dari kami!
                </p>
              </div>

              {/* Score Splash Block */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 w-full grid grid-cols-2 gap-4 text-center mt-4">
                <div className="space-y-0.5 border-r border-slate-800">
                  <div className="text-[10px] text-slate-500 font-mono">TANTANGAN SELESAI</div>
                  <div className="text-lg font-black text-white">{level.puzzles.length} Teka-Teki</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-500 font-mono">XP TERKUMPUL</div>
                  <div className="text-lg font-black text-sky-400 font-mono">+{xpEarned + level.xpReward} XP</div>
                </div>
              </div>

              {/* Motivational message */}
              <div className="p-3 rounded-lg bg-sky-950/20 border border-sky-800/30 text-xs text-sky-300 leading-relaxed font-semibold max-w-sm mt-2">
                "Koding bukan soal menghafal sintaks, tapi melatih alur pikir logika secara logis dan terstruktur!"
              </div>

              {/* Bottom return buttons */}
              <button
                onClick={handleFinishLevel}
                className="w-full py-3 bg-gradient-to-r from-sky-400 to-violet-500 hover:brightness-110 text-white font-black text-xs rounded-xl shadow-[0_4px_15px_rgba(139,92,246,0.3)] transition-all cursor-pointer text-center"
              >
                KLAIM XP & KEMBALI KE PETA JALAN
              </button>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
