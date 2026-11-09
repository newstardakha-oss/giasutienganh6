/**
 * jStat - JavaScript Statistical Library (TypeScript / ES Module)
 * Implements Lanczos gammaln, Lentz continued-fraction ibetainc, Student's t-distribution
 * (studentt.cdf, studentt.pdf), Welch's & Student's t-tests, descriptive statistics, and Pearson correlation.
 */

export function gammaln(x: number): number {
  let j = 0;
  const cof = [
    76.18009172947146,
    -86.50532032941677,
    24.01409824083091,
    -1.231739572450155,
    0.1208650973866179e-2,
    -0.5395239384953e-5,
  ];
  let ser = 1.000000000190015;
  let xx: number;
  let y: number;
  let tmp: number;
  tmp = (y = xx = x) + 5.5;
  tmp -= (xx + 0.5) * Math.log(tmp);
  for (; j < 6; j++) {
    ser += cof[j] / ++y;
  }
  return Math.log((2.5066282746310005 * ser) / xx) - tmp;
}

export function betaln(x: number, y: number): number {
  return gammaln(x) + gammaln(y) - gammaln(x + y);
}

export function betacf(x: number, a: number, b: number): number {
  const fpmin = 1e-30;
  let m = 1;
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;
  let m2: number;
  let aa: number;
  let del: number;
  let h: number;

  if (Math.abs(d) < fpmin) d = fpmin;
  d = 1 / d;
  h = d;

  for (; m <= 200; m++) {
    m2 = 2 * m;
    aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < fpmin) d = fpmin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpmin) c = fpmin;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < fpmin) d = fpmin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpmin) c = fpmin;
    d = 1 / d;
    del = d * c;
    h *= del;
    if (Math.abs(del - 1.0) < 3e-14) break;
  }

  return h;
}

export function ibetainc(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bt = Math.exp(
    gammaln(a + b) - gammaln(a) - gammaln(b) + a * Math.log(x) + b * Math.log(1 - x)
  );
  if (x < (a + 1) / (a + b + 2)) {
    return (bt * betacf(x, a, b)) / a;
  }
  return 1 - (bt * betacf(1 - x, b, a)) / b;
}

export const studentt = {
  pdf(x: number, dof: number): number {
    const d = dof > 1e100 ? 1e100 : dof;
    return (
      (1 / (Math.sqrt(d) * Math.exp(betaln(0.5, d / 2)))) *
      Math.pow(1 + (x * x) / d, -(d + 1) / 2)
    );
  },
  cdf(x: number, dof: number): number {
    if (!Number.isFinite(dof) || dof <= 0) return NaN;
    if (x === 0) return 0.5;
    const t2 = x * x;
    const p = 0.5 * ibetainc(dof / (dof + t2), dof / 2, 0.5);
    return x > 0 ? 1 - p : p;
  },
};

export function sum(arr: readonly number[]): number {
  let s = 0;
  for (let i = 0; i < arr.length; i++) s += arr[i];
  return s;
}

export function mean(arr: readonly number[]): number {
  if (!arr || arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

export function variance(arr: readonly number[], flag = true): number {
  if (!arr || arr.length <= (flag ? 1 : 0)) return 0;
  const m = mean(arr);
  let s = 0;
  for (let i = 0; i < arr.length; i++) {
    const d = arr[i] - m;
    s += d * d;
  }
  return s / (arr.length - (flag ? 1 : 0));
}

export function stdev(arr: readonly number[], flag = true): number {
  return Math.sqrt(variance(arr, flag));
}

export function median(arr: readonly number[]): number {
  if (!arr || arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function mode(arr: readonly number[]): number {
  if (!arr || arr.length === 0) return 0;
  const counts = new Map<number, number>();
  let maxCount = 0;
  for (const v of arr) {
    const c = (counts.get(v) || 0) + 1;
    counts.set(v, c);
    if (c > maxCount) maxCount = c;
  }
  const modes: number[] = [];
  for (const [k, c] of counts.entries()) {
    if (c === maxCount) modes.push(k);
  }
  modes.sort((a, b) => a - b);
  return modes[0] ?? 0;
}

export function corrcoeff(arr1: readonly number[], arr2: readonly number[]): number {
  if (!arr1 || !arr2 || arr1.length !== arr2.length || arr1.length < 2) return 0;
  const n = arr1.length;
  const m1 = mean(arr1);
  const m2 = mean(arr2);
  let num = 0;
  let d1 = 0;
  let d2 = 0;
  for (let i = 0; i < n; i++) {
    const x = arr1[i] - m1;
    const y = arr2[i] - m2;
    num += x * y;
    d1 += x * x;
    d2 += y * y;
  }
  const denom = Math.sqrt(d1 * d2);
  return denom === 0 ? 0 : num / denom;
}

export function ttest(tscore: number, df: number, sides: 1 | 2 = 2): number {
  const cdf = studentt.cdf(-Math.abs(tscore), df);
  return sides === 2 ? 2 * cdf : cdf;
}

export const jStat = {
  gammaln,
  betaln,
  betacf,
  ibetainc,
  studentt,
  sum,
  mean,
  variance,
  stdev,
  median,
  mode,
  corrcoeff,
  ttest,
};

export default jStat;
