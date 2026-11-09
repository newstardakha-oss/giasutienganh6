/**
 * TypeScript port of grammar-g6/tools/build_tests.py with bit-exact CPython random.Random(2026) (MT19937).
 * Chạy: npx tsx grammar-g6/tools/build_tests.ts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO = path.resolve(__dirname, '../..');

/**
 * Bit-exact CPython `random.Random` (Mersenne Twister MT19937)
 */
class PythonRandom {
  private mt = new Uint32Array(624);
  private index = 624;

  constructor(seed: number) {
    this.seed(seed);
  }

  private initGenrand(s: number) {
    this.mt[0] = s >>> 0;
    for (let mti = 1; mti < 624; mti++) {
      const prev = this.mt[mti - 1];
      this.mt[mti] = (Math.imul(1812433253, prev ^ (prev >>> 30)) + mti) >>> 0;
    }
    this.index = 624;
  }

  seed(n: number) {
    // CPython init_by_array with key = [abs(n)] for small positive integer
    const initKey = [n >>> 0];
    const keyLength = initKey.length;
    this.initGenrand(19650218);
    let i = 1;
    let j = 0;
    for (let k = Math.max(624, keyLength); k > 0; k--) {
      const prev = this.mt[i - 1];
      const x = (this.mt[i] ^ Math.imul(prev ^ (prev >>> 30), 1664525)) >>> 0;
      this.mt[i] = (x + initKey[j] + j) >>> 0;
      i++;
      j++;
      if (i >= 624) {
        this.mt[0] = this.mt[623];
        i = 1;
      }
      if (j >= keyLength) j = 0;
    }
    for (let k = 623; k > 0; k--) {
      const prev = this.mt[i - 1];
      const x = (this.mt[i] ^ Math.imul(prev ^ (prev >>> 30), 1566083941)) >>> 0;
      this.mt[i] = (x - i) >>> 0;
      i++;
      if (i >= 624) {
        this.mt[0] = this.mt[623];
        i = 1;
      }
    }
    this.mt[0] = 0x80000000;
  }

  genrandUint32(): number {
    let y: number;
    const mag01 = [0x0, 0x9908b0df];
    if (this.index >= 624) {
      let kk = 0;
      for (; kk < 624 - 397; kk++) {
        y = ((this.mt[kk] & 0x80000000) | (this.mt[kk + 1] & 0x7fffffff)) >>> 0;
        this.mt[kk] = (this.mt[kk + 397] ^ (y >>> 1) ^ mag01[y & 0x1]) >>> 0;
      }
      for (; kk < 623; kk++) {
        y = ((this.mt[kk] & 0x80000000) | (this.mt[kk + 1] & 0x7fffffff)) >>> 0;
        this.mt[kk] = (this.mt[kk + (397 - 624)] ^ (y >>> 1) ^ mag01[y & 0x1]) >>> 0;
      }
      y = ((this.mt[623] & 0x80000000) | (this.mt[0] & 0x7fffffff)) >>> 0;
      this.mt[623] = (this.mt[396] ^ (y >>> 1) ^ mag01[y & 0x1]) >>> 0;
      this.index = 0;
    }
    y = this.mt[this.index++];
    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;
    return y >>> 0;
  }

  random(): number {
    const a = this.genrandUint32() >>> 5;
    const b = this.genrandUint32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  }

  getrandbits(k: number): number {
    if (k <= 0) return 0;
    return this.genrandUint32() >>> (32 - k);
  }

  randbelow(n: number): number {
    if (n <= 0) return 0;
    const k = 32 - Math.clz32(n); // n.bit_length()
    let r = this.getrandbits(k);
    while (r >= n) {
      r = this.getrandbits(k);
    }
    return r;
  }

  shuffle<T>(x: T[]): void {
    for (let i = x.length - 1; i >= 1; i--) {
      const j = this.randbelow(i + 1);
      const tmp = x[i];
      x[i] = x[j];
      x[j] = tmp;
    }
  }

  sample<T>(population: readonly T[], k: number): T[] {
    const n = population.length;
    if (k < 0 || k > n) throw new Error('Sample larger than population or is negative');
    const result: T[] = new Array(k);
    let setsize = 21;
    if (k > 5) {
      setsize += Math.pow(4, Math.ceil(Math.log(k * 3) / Math.log(4)));
    }
    if (n <= setsize) {
      const pool = [...population];
      for (let i = 0; i < k; i++) {
        const j = this.randbelow(n - i);
        result[i] = pool[j];
        pool[j] = pool[n - i - 1];
      }
    } else {
      const selected = new Set<number>();
      for (let i = 0; i < k; i++) {
        let j = this.randbelow(n);
        while (selected.has(j)) {
          j = this.randbelow(n);
        }
        selected.add(j);
        result[i] = population[j];
      }
    }
    return result;
  }
}

const SEED = 2026;
const N_MCQ = 24;
const N_GAP = 8;
const N_VOC = 8;

const SEMESTERS: Record<string, { title: string; units: number[] }> = {
  hk1: { title: 'Học kì 1 (Unit 1–6)', units: [1, 2, 3, 4, 5, 6] },
  hk2: { title: 'Học kì 2 (Unit 7–12)', units: [7, 8, 9, 10, 11, 12] },
};

interface VocabEntry {
  word: string;
  meaning: string;
  type: string;
}

function loadVocab(): Map<number, VocabEntry[]> {
  const vocab = new Map<number, VocabEntry[]>();
  for (let n = 1; n <= 12; n++) {
    const f = path.join(REPO, `src/data/unit${n}_vocab.json`);
    if (fs.existsSync(f)) {
      const raw = JSON.parse(fs.readFileSync(f, 'utf-8')) as Array<{
        word: string;
        meaning: string;
        type?: string;
      }>;
      vocab.set(
        n,
        raw.map((v) => ({ word: v.word, meaning: v.meaning, type: v.type || '' }))
      );
    }
  }
  const ts = fs.readFileSync(path.join(REPO, 'src/services/vocabService.ts'), 'utf-8');
  const pat = /\{\s*id:\s*'u(\d+)-\d+',\s*word:\s*'([^']+)'.*?type:\s*'([^']*)',\s*meaning:\s*'([^']+)'/g;
  let m: RegExpExecArray | null;
  while ((m = pat.exec(ts)) !== null) {
    const n = Number(m[1]);
    const word = m[2];
    const type = m[3];
    const meaning = m[4];
    if (!vocab.has(n) || n === 1 || n === 10) {
      if (!vocab.has(n)) vocab.set(n, []);
      const list = vocab.get(n)!;
      if ((n === 1 || n === 10) && !list.some((v) => v.word === word)) {
        list.push({ word, meaning, type });
      }
    }
  }
  return vocab;
}

function vocabItems(units: number[], vocab: Map<number, VocabEntry[]>, rng: PythonRandom) {
  const pool: any[] = [];
  for (const n of units) {
    const rawWords = vocab.get(n) || [];
    let words = rawWords.filter((v) => {
      const parts = v.word.trim().split(/\s+/).filter(Boolean);
      return parts.length >= 1 && parts.length <= 3;
    });
    const seenM = new Map<string, number>();
    for (const v of words) {
      const k = v.meaning.toLowerCase();
      seenM.set(k, (seenM.get(k) || 0) + 1);
    }
    words = words.filter((v) => seenM.get(v.meaning.toLowerCase()) === 1);
    rng.shuffle(words);
    for (const v of words.slice(0, 6)) {
      const vMeanings = new Set(v.meaning.toLowerCase().split(', '));
      let same = words.filter((w) => {
        if (w.word === v.word || w.type !== v.type) return false;
        const wMeanings = w.meaning.toLowerCase().split(', ');
        return !wMeanings.some((wm) => vMeanings.has(wm));
      });
      if (same.length < 3) {
        same = words.filter((w) => w.word !== v.word);
      }
      if (same.length < 3) continue;
      const opts = [v.word, ...rng.sample(same, 3).map((w) => w.word)];
      rng.shuffle(opts);
      const slug = v.word
        .toLowerCase()
        .replace(/[^a-z]+/g, '-')
        .replace(/^-+|-+$/g, '');
      pool.push({
        unit: n,
        id: `voc-u${n}-${slug}`,
        type: 'mcq',
        skill: 'vocab',
        grammarPointId: null,
        prompt: `Từ nào có nghĩa là “${v.meaning}”?`,
        options: opts,
        answerIndex: opts.indexOf(v.word),
        explanation: `${v.word} = ${v.meaning}`,
      });
    }
  }
  return pool;
}

function grammarPool(G: any, units: number[]): Map<string, any[]> {
  const pool = new Map<string, any[]>();
  const unitSet = new Set(units);
  for (const u of G.units) {
    if (!unitSet.has(u.number)) continue;
    for (const s of u.exerciseSets) {
      const kind = s.type;
      const instr = s.instruction;
      if (kind !== 'mcq' && kind !== 'gap' && kind !== 'reorder') continue;
      if (instr && instr.includes('Bảng')) continue;
      for (const it of s.items) {
        if (kind === 'mcq' && (it.options.length < 3 || it.prompt.length > 160)) continue;
        if (kind === 'gap' && it.blanks.length !== 1) continue;
        const item: any = {
          ...it,
          unit: u.number,
          level: s.level,
          type: kind,
          skill: 'grammar',
          grammarPointId: s.grammarPointId,
          instruction: s.title,
        };
        if (instr) item.wordBank = instr;
        if (!pool.has(s.grammarPointId)) pool.set(s.grammarPointId, []);
        pool.get(s.grammarPointId)!.push(item);
      }
    }
  }
  return pool;
}

function splitAb<K>(poolByKey: Map<K, any[]>, nEach: number, rng: PythonRandom): [any[], any[]] {
  for (const [, lst] of poolByKey.entries()) {
    lst.sort((x, y) => {
      const lvDiff = (x.level ?? 0) - (y.level ?? 0);
      if (lvDiff !== 0) return lvDiff;
      return x.id < y.id ? -1 : x.id > y.id ? 1 : 0;
    });
  }
  const A: any[] = [];
  const B: any[] = [];
  const byKey = new Map<K, number>();
  const byUnit = new Map<number, number>();
  let flip = false;

  while (A.length < nEach) {
    const ok: K[] = [];
    for (const [k, lst] of poolByKey.entries()) {
      if (lst.length >= 2) ok.push(k);
    }
    if (ok.length === 0) break;

    let bestK = ok[0];
    let bestTuple: [number, number, number] | null = null;
    for (const k of ok) {
      const lst = poolByKey.get(k)!;
      const t0 = byKey.get(k) || 0;
      const t1 = byUnit.get(lst[0].unit) || 0;
      const t2 = rng.random();
      if (
        !bestTuple ||
        t0 < bestTuple[0] ||
        (t0 === bestTuple[0] && t1 < bestTuple[1]) ||
        (t0 === bestTuple[0] && t1 === bestTuple[1] && t2 < bestTuple[2])
      ) {
        bestTuple = [t0, t1, t2];
        bestK = k;
      }
    }

    const lst = poolByKey.get(bestK)!;
    let a = lst.shift()!;
    let b = lst.shift()!;
    if (flip) {
      const tmp = a;
      a = b;
      b = tmp;
    }
    flip = !flip;
    A.push(a);
    B.push(b);
    byKey.set(bestK, (byKey.get(bestK) || 0) + 1);
    byUnit.set(a.unit, (byUnit.get(a.unit) || 0) + 1);
  }

  return [A, B];
}

function main() {
  const G = JSON.parse(
    fs.readFileSync(path.join(REPO, 'grammar-g6/data/grammar_g6.json'), 'utf-8')
  );
  const rng = new PythonRandom(SEED);
  const vocab = loadVocab();

  const out: any = {
    version: '1.0.0',
    seed: SEED,
    blueprint: {
      grammar: N_MCQ + N_GAP,
      vocab: N_VOC,
      totalItems: N_MCQ + N_GAP + N_VOC,
      durationMinutes: 40,
      maxScore: 10,
    },
    tests: [],
    reservedItemIds: [],
  };

  for (const [key, sem] of Object.entries(SEMESTERS)) {
    const [mA, mB] = splitAb(grammarPool(G, sem.units), N_MCQ + N_GAP, rng);
    const vp = new Map<number, any[]>();
    for (const it of vocabItems(sem.units, vocab, rng)) {
      if (!vp.has(it.unit)) vp.set(it.unit, []);
      vp.get(it.unit)!.push(it);
    }
    const [vA, vB] = splitAb(vp, N_VOC, rng);

    for (const [form, items] of [
      ['A', [...mA, ...vA]],
      ['B', [...mB, ...vB]],
    ] as const) {
      if (items.length !== N_MCQ + N_GAP + N_VOC) {
        console.error(`✗ ${key}-${form}: chỉ có ${items.length} câu`);
        process.exit(1);
      }
      for (const it of items) {
        delete it.level;
      }
      const byUnit: Record<string, number> = {};
      for (const n of sem.units) {
        byUnit[String(n)] = items.filter((x) => x.unit === n).length;
      }
      const gps = Array.from(
        new Set(items.filter((x) => x.grammarPointId).map((x) => x.grammarPointId as string))
      ).sort();
      const byGrammarPoint: Record<string, number> = {};
      for (const gp of gps) {
        byGrammarPoint[gp] = items.filter((x) => x.grammarPointId === gp).length;
      }

      out.tests.push({
        id: `${key}-${form}`,
        semester: key,
        title: `Bài kiểm tra ${sem.title} – Đề ${form}`,
        form,
        units: sem.units,
        items,
        coverage: {
          byUnit,
          byGrammarPoint,
        },
      });
      out.reservedItemIds.push(
        ...items.filter((x) => x.skill === 'grammar').map((x) => x.id as string)
      );
    }
  }

  const outJson = JSON.stringify(out, null, 2);
  const outPath1 = path.join(REPO, 'grammar-g6/data/test_forms.json');
  const outPath2 = path.join(REPO, 'src/data/test_forms.json');
  fs.writeFileSync(outPath1, outJson, 'utf-8');
  fs.writeFileSync(outPath2, outJson, 'utf-8');

  for (const t of out.tests) {
    console.log(
      `✓ ${t.id}: ${t.items.length} câu · theo Unit ${JSON.stringify(
        t.coverage.byUnit
      )} · ${Object.keys(t.coverage.byGrammarPoint).length} điểm ngữ pháp`
    );
  }
  console.log(
    `  ${out.reservedItemIds.length} câu ngữ pháp được giữ riêng cho đề kiểm tra → grammar-g6/data/test_forms.json & src/data/test_forms.json`
  );
}

main();
