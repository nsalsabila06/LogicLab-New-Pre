/**
 * Types for LogicLab Gamified Coding Learning Application
 */

export interface LevelConcept {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: "Pemula" | "Menengah" | "Lanjutan";
  xpReward: number;
  unlocked: boolean;
  completed: boolean;
  iconName: string; // Lucide icon name string
  slides: SlideContent[];
  puzzles: PuzzleChallenge[];
}

export interface SlideContent {
  id: string;
  title: string;
  content: string; // Markdown or simple text
  visualType: "variable_memory" | "ifelse_fork" | "loop_wheel" | "array_train" | "function_box" | "flowchart_builder";
  visualData: any; // Context-specific interactive widget data
}

export type PuzzleType = "block_builder" | "output_predictor" | "flowchart_connect" | "code_bug_fix";

export interface PuzzleChallenge {
  id: string;
  title: string;
  instruction: string;
  type: PuzzleType;
  difficulty: "Easy" | "Medium" | "Hard";
  xp: number;
  
  // For block_builder
  blocks?: string[]; // Available lines of code
  correctBlockOrder?: string[]; // The correct sequence of block contents/IDs
  
  // For output_predictor
  codeSnippet?: string;
  options?: string[]; // Multiple choice answers
  correctOption?: string;
  
  // For flowchart_connect
  flowchartNodes?: FlowchartNode[];
  correctFlowchartOrder?: string[]; // Sequential IDs of correct node connections
  
  // For code_bug_fix
  buggyCode?: string;
  correctCode?: string;
  bugHint?: string;
  
  explanation: string;
}

export interface FlowchartNode {
  id: string;
  text: string;
  shape: "start_end" | "process" | "decision" | "input_output";
  color?: string;
}

export interface SimulationProject {
  id: string;
  title: string;
  description: string;
  difficulty: "Muda" | "Sedang" | "Tantangan";
  theme: "smart_home" | "cashier" | "park_sensor" | "authenticator";
  objective: string;
  xpReward: number;
  availableBlocks: CodeBlock[];
  testCases: TestCase[];
  simulationVisual: {
    title: string;
    description: string;
    initialState: any;
    runStateChange: (inputs: any, outputs: string[]) => any;
  };
}

export interface CodeBlock {
  id: string;
  code: string;
  label: string;
  category: "variable" | "control" | "loop" | "function" | "action";
  indent: number; // For clean visual layoutting
}

export interface TestCase {
  input: any; // E.g. { age: 18 } or { price: 40000, money: 50000 }
  expectedOutput: string[]; // Strings expected in console output
  description: string;
}

export interface UserStats {
  xp: number;
  streakDays: number;
  lastActive: string; // ISO String
  completedLevels: string[];
  completedProjects: string[];
  unlockedAchievements: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  xpRequirement?: number;
  levelCountRequirement?: number;
  projectCountRequirement?: number;
}
