import defaultConfig from './masteryThresholds.json';

export interface MasteryThresholdsConfig {
  goodMin: number; // Mặc định: 85 (>= 85%: Tốt)
  fairMin: number; // Mặc định: 70 (70–84%: Khá)
  passMin: number; // Mặc định: 50 (50–69%: Đạt, < 50%: Cần cố gắng)
  labels: {
    good: string;
    fair: string;
    pass: string;
    needsWork: string;
  };
}

export const DEFAULT_MASTERY_THRESHOLDS: MasteryThresholdsConfig = {
  goodMin: defaultConfig.goodMin ?? 85,
  fairMin: defaultConfig.fairMin ?? 70,
  passMin: defaultConfig.passMin ?? 50,
  labels: {
    good: defaultConfig.labels?.good || 'Tốt',
    fair: defaultConfig.labels?.fair || 'Khá',
    pass: defaultConfig.labels?.pass || 'Đạt',
    needsWork: defaultConfig.labels?.needsWork || 'Cần cố gắng',
  },
};

export function getMasteryThresholds(
  custom?: Partial<MasteryThresholdsConfig>
): MasteryThresholdsConfig {
  if (!custom) return DEFAULT_MASTERY_THRESHOLDS;
  return {
    goodMin: typeof custom.goodMin === 'number' ? custom.goodMin : DEFAULT_MASTERY_THRESHOLDS.goodMin,
    fairMin: typeof custom.fairMin === 'number' ? custom.fairMin : DEFAULT_MASTERY_THRESHOLDS.fairMin,
    passMin: typeof custom.passMin === 'number' ? custom.passMin : DEFAULT_MASTERY_THRESHOLDS.passMin,
    labels: {
      ...DEFAULT_MASTERY_THRESHOLDS.labels,
      ...(custom.labels || {}),
    },
  };
}

/**
 * Trả về nhãn mức độ theo ngưỡng cố định (hoặc ngưỡng giáo viên đã cấu hình):
 * - >= 85%: Tốt
 * - 70–84%: Khá
 * - 50–69%: Đạt
 * - < 50%: Cần cố gắng
 */
export function getMasteryLabel(
  accuracyPercent: number,
  custom?: Partial<MasteryThresholdsConfig>
): string {
  const cfg = getMasteryThresholds(custom);
  const pct = Math.round(accuracyPercent);
  if (pct >= cfg.goodMin) return cfg.labels.good;
  if (pct >= cfg.fairMin) return cfg.labels.fair;
  if (pct >= cfg.passMin) return cfg.labels.pass;
  return cfg.labels.needsWork;
}

/**
 * Trả về màu sắc badge tương ứng với mức độ (đạt chuẩn tương phản WCAG AA)
 */
export function getMasteryBadgeStyle(
  accuracyPercent: number,
  custom?: Partial<MasteryThresholdsConfig>
): { label: string; badgeClass: string } {
  const cfg = getMasteryThresholds(custom);
  const pct = Math.round(accuracyPercent);
  if (pct >= cfg.goodMin) {
    return {
      label: cfg.labels.good,
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    };
  }
  if (pct >= cfg.fairMin) {
    return {
      label: cfg.labels.fair,
      badgeClass: 'bg-sky-100 text-sky-900 border-sky-300',
    };
  }
  if (pct >= cfg.passMin) {
    return {
      label: cfg.labels.pass,
      badgeClass: 'bg-amber-100 text-amber-950 border-amber-300',
    };
  }
  return {
    label: cfg.labels.needsWork,
    badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
  };
}
