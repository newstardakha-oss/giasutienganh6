import jStat from 'jstat';

export interface DescriptiveStats {
  n: number;
  mean: number;
  sd: number;
  median: number;
  mode: number;
  min: number;
  max: number;
}

export interface WelchTTestResult {
  t: number;
  df: number;
  p: number;
  significant: boolean; // p <= 0.05
}

export interface PairedTTestResult {
  t: number;
  df: number;
  p: number;
  meanDiff: number;
  sdDiff: number;
  significant: boolean; // p <= 0.05
}

export type SmdMagnitudeLabel = 'Rất nhỏ' | 'Nhỏ' | 'Trung bình' | 'Lớn' | 'Rất lớn';

export interface SmdResult {
  smd: number;
  label: SmdMagnitudeLabel;
}

export interface SplitHalfReliabilityResult {
  nStudents: number;
  rHalf: number; // Pearson r giữa điểm câu lẻ và câu chẵn
  spearmanBrown: number; // 2 * rHalf / (1 + rHalf)
  isReliable: boolean; // >= 0.7
  oddScores: number[];
  evenScores: number[];
}

export interface ItemPsychometricsRow {
  itemId: string;
  itemNumber: number;
  unit: number;
  skill: 'grammar' | 'vocab';
  grammarPointId: string | null;
  promptPreview: string;
  totalResponses: number;
  correctCount: number;
  difficultyRatio: number; // 0..1
  difficultyPct: number; // 0..100
  discriminationIndex: number; // -1..1 (Upper 27% - Lower 27%)
  topDistractor: string | null;
  topDistractorCount: number;
  flags: Array<'too_easy' | 'too_hard' | 'poor_discrimination'>;
  flagLabels: string[];
}

export interface ResearchComparisonSummary {
  tnPre: DescriptiveStats;
  dcPre: DescriptiveStats;
  tnPost: DescriptiveStats;
  dcPost: DescriptiveStats;
  preWelch: WelchTTestResult;
  postWelch: WelchTTestResult;
  tnPaired: PairedTTestResult;
  dcPaired: PairedTTestResult;
  smd: SmdResult;
  conclusionText: string;
}

/**
 * Tính các đại lượng thống kê mô tả cho một mảng điểm số.
 */
export function computeDescriptiveStats(values: readonly number[]): DescriptiveStats {
  if (!values || values.length === 0) {
    return { n: 0, mean: 0, sd: 0, median: 0, mode: 0, min: 0, max: 0 };
  }
  const arr = [...values];
  const n = arr.length;
  const meanVal = jStat.mean(arr);
  const sdVal = n > 1 ? jStat.stdev(arr, true) : 0;
  const medVal = jStat.median(arr);
  const modeVal = jStat.mode(arr);
  const minVal = Math.min(...arr);
  const maxVal = Math.max(...arr);
  return {
    n,
    mean: meanVal,
    sd: sdVal,
    median: medVal,
    mode: modeVal,
    min: minVal,
    max: maxVal,
  };
}

/**
 * Kiểm định T-test độc lập hai mẫu với phương sai không bằng nhau (Welch's t-test),
 * tương đương công thức `=TTEST(group1; group2; 2; 3)` trong Excel và `scipy.stats.ttest_ind(..., equal_var=False)`.
 */
export function welchIndependentTTest(
  group1: readonly number[],
  group2: readonly number[]
): WelchTTestResult {
  const n1 = group1.length;
  const n2 = group2.length;
  if (n1 < 2 || n2 < 2) {
    return { t: 0, df: 0, p: 1, significant: false };
  }

  const m1 = jStat.mean(group1);
  const m2 = jStat.mean(group2);
  const v1 = jStat.variance(group1, true);
  const v2 = jStat.variance(group2, true);

  const se1 = v1 / n1;
  const se2 = v2 / n2;
  const seSum = se1 + se2;
  if (seSum === 0) {
    const pSame = m1 === m2 ? 1 : 0;
    return { t: 0, df: n1 + n2 - 2, p: pSame, significant: pSame <= 0.05 };
  }

  const t = (m1 - m2) / Math.sqrt(seSum);
  const dfNum = seSum * seSum;
  const dfDen = (se1 * se1) / (n1 - 1) + (se2 * se2) / (n2 - 1);
  const df = dfDen > 0 ? dfNum / dfDen : n1 + n2 - 2;

  const p = jStat.ttest(t, df, 2);
  return {
    t,
    df,
    p,
    significant: p <= 0.05,
  };
}

/**
 * Kiểm định T-test phụ thuộc (cặp) hai phía,
 * tương đương công thức `=TTEST(pre; post; 2; 1)` trong Excel và `scipy.stats.ttest_rel(post, pre)`.
 */
export function pairedTTest(
  pre: readonly number[],
  post: readonly number[]
): PairedTTestResult {
  const n = Math.min(pre.length, post.length);
  if (n < 2) {
    return { t: 0, df: 0, p: 1, meanDiff: 0, sdDiff: 0, significant: false };
  }

  const diffs: number[] = [];
  for (let i = 0; i < n; i++) {
    diffs.push(post[i] - pre[i]);
  }

  const meanDiff = jStat.mean(diffs);
  const sdDiff = jStat.stdev(diffs, true);
  if (sdDiff === 0) {
    const pSame = meanDiff === 0 ? 1 : 0;
    return {
      t: 0,
      df: n - 1,
      p: pSame,
      meanDiff,
      sdDiff: 0,
      significant: pSame <= 0.05,
    };
  }

  const t = meanDiff / (sdDiff / Math.sqrt(n));
  const df = n - 1;
  const p = jStat.ttest(t, df, 2);
  return {
    t,
    df,
    p,
    meanDiff,
    sdDiff,
    significant: p <= 0.05,
  };
}

/**
 * Tính mức độ ảnh hưởng chuẩn hoá SMD (Standardized Mean Difference) theo hướng dẫn NCKHSPƯD:
 * SMD = (Điểm TB của TN sau − Điểm TB của ĐC sau) / Độ lệch chuẩn của ĐC sau.
 */
export function computeSmd(
  tnPost: readonly number[],
  dcPost: readonly number[]
): SmdResult {
  if (tnPost.length === 0 || dcPost.length < 2) {
    return { smd: 0, label: 'Rất nhỏ' };
  }
  const meanTn = jStat.mean(tnPost);
  const meanDc = jStat.mean(dcPost);
  const sdDc = jStat.stdev(dcPost, true);
  const smd = sdDc > 0 ? (meanTn - meanDc) / sdDc : 0;
  const absSmd = Math.abs(smd);

  let label: SmdMagnitudeLabel = 'Rất nhỏ';
  if (absSmd > 1.0) {
    label = 'Rất lớn';
  } else if (absSmd >= 0.8) {
    label = 'Lớn';
  } else if (absSmd >= 0.5) {
    label = 'Trung bình';
  } else if (absSmd >= 0.2) {
    label = 'Nhỏ';
  } else {
    label = 'Rất nhỏ';
  }

  return { smd, label };
}

/**
 * Định dạng số theo chuẩn tiếng Việt (dùng dấu phẩy thập phân) cho câu kết luận SKKN.
 */
export function formatViNumber(num: number, decimals = 3): string {
  if (!Number.isFinite(num)) return '0';
  return num.toFixed(decimals).replace('.', ',');
}

/**
 * Tổng hợp toàn bộ bảng so sánh Trước – Sau của nhóm Thực nghiệm (TN) và Đối chứng (ĐC)
 * kèm câu kết luận tự sinh chuẩn NCKHSPƯD.
 */
export function buildResearchComparisonSummary(params: {
  tnPre: readonly number[];
  dcPre: readonly number[];
  tnPost: readonly number[];
  dcPost: readonly number[];
}): ResearchComparisonSummary {
  const tnPreStats = computeDescriptiveStats(params.tnPre);
  const dcPreStats = computeDescriptiveStats(params.dcPre);
  const tnPostStats = computeDescriptiveStats(params.tnPost);
  const dcPostStats = computeDescriptiveStats(params.dcPost);

  const preWelch = welchIndependentTTest(params.tnPre, params.dcPre);
  const postWelch = welchIndependentTTest(params.tnPost, params.dcPost);
  const tnPaired = pairedTTest(params.tnPre, params.tnPost);
  const dcPaired = pairedTTest(params.dcPre, params.dcPost);
  const smd = computeSmd(params.tnPost, params.dcPost);

  const preComp =
    preWelch.p > 0.05
      ? `Trước tác động p = ${formatViNumber(preWelch.p, 3)} > 0,05: hai nhóm tương đương.`
      : `Trước tác động p = ${formatViNumber(preWelch.p, 3)} ≤ 0,05: hai nhóm có sự chênh lệch ở đầu vào.`;

  const postComp =
    postWelch.p <= 0.05
      ? `Sau tác động p = ${formatViNumber(postWelch.p, 3)} < 0,05: chênh lệch có ý nghĩa, không phải do ngẫu nhiên.`
      : `Sau tác động p = ${formatViNumber(postWelch.p, 3)} > 0,05: chênh lệch chưa có ý nghĩa thống kê.`;

  const smdComp = `SMD = ${formatViNumber(smd.smd, 2)}: mức độ ảnh hưởng ${smd.label.toLowerCase()}.`;

  return {
    tnPre: tnPreStats,
    dcPre: dcPreStats,
    tnPost: tnPostStats,
    dcPost: dcPostStats,
    preWelch,
    postWelch,
    tnPaired,
    dcPaired,
    smd,
    conclusionText: `${preComp} ${postComp} ${smdComp}`,
  };
}

/**
 * Tính độ tin cậy của đề kiểm tra theo phương pháp chia đôi câu lẻ / câu chẵn (Split-Half)
 * và hiệu chỉnh bằng công thức Spearman-Brown: r_SB = 2 * r_half / (1 + r_half).
 */
export function computeSplitHalfReliability(
  orderedItemIds: readonly string[],
  attemptResponses: ReadonlyArray<Record<string, { correct?: boolean }>>
): SplitHalfReliabilityResult {
  if (attemptResponses.length < 2 || orderedItemIds.length < 2) {
    return {
      nStudents: attemptResponses.length,
      rHalf: 0,
      spearmanBrown: 0,
      isReliable: false,
      oddScores: [],
      evenScores: [],
    };
  }

  const oddScores: number[] = [];
  const evenScores: number[] = [];

  for (const respMap of attemptResponses) {
    let odd = 0;
    let even = 0;
    orderedItemIds.forEach((itemId, idx) => {
      const isCorrect = Boolean(respMap[itemId]?.correct);
      // Câu thứ 1, 3, 5... (idx chẵn 0, 2, 4...) là câu lẻ; câu thứ 2, 4, 6... (idx lẻ 1, 3, 5...) là câu chẵn
      if ((idx + 1) % 2 === 1) {
        if (isCorrect) odd += 0.25;
      } else {
        if (isCorrect) even += 0.25;
      }
    });
    oddScores.push(odd);
    evenScores.push(even);
  }

  const rHalf = jStat.corrcoeff(oddScores, evenScores);
  const spearmanBrown =
    Number.isFinite(rHalf) && 1 + rHalf !== 0 ? (2 * rHalf) / (1 + rHalf) : 0;

  return {
    nStudents: attemptResponses.length,
    rHalf: Number.isFinite(rHalf) ? rHalf : 0,
    spearmanBrown,
    isReliable: spearmanBrown >= 0.7,
    oddScores,
    evenScores,
  };
}

/**
 * Phân tích tâm lý học đo lường (Item Analysis) cho từng câu hỏi trong đề kiểm tra:
 * - Độ khó (% học sinh làm đúng)
 * - Độ phân biệt D (so nhóm 27% điểm cao nhất với 27% điểm thấp nhất)
 * - Cảnh báo: Quá dễ (> 90%), Quá khó (< 20%), Phân biệt kém (< 0,2)
 * - Phương án sai được chọn nhiều nhất
 */
export function computeItemPsychometrics(
  items: ReadonlyArray<{
    id: string;
    unit: number;
    skill: 'grammar' | 'vocab';
    grammarPointId: string | null;
    prompt?: string;
    tokens?: string[];
  }>,
  attempts: ReadonlyArray<{
    score10: number;
    responses: Record<string, { answer: string; correct?: boolean }>;
  }>
): ItemPsychometricsRow[] {
  const n = attempts.length;
  const sortedAttempts = [...attempts].sort((a, b) => b.score10 - a.score10);
  const k27 = n > 0 ? Math.max(1, Math.round(n * 0.27)) : 0;
  const upperGroup = sortedAttempts.slice(0, k27);
  const lowerGroup = sortedAttempts.slice(Math.max(0, n - k27));

  return items.map((item, idx) => {
    let correctCount = 0;
    const wrongCounts = new Map<string, number>();

    for (const att of attempts) {
      const r = att.responses[item.id];
      if (r?.correct) {
        correctCount++;
      } else if (r && r.answer && r.answer.trim()) {
        const ans = r.answer.trim();
        wrongCounts.set(ans, (wrongCounts.get(ans) || 0) + 1);
      }
    }

    const difficultyRatio = n > 0 ? correctCount / n : 0;
    const difficultyPct = Math.round(difficultyRatio * 1000) / 10;

    let upperCorrect = 0;
    for (const att of upperGroup) {
      if (att.responses[item.id]?.correct) upperCorrect++;
    }
    let lowerCorrect = 0;
    for (const att of lowerGroup) {
      if (att.responses[item.id]?.correct) lowerCorrect++;
    }

    const pUpper = k27 > 0 ? upperCorrect / k27 : 0;
    const pLower = k27 > 0 ? lowerCorrect / k27 : 0;
    const discriminationIndex = Math.round((pUpper - pLower) * 1000) / 1000;

    let topDistractor: string | null = null;
    let topDistractorCount = 0;
    for (const [ans, cnt] of wrongCounts.entries()) {
      if (cnt > topDistractorCount) {
        topDistractor = ans;
        topDistractorCount = cnt;
      }
    }

    const flags: Array<'too_easy' | 'too_hard' | 'poor_discrimination'> = [];
    const flagLabels: string[] = [];
    if (n > 0) {
      if (difficultyRatio > 0.9) {
        flags.push('too_easy');
        flagLabels.push('Quá dễ (> 90%)');
      }
      if (difficultyRatio < 0.2) {
        flags.push('too_hard');
        flagLabels.push('Quá khó (< 20%)');
      }
      if (discriminationIndex < 0.2) {
        flags.push('poor_discrimination');
        flagLabels.push('Phân biệt kém (< 0,2)');
      }
    }

    return {
      itemId: item.id,
      itemNumber: idx + 1,
      unit: item.unit,
      skill: item.skill,
      grammarPointId: item.grammarPointId,
      promptPreview: item.prompt || (item.tokens ? item.tokens.join(' / ') : item.id),
      totalResponses: n,
      correctCount,
      difficultyRatio,
      difficultyPct,
      discriminationIndex,
      topDistractor,
      topDistractorCount,
      flags,
      flagLabels,
    };
  });
}
