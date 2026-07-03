import { X, BookOpen, Check, Variable, GitBranch, RotateCw, Database, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TheoryModal({ isOpen, onClose }: TheoryModalProps) {
  const categories = [
    {
      title: "Variabel & Tipe Data",
      icon: Variable,
      color: "text-sky-400 bg-sky-950/40 border-sky-800",
      content: [
        { name: "let", desc: "Membuat variabel yang nilainya bisa diubah nanti.", syntax: 'let nama = "Budi";\nnama = "Udin";' },
        { name: "const", desc: "Membuat konstanta yang nilainya dikunci tetap.", syntax: "const NIM = 10123001;" },
        { name: "String", desc: "Tipe data teks, wajib diapit tanda kutip.", syntax: 'let prodi = "Informatika";' },
        { name: "Number", desc: "Tipe data angka (bulat maupun desimal).", syntax: "let ipk = 3.85;\nlet sks = 20;" },
        { name: "Boolean", desc: "Tipe data logika (benar atau salah).", syntax: "let lulusStatus = true;" }
      ]
    },
    {
      title: "If-Else (Percabangan)",
      icon: GitBranch,
      color: "text-violet-400 bg-violet-950/40 border-violet-800",
      content: [
        { name: "If Block", desc: "Mengevaluasi kondisi, jika true maka jalankan isi block.", syntax: "if (nilai >= 75) {\n  print('Lulus');\n}" },
        { name: "Else Block", desc: "Dijalankan jika kondisi pada If bernilai false.", syntax: "if (nilai >= 75) {\n  print('Lulus');\n} else {\n  print('Mengulang');\n}" },
        { name: "Else If", desc: "Mengecek kondisi berantai lainnya.", syntax: "if (nilai >= 85) {\n  grade = 'A';\n} else if (nilai >= 75) {\n  grade = 'B';\n}" }
      ]
    },
    {
      title: "Looping (Perulangan)",
      icon: RotateCw,
      color: "text-indigo-400 bg-indigo-950/40 border-indigo-800",
      content: [
        { name: "For Loop", desc: "Perulangan dengan jumlah iterasi yang sudah pasti.", syntax: "for (let i = 1; i <= 5; i++) {\n  print('Iterasi ke-' + i);\n}" },
        { name: "While Loop", desc: "Perulangan berdasarkan kondisi selama bernilai true.", syntax: "let i = 0;\nwhile (i < 5) {\n  print(i);\n  i++;\n}" },
        { name: "Break", desc: "Menghentikan perulangan secara paksa.", syntax: "if (ketemu === true) {\n  break;\n}" }
      ]
    },
    {
      title: "Array & Fungsi",
      icon: Database,
      color: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
      content: [
        { name: "Array", desc: "Laci penyimpanan laci berindeks mulai dari 0.", syntax: "let matkul = ['Alpro', 'Strukdat'];\nprint(matkul[0]); // Alpro" },
        { name: "Function", desc: "Cetak modul kode yang bisa dipanggil berulang kali.", syntax: "function kali(a, b) {\n  return a * b;\n}" }
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="theory-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <motion.div
            id="theory-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-4xl max-h-[85vh] overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-sans">Kamus Koding LogicLab</h3>
                  <p className="text-xs text-slate-400">Panduan sintaks cepat & teori dasar pemrograman</p>
                </div>
              </div>
              <button
                id="close-theory-modal"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <div key={idx} className="p-5 rounded-xl bg-slate-950/50 border border-slate-800 space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                        <div className={`p-1.5 rounded-md border ${cat.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-semibold text-slate-200">{cat.title}</h4>
                      </div>

                      <div className="space-y-4">
                        {cat.content.map((item, iIdx) => (
                          <div key={iIdx} className="space-y-1.5">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400">
                                {item.name}
                              </span>
                              <span className="text-xs text-slate-400">{item.desc}</span>
                            </div>
                            <pre className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-violet-300 overflow-x-auto whitespace-pre-wrap">
                              {item.syntax}
                            </pre>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-center text-xs text-slate-500">
              Tips: Baca kamus ini jika kamu kesulitan menyusun blok logika di tantangan level atau project!
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
