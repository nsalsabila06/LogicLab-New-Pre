import { LevelConcept, SimulationProject, Achievement } from "../types";

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "var_vanguard",
    title: "Variabel Vanguard",
    description: "Selesaikan Level 1 & pahami alokasi memori komputer.",
    iconName: "Variable",
    levelCountRequirement: 1
  },
  {
    id: "branch_boss",
    title: "Branching Boss",
    description: "Selesaikan Level Percabangan If-Else dan buat keputusan logika.",
    iconName: "GitBranch",
    levelCountRequirement: 2
  },
  {
    id: "flow_master",
    title: "Flowchart Master",
    description: "Selesaikan Level Flowchart Logic dan kuasai visualisasi algoritma.",
    iconName: "GitMerge",
    levelCountRequirement: 3
  },
  {
    id: "loop_legend",
    title: "Loop Legend",
    description: "Selesaikan Level Looping dan hentikan repetisi tanpa batas.",
    iconName: "RotateCw",
    levelCountRequirement: 4
  },
  {
    id: "array_ace",
    title: "Array Ace",
    description: "Kuasai struktur data Array di Level 5.",
    iconName: "Database",
    levelCountRequirement: 5
  },
  {
    id: "func_force",
    title: "Function Force",
    description: "Kuasai fungsi modular & return value di Level 6.",
    iconName: "Cpu",
    levelCountRequirement: 6
  },
  {
    id: "project_pioneer",
    title: "Project Pioneer",
    description: "Berhasil menyelesaikan simulasi project nyata pertamamu.",
    iconName: "Award",
    projectCountRequirement: 1
  },
  {
    id: "sandbox_king",
    title: "LogicLab Master Architect",
    description: "Selesaikan seluruh level dan semua simulasi project di LogicLab!",
    iconName: "Trophy",
    xpRequirement: 1000
  }
];

export const LEVELS_DATA: LevelConcept[] = [
  {
    id: "level-1",
    title: "Variabel & Tipe Data",
    subtitle: "Kotak Penyimpanan RAM",
    description: "Belajar bagaimana komputer menyimpan info di memori seperti nama, angka, atau status saklar.",
    difficulty: "Pemula",
    xpReward: 100,
    unlocked: true,
    completed: false,
    iconName: "Box",
    slides: [
      {
        id: "v-slide-1",
        title: "Apa itu Variabel?",
        content: "Bayangkan **Variabel** sebagai kotak berlabel di dalam memori komputer (RAM). Kita bisa menyimpan data ke dalamnya, mengubah isinya, dan memanggilnya kembali kapan saja lewat nama label tersebut.\n\nSetiap kotak memiliki jenis (Tipe Data) tertentu agar komputer tahu seberapa besar kotak yang harus disiapkan!",
        visualType: "variable_memory",
        visualData: {
          types: [
            { name: "String (Teks)", example: "\"Budi\"", desc: "Data teks, diapit tanda kutip.", color: "bg-sky-500", value: "Budi" },
            { name: "Number (Angka)", example: "125", desc: "Bilangan bulat atau desimal.", color: "bg-amber-500", value: 125 },
            { name: "Boolean (Kondisi)", example: "true", desc: "Hanya bernilai benar (true) atau salah (false).", color: "bg-emerald-500", value: true }
          ]
        }
      },
      {
        id: "v-slide-2",
        title: "Deklarasi & Inisialisasi",
        content: "Di bahasa pemrograman modern seperti JavaScript/TypeScript, kita menggunakan kata kunci `let` atau `const` untuk membuat variabel.\n\n*   `let nama = \"Andi\";` (Isi kotak bisa diubah nanti)\n*   `const PI = 3.14;` (Konstanta, isi kotak dikunci dan TIDAK BISA diubah)\n\nTanda `=` di sini berarti **Assignment** (memasukkan nilai ke dalam kotak), bukan sama dengan secara matematika!",
        visualType: "variable_memory",
        visualData: {
          types: [
            { name: "let", example: "let skor = 0; skor = 10;", desc: "Bisa ditimpa nilainya.", color: "bg-indigo-500", value: "Dapat diubah" },
            { name: "const", example: "const NIM = 1012301;", desc: "Tetap, tidak bisa diubah.", color: "bg-rose-500", value: "Kunci / Tetap" }
          ]
        }
      }
    ],
    puzzles: [
      {
        id: "v-p1",
        title: "Tebak Hasil Akhir!",
        instruction: "Perhatikan baris kode di bawah. Berapa nilai dari variabel `skor` pada akhirnya?",
        type: "output_predictor",
        difficulty: "Easy",
        xp: 50,
        codeSnippet: `let skor = 100;
skor = skor + 50;
let bonus = 10;
skor = skor - bonus;`,
        options: ["100", "150", "140", "160"],
        correctOption: "140",
        explanation: "Mula-mula `skor = 100`. Lalu ditambahkan 50 menjadi `150`. Variabel `bonus` bernilai `10`. Kemudian `skor` dikurangi `bonus` (150 - 10) sehingga menjadi `140`."
      },
      {
        id: "v-p2",
        title: "Tukar Isi Gelas!",
        instruction: "Susun baris kode berikut agar nilai variabel `gelasA` berpindah ke `gelasB` dan sebaliknya. Gunakan variabel pembantu `gelasKosong`!",
        type: "block_builder",
        difficulty: "Medium",
        xp: 50,
        blocks: [
          "gelasKosong = gelasA;",
          "gelasA = gelasB;",
          "gelasB = gelasKosong;"
        ],
        correctBlockOrder: [
          "gelasKosong = gelasA;",
          "gelasA = gelasB;",
          "gelasB = gelasKosong;"
        ],
        explanation: "Untuk menukar nilai dua variabel tanpa menghilangkan isinya, kita harus menyimpan nilai `gelasA` terlebih dahulu di `gelasKosong`. Baru kita bisa menimpa `gelasA` dengan `gelasB`, dan terakhir mengisi `gelasB` dengan nilai asli `gelasA` yang ada di `gelasKosong`!"
      }
    ]
  },
  {
    id: "level-2",
    title: "If-Else (Percabangan)",
    subtitle: "Mengambil Keputusan",
    description: "Belajar membuat program pintar yang bisa mengambil keputusan berdasarkan kondisi tertentu seperti gerbang bioskop otomatis.",
    difficulty: "Pemula",
    xpReward: 120,
    unlocked: false,
    completed: false,
    iconName: "GitBranch",
    slides: [
      {
        id: "if-slide-1",
        title: "Bagaimana Program Berpikir?",
        content: "Di dunia nyata kita sering mengambil keputusan: \"Jika hujan, bawa payung. Jika tidak, pakai kacamata hitam.\"\n\nKomputer melakukannya lewat struktur **If-Else**. Kondisi di dalam kurung `if (kondisi)` harus menghasilkan boolean (`true` atau `false`). Jika `true`, blok kode di dalamnya dijalankan!",
        visualType: "ifelse_fork",
        visualData: {
          scenarios: [
            { label: "Beli Tiket Bioskop", conditionText: "umur >= 17", value: 18, resultTrue: "Boleh Masuk 🎬", resultFalse: "Pulang Bocil! 🍼", limit: 17 }
          ]
        }
      },
      {
        id: "if-slide-2",
        title: "Operator Perbandingan & Logika",
        content: "Untuk membuat kondisi, kita memakai:\n\n*   **Operator Perbandingan:** `>`, `<`, `>=` (lebih dari sama dengan), `<=` (kurang dari sama dengan), `===` (sama dengan persis), `!==` (tidak sama dengan).\n*   **Operator Logika:** `&&` (DAN - semua harus benar), `||` (ATAU - salah satu saja benar sudah cukup), `!` (TIDAK/Negasi).\n\nContoh: `if (umur >= 17 && punyaTiket === true)`",
        visualType: "ifelse_fork",
        visualData: {
          scenarios: [
            { label: "Promo Belanja", conditionText: "member === true || total >= 100000", value: 120000, resultTrue: "Dapat Diskon! 🎉", resultFalse: "Harga Normal 🛒", limit: 100000 }
          ]
        }
      }
    ],
    puzzles: [
      {
        id: "if-p1",
        title: "Logika Diskon Bioskop",
        instruction: "Seseorang berumur 16 tahun dan memiliki kupon promo. Apa output dari kode berikut?",
        type: "output_predictor",
        difficulty: "Medium",
        xp: 60,
        codeSnippet: `let umur = 16;
let punyaKupon = true;

if (umur >= 17 || punyaKupon === true) {
  print("Boleh Masuk!");
} else {
  print("Dilarang Masuk!");
}`,
        options: ["Boleh Masuk!", "Dilarang Masuk!", "Tidak Menghasilkan Apapun", "Error Syntax"],
        correctOption: "Boleh Masuk!",
        explanation: "Karena menggunakan operator `||` (ATAU), kondisi akan bernilai `true` jika salah satu dari syarat terpenuhi. Meskipun `umur >= 17` salah (16 < 17), nilai `punyaKupon === true` adalah benar, sehingga blok `if` dijalankan dan mencetak \"Boleh Masuk!\"."
      },
      {
        id: "if-p2",
        title: "Flowchart Percabangan Nilai",
        instruction: "Urutkan logika flowchart untuk menentukan apakah siswa lulus ujian! Kriteria lulus: Nilai >= 70.",
        type: "flowchart_connect",
        difficulty: "Medium",
        xp: 60,
        flowchartNodes: [
          { id: "fn1", text: "Mulai", shape: "start_end", color: "bg-sky-500" },
          { id: "fn2", text: "Input Nilai Siswa", shape: "input_output", color: "bg-indigo-500" },
          { id: "fn3", text: "Apakah Nilai >= 70?", shape: "decision", color: "bg-amber-500" },
          { id: "fn4", text: "Cetak \"LULUS\"", shape: "input_output", color: "bg-emerald-500" },
          { id: "fn5", text: "Cetak \"TIDAK LULUS\"", shape: "input_output", color: "bg-rose-500" },
          { id: "fn6", text: "Selesai", shape: "start_end", color: "bg-sky-500" }
        ],
        correctFlowchartOrder: ["fn1", "fn2", "fn3", "fn4", "fn5", "fn6"], // logic ordering
        explanation: "Algoritma dimulai dari Mulai -> Mengambil input nilai -> Memeriksa kondisi di node decision -> Percabangan ke Lulus (jika True) atau Tidak Lulus (jika False) -> Selesai."
      }
    ]
  },
  {
    id: "level-3",
    title: "Flowchart Logic",
    subtitle: "Peta Alir Pikiran Komputer",
    description: "Memvisualisasikan algoritma secara grafis menggunakan simbol standar internasional sebelum menulis code.",
    difficulty: "Pemula",
    xpReward: 130,
    unlocked: false,
    completed: false,
    iconName: "GitMerge",
    slides: [
      {
        id: "fl-slide-1",
        title: "Bahasa Simbol Flowchart",
        content: "Sebelum koding, programmer menggambar peta jalannya program menggunakan **Flowchart**:\n\n1.  **Oval (Terminator):** Menandakan `Mulai` (Start) atau `Selesai` (End).\n2.  **Jajar Genjang (Input/Output):** Proses membaca data masuk atau mencetak data keluar.\n3.  **Persegi Panjang (Process):** Kalkulasi atau manipulasi data (seperti `x = x + 1`).\n4.  **Belah Ketupat (Decision):** Percabangan kondisi `Ya / Tidak` (If-Else).",
        visualType: "flowchart_builder",
        visualData: {}
      }
    ],
    puzzles: [
      {
        id: "fl-p1",
        title: "Konversi Alur ke Code",
        instruction: "Ada alur flowchart: Mulai -> Input Angka -> Apakah Angka % 2 === 0? -> (YA) Cetak 'Genap' / (TIDAK) Cetak 'Ganjil' -> Selesai. Susun code blok di bawah agar sesuai alur tersebut!",
        type: "block_builder",
        difficulty: "Medium",
        xp: 70,
        blocks: [
          "if (angka % 2 === 0) {",
          "  print('Genap');",
          "} else {",
          "  print('Ganjil');",
          "}"
        ],
        correctBlockOrder: [
          "if (angka % 2 === 0) {",
          "  print('Genap');",
          "} else {",
          "  print('Ganjil');",
          "}"
        ],
        explanation: "Flowchart decision `Angka % 2 === 0?` diterjemahkan menjadi `if (angka % 2 === 0)`. Cabang YA mencetak 'Genap', dan cabang TIDAK (else) mencetak 'Ganjil'."
      }
    ]
  },
  {
    id: "level-4",
    title: "Looping (Perulangan)",
    subtitle: "Menghemat Tenaga Ketik",
    description: "Menginstruksikan komputer untuk mengulang suatu tugas ribuan kali dalam sekejap tanpa lelah menggunakan For dan While.",
    difficulty: "Menengah",
    xpReward: 150,
    unlocked: false,
    completed: false,
    iconName: "RotateCw",
    slides: [
      {
        id: "loop-slide-1",
        title: "Perulangan 'For'",
        content: "Jika kita tahu persis berapa kali kita ingin mengulang kode (misal 10 kali), kita menggunakan loop **For**.\n\nStrukturnya memiliki 3 bagian penting:\n1.  **Inisialisasi (`let i = 1`):** Nilai awal hitungan.\n2.  **Kondisi Batas (`i <= 5`):** Terus jalan SELAMA kondisi ini benar.\n3.  **Langkah (`i++`):** Menambah 1 nilai `i` setelah setiap putaran.\n\n`for (let i = 1; i <= 5; i++) { print(i); }` akan mencetak angka 1 sampai 5!",
        visualType: "loop_wheel",
        visualData: {
          type: "for",
          steps: 5
        }
      },
      {
        id: "loop-slide-2",
        title: "Perulangan 'While'",
        content: "Jika kita tidak tahu berapa kali putaran yang dibutuhkan, tetapi tahu kondisinya (misal: 'putar roda selama baterai belum habis'), kita gunakan loop **While**.\n\nHati-hati! Jika kondisi di dalam `while(kondisi)` selalu bernilai `true`, program akan terjebak dalam **Infinite Loop** (perulangan abadi) yang bisa membuat laptop hang! Kita butuh merubah kondisi di dalam loop.",
        visualType: "loop_wheel",
        visualData: {
          type: "while",
          steps: 4
        }
      }
    ],
    puzzles: [
      {
        id: "loop-p1",
        title: "Kalkulator Akumulasi Loop",
        instruction: "Berapakah output dari kode akumulasi penjumlahan angka berikut ini?",
        type: "output_predictor",
        difficulty: "Medium",
        xp: 75,
        codeSnippet: `let total = 0;
for (let i = 1; i <= 4; i++) {
  total = total + i;
}
print(total);`,
        options: ["4", "10", "6", "15"],
        correctOption: "10",
        explanation: "Loop berputar 4 kali:\n*   Putaran 1 (i=1): `total` jadi 0 + 1 = 1\n*   Putaran 2 (i=2): `total` jadi 1 + 2 = 3\n*   Putaran 3 (i=3): `total` jadi 3 + 3 = 6\n*   Putaran 4 (i=4): `total` jadi 6 + 4 = 10.\nSetelah itu `i` naik jadi 5, kondisi `i <= 4` salah, loop selesai. Output = 10."
      },
      {
        id: "loop-p2",
        title: "Hentikan Infinite Loop!",
        instruction: "Kode di bawah ini mengalami Infinite Loop karena variabel `counter` tidak pernah berubah. Perbaiki baris kodenya!",
        type: "code_bug_fix",
        difficulty: "Hard",
        xp: 75,
        buggyCode: `let counter = 1;
while (counter <= 5) {
  print("Detik ke-" + counter);
  // Ada yang kurang di sini!
}`,
        correctCode: `let counter = 1;
while (counter <= 5) {
  print("Detik ke-" + counter);
  counter++;
}`,
        bugHint: "Tambahkan operator increment `counter++;` di bagian akhir dalam kurung kurawal agar nilai counter bertambah naik setiap putaran dan akhirnya menembus angka 5.",
        explanation: "Dengan menambahkan `counter++;`, nilai counter bertambah 1 di setiap putaran. Pada putaran ke-5, counter diubah menjadi 6, kondisi `counter <= 5` bernilai false, dan loop berhasil berhenti!"
      }
    ]
  },
  {
    id: "level-5",
    title: "Array (Larik)",
    subtitle: "Lemari Laci Bersekat",
    description: "Belajar menyimpan banyak data sekaligus dalam satu nama variabel menggunakan laci berindeks numerik.",
    difficulty: "Menengah",
    xpReward: 160,
    unlocked: false,
    completed: false,
    iconName: "Database",
    slides: [
      {
        id: "arr-slide-1",
        title: "Koleksi Berindeks",
        content: "Jika kita punya 100 nama mahasiswa, tidak mungkin kita membuat variabel `mhs1`, `mhs2`... sampai `mhs100`.\n\nKita gunakan **Array**! Array menyimpan daftar nilai dalam urutan tertentu. \n\n*PENTING:* Komputer selalu mulai menghitung dari angka **0**! Jadi elemen pertama ada di indeks `0`, elemen kedua di indeks `1`, dst.\n\n`let buah = [\"Apel\", \"Pisang\", \"Jeruk\"];` \n`buah[0]` adalah \"Apel\".",
        visualType: "array_train",
        visualData: {
          items: ["Apel 🍎", "Pisang 🍌", "Jeruk 🍊", "Mangga 🥭"]
        }
      }
    ],
    puzzles: [
      {
        id: "arr-p1",
        title: "Akses Laci yang Tepat",
        instruction: "Perhatikan array di bawah. Berapa output dari kode berikut?",
        type: "output_predictor",
        difficulty: "Easy",
        xp: 80,
        codeSnippet: `let angka = [5, 12, 8, 24, 3];
let hasil = angka[1] + angka[4];
print(hasil);`,
        options: ["17", "15", "8", "16"],
        correctOption: "15",
        explanation: "`angka[1]` merujuk ke elemen kedua (indeks 1) yaitu `12`. `angka[4]` merujuk ke elemen kelima (indeks 4) yaitu `3`. Hasil penjumlahannya adalah 12 + 3 = 15."
      }
    ]
  },
  {
    id: "level-6",
    title: "Functions (Fungsi)",
    subtitle: "Pabrik Pemroses Data",
    description: "Membuat blok kode modular yang bisa dipakai berulang-ulang, menerima input (parameter), dan menghasilkan output (return).",
    difficulty: "Lanjutan",
    xpReward: 180,
    unlocked: false,
    completed: false,
    iconName: "Cpu",
    slides: [
      {
        id: "fn-slide-1",
        title: "Mesin Pabrik Cetakan Kode",
        content: "Bayangkan **Function** seperti mesin blender. Kita masukkan buah (Parameter), mesin bekerja memblender (Logika), dan mengeluarkan segelas jus segar (Return Value).\n\nKeuntungan menggunakan function adalah **Don't Repeat Yourself (DRY)**. Kita buat sekali, bisa dipanggil berkali-kali di mana saja!\n\n```\nfunction sapa(nama) {\n  return \"Halo \" + nama;\n}\n```",
        visualType: "function_box",
        visualData: {
          inputs: ["Apel 🍎", "Jeruk 🍊", "Alpukat 🥑"],
          recipes: {
            "Apel 🍎": "Jus Apel Sehat 🥤",
            "Jeruk 🍊": "Jus Jeruk Segar 🥤",
            "Alpukat 🥑": "Jus Alpukat Manis 🥤"
          }
        }
      }
    ],
    puzzles: [
      {
        id: "fn-p1",
        title: "Susun Fungsi Matematika",
        instruction: "Susunlah potongan kode berikut agar membentuk sebuah fungsi utuh yang menerima dua angka lalu mengembalikan hasil perkalian keduanya!",
        type: "block_builder",
        difficulty: "Medium",
        xp: 90,
        blocks: [
          "function kali(a, b) {",
          "  let hasil = a * b;",
          "  return hasil;",
          "}"
        ],
        correctBlockOrder: [
          "function kali(a, b) {",
          "  let hasil = a * b;",
          "  return hasil;",
          "}"
        ],
        explanation: "Fungsi diawali kata kunci `function` diikuti nama fungsi dan parameternya `(a, b)`. Di dalam tubuh fungsi kita hitung perkaliannya, lalu kita wajib mengembalikan nilainya memakai kata kunci `return` agar pemanggil fungsi bisa menggunakan hasilnya."
      }
    ]
  }
];

export const SIMULATION_PROJECTS: SimulationProject[] = [
  {
    id: "proj-cashier",
    title: "Kasir Kantin IT Pintar",
    description: "Buat algoritma pembayaran kasir pintar dengan diskon otomatis dan pengecekan dompet mahasiswa.",
    difficulty: "Muda",
    theme: "cashier",
    objective: "Terapkan diskon 10% jika belanjaan minimal Rp 50.000. Cek apakah uang cukup, hitung kembalian atau tampilkan peringatan jika kurang.",
    xpReward: 200,
    availableBlocks: [
      { id: "cb-c1", code: "let diskon = 0;", label: "let diskon = 0;", category: "variable", indent: 0 },
      { id: "cb-c2", code: "if (totalBelanja >= 50000) {", label: "if (totalBelanja >= 50000) {", category: "control", indent: 0 },
      { id: "cb-c3", code: "  diskon = totalBelanja * 0.1;", label: "  diskon = totalBelanja * 0.1;", category: "action", indent: 1 },
      { id: "cb-c4", code: "}", label: "}", category: "control", indent: 0 },
      { id: "cb-c5", code: "let totalBayar = totalBelanja - diskon;", label: "let totalBayar = totalBelanja - diskon;", category: "variable", indent: 0 },
      { id: "cb-c6", code: "print('Total Bayar: Rp ' + totalBayar);", label: "print('Total Bayar...');", category: "action", indent: 0 },
      { id: "cb-c7", code: "if (uangMahasiswa >= totalBayar) {", label: "if (uangMahasiswa >= totalBayar) {", category: "control", indent: 0 },
      { id: "cb-c8", code: "  let sisa = uangMahasiswa - totalBayar;", label: "  let sisa = uangMahasiswa - totalBayar;", category: "variable", indent: 1 },
      { id: "cb-c9", code: "  print('Sukses! Kembalian: Rp ' + sisa);", label: "  print('Sukses! Kembalian...');", category: "action", indent: 1 },
      { id: "cb-c10", code: "} else {", label: "} else {", category: "control", indent: 0 },
      { id: "cb-c11", code: "  print('Gagal! Uang Kurang');", label: "  print('Gagal! Uang Kurang');", category: "action", indent: 1 },
      { id: "cb-c12", code: "}", label: "}", category: "control", indent: 0 }
    ],
    testCases: [
      {
        input: { totalBelanja: 60000, uangMahasiswa: 100000 },
        expectedOutput: ["Total Bayar: Rp 54000", "Sukses! Kembalian: Rp 46000"],
        description: "Belanja Rp 60.000 (diskon jadi Rp 54.000) bayar dengan Rp 100.000"
      },
      {
        input: { totalBelanja: 40000, uangMahasiswa: 30000 },
        expectedOutput: ["Total Bayar: Rp 40000", "Gagal! Uang Kurang"],
        description: "Belanja Rp 40.000 (tidak diskon) bayar dengan Rp 30.000"
      }
    ],
    simulationVisual: {
      title: "Kantin Digital",
      description: "Lihat nampan makanan bergerak ke mesin kasir dan mencetak struk!",
      initialState: {
        trayPosition: "left", // left, center, scanned
        receiptPrinted: false,
        cashierText: "Siap melayani...",
        statusColor: "text-slate-400",
        animationStage: "idle"
      },
      runStateChange: (inputs: any, outputs: string[]) => {
        const isSuccess = outputs.some(line => line.includes("Sukses!"));
        const hasDiscount = outputs.some(line => line.includes("Total Bayar: Rp 54000"));
        
        return {
          trayPosition: isSuccess ? "scanned" : "center",
          receiptPrinted: isSuccess,
          cashierText: isSuccess 
            ? `Berhasil! ${hasDiscount ? "Kupon Diskon 10% Aktif!" : "Tunai Diterima"}` 
            : "❌ Transaksi Ditolak: Saldo Kurang!",
          statusColor: isSuccess ? "text-emerald-500" : "text-rose-500",
          animationStage: isSuccess ? "success" : "failed"
        };
      }
    }
  },
  {
    id: "proj-smarthome",
    title: "Sistem Pengunci Pintu Pintar",
    description: "Rancang fungsi pengaman pintu otomatis berbasis password tombol dan Face ID.",
    difficulty: "Sedang",
    theme: "smart_home",
    objective: "Lengkapi fungsi 'cekAkses' agar mengembalikan nilai true (pintu terbuka) jika PIN yang dimasukkan adalah '1234' ATAU sensor Face ID bernilai true. Jika tidak keduanya, nyalakan alarm!",
    xpReward: 250,
    availableBlocks: [
      { id: "cb-s1", code: "function cekAkses(pin, faceId) {", label: "function cekAkses(pin, faceId) {", category: "function", indent: 0 },
      { id: "cb-s2", code: "  if (pin === '1234' || faceId === true) {", label: "  if (pin === '1234' || faceId === true) {", category: "control", indent: 1 },
      { id: "cb-s3", code: "    print('Akses Diterima: Selamat Datang!');", label: "    print('Akses Diterima...');", category: "action", indent: 2 },
      { id: "cb-s4", code: "    return true;", label: "    return true;", category: "action", indent: 2 },
      { id: "cb-s5", code: "  } else {", label: "  } else {", category: "control", indent: 1 },
      { id: "cb-s6", code: "    print('AKSES DITOLAK: Alarm Menyala!');", label: "    print('AKSES DITOLAK...');", category: "action", indent: 2 },
      { id: "cb-s7", code: "    return false;", label: "    return false;", category: "action", indent: 2 },
      { id: "cb-s8", code: "  }", label: "  }", category: "control", indent: 1 },
      { id: "cb-s9", code: "}", label: "}", category: "function", indent: 0 }
    ],
    testCases: [
      {
        input: { pin: "1234", faceId: false },
        expectedOutput: ["Akses Diterima: Selamat Datang!"],
        description: "PIN Benar ('1234'), Face ID Salah/Mati"
      },
      {
        input: { pin: "0000", faceId: true },
        expectedOutput: ["Akses Diterima: Selamat Datang!"],
        description: "PIN Salah, Face ID Benar/Dikenali"
      },
      {
        input: { pin: "9999", faceId: false },
        expectedOutput: ["AKSES DITOLAK: Alarm Menyala!"],
        description: "PIN Salah, Face ID Salah/Tidak Dikenal"
      }
    ],
    simulationVisual: {
      title: "Smart Shield Door v1.0",
      description: "Uji coba akses pintu laboratorium server IT!",
      initialState: {
        doorStatus: "locked", // locked, unlocked, alarm
        cameraLaser: "idle",  // scanning, success, alarm
        message: "Menunggu autentikasi...",
        lockColor: "text-sky-400"
      },
      runStateChange: (inputs: any, outputs: string[]) => {
        const isGranted = outputs.some(line => line.includes("Diterima"));
        return {
          doorStatus: isGranted ? "unlocked" : "alarm",
          cameraLaser: isGranted ? "success" : "alarm",
          message: isGranted ? "Akses Diterima! Selamat Datang di Lab IT." : "🚨 PERINGATAN: Penyusup Terdeteksi!",
          lockColor: isGranted ? "text-emerald-500" : "text-rose-500"
        };
      }
    }
  },
  {
    id: "proj-sensor",
    title: "Radar Mobil Otonom (Autonomous Car)",
    description: "Buat algoritma loop sensor ultrasonik mobil otomatis untuk rem darurat.",
    difficulty: "Tantangan",
    theme: "park_sensor",
    objective: "Gunakan perulangan 'while' untuk memeriksa barisan jarak dari radar ultrasonik. Jika terdeteksi jarak < 20 cm, print 'BERHENTI!' dan keluar dari loop (break). Jika aman, print jarak tersebut.",
    xpReward: 300,
    availableBlocks: [
      { id: "cb-b1", code: "let i = 0;", label: "let i = 0;", category: "variable", indent: 0 },
      { id: "cb-b2", code: "while (i < radarJarak.length) {", label: "while (i < radarJarak.length) {", category: "loop", indent: 0 },
      { id: "cb-b3", code: "  let dist = radarJarak[i];", label: "  let dist = radarJarak[i];", category: "variable", indent: 1 },
      { id: "cb-b4", code: "  if (dist < 20) {", label: "  if (dist < 20) {", category: "control", indent: 1 },
      { id: "cb-b5", code: "    print('BERHENTI! Jarak berbahaya: ' + dist + ' cm');", label: "    print('BERHENTI!...');", category: "action", indent: 2 },
      { id: "cb-b6", code: "    break;", label: "    break;", category: "control", indent: 2 },
      { id: "cb-b7", code: "  } else {", label: "  } else {", category: "control", indent: 1 },
      { id: "cb-b8", code: "    print('Aman. Sensor: ' + dist + ' cm');", label: "    print('Aman...');", category: "action", indent: 2 },
      { id: "cb-b9", code: "  }", label: "  }", category: "control", indent: 1 },
      { id: "cb-b10", code: "  i++;", label: "  i++;", category: "action", indent: 1 },
      { id: "cb-b11", code: "}", label: "}", category: "loop", indent: 0 }
    ],
    testCases: [
      {
        input: { radarJarak: [80, 55, 30, 15, 5] },
        expectedOutput: [
          "Aman. Sensor: 80 cm",
          "Aman. Sensor: 55 cm",
          "Aman. Sensor: 30 cm",
          "BERHENTI! Jarak berbahaya: 15 cm"
        ],
        description: "Mobil mundur mendekati tembok, berjarak dari 80cm ke 15cm"
      }
    ],
    simulationVisual: {
      title: "Simulator Sensor Mobil",
      description: "Lihat pergerakan mobil dan garis pemantulan radar secara realtime!",
      initialState: {
        carPosition: "start", // start, moving, stop_safe, stop_emergency
        sensorWaveColor: "border-emerald-500",
        distanceIndicator: "80cm",
        brakeLightOn: false
      },
      runStateChange: (inputs: any, outputs: string[]) => {
        const crashed = outputs.some(line => line.includes("BERHENTI!"));
        return {
          carPosition: crashed ? "stop_emergency" : "stop_safe",
          sensorWaveColor: crashed ? "border-rose-500 animate-ping" : "border-emerald-500",
          distanceIndicator: crashed ? "15cm (BERHENTI)" : "30cm",
          brakeLightOn: crashed
        };
      }
    }
  }
];
