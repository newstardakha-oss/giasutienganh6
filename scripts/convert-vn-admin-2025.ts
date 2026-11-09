/**
 * Script chuyển đổi danh mục hành chính chính thức (34 tỉnh/thành & toàn bộ xã/phường/đặc khu từ 01/07/2025)
 * sang đúng định dạng JSON của `src/data/vn_admin_2025.json`.
 *
 * Hỗ trợ các định dạng đầu vào:
 *  - Excel (.xlsx) - tự giải nén và đọc XML bằng jszip
 *  - CSV / TSV (.csv, .tsv) - tự nhận diện dấu phân cách (`,`, `;`, `\t`) và cột Tỉnh / Xã-Phường
 *  - JSON (.json) - mảng phẳng `[{ province, commune }, ...]`, object `{ "Thành phố Hà Nội": [...] }`, hoặc `{ provinces: [...] }`
 *  - Text (.txt) - định dạng dòng `Tỉnh | Xã/Phường` hoặc phân nhóm theo tiêu đề Tỉnh
 *
 * Cách chạy:
 *   npx tsx scripts/convert-vn-admin-2025.ts <duong-dan-file-nguon> [--out src/data/vn_admin_2025.json] [--merge]
 */

import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

export interface VnAdminProvinceEntry {
  code: string;
  name: string;
  communes: string[];
}

export interface VnAdminCatalog2025 {
  version: string;
  description: string;
  provinces: VnAdminProvinceEntry[];
}

/**
 * Danh mục chuẩn 34 tỉnh/thành phố trực thuộc Trung ương từ 01/07/2025
 * (kèm ánh xạ các tỉnh trước sáp nhập để tự động gộp nếu file nguồn còn tên tỉnh cũ)
 */
export const CANONICAL_34_PROVINCES: Array<{
  code: string;
  name: string;
  aliases: string[];
}> = [
  { code: 'P01', name: 'Thành phố Hà Nội', aliases: ['ha noi', 'tp ha noi', 'thanh pho ha noi', 'hanoi'] },
  {
    code: 'P02',
    name: 'Thành phố Hồ Chí Minh',
    aliases: [
      'ho chi minh',
      'tp ho chi minh',
      'thanh pho ho chi minh',
      'tphcm',
      'hcm',
      'binh duong',
      'tinh binh duong',
      'ba ria vung tau',
      'ba ria - vung tau',
      'tinh ba ria vung tau',
    ],
  },
  {
    code: 'P03',
    name: 'Thành phố Hải Phòng',
    aliases: ['hai phong', 'tp hai phong', 'thanh pho hai phong', 'hai duong', 'tinh hai duong'],
  },
  {
    code: 'P04',
    name: 'Thành phố Đà Nẵng',
    aliases: ['da nang', 'tp da nang', 'thanh pho da nang', 'quang nam', 'tinh quang nam'],
  },
  {
    code: 'P05',
    name: 'Thành phố Cần Thơ',
    aliases: [
      'can tho',
      'tp can tho',
      'thanh pho can tho',
      'soc trang',
      'tinh soc trang',
      'hau giang',
      'tinh hau giang',
    ],
  },
  {
    code: 'P06',
    name: 'Thành phố Huế',
    aliases: ['hue', 'tp hue', 'thanh pho hue', 'thua thien hue', 'tinh thua thien hue'],
  },
  {
    code: 'P07',
    name: 'Tỉnh Quảng Ngãi',
    aliases: ['quang ngai', 'tinh quang ngai', 'kon tum', 'tinh kon tum'],
  },
  {
    code: 'P08',
    name: 'Tỉnh Tuyên Quang',
    aliases: ['tuyen quang', 'tinh tuyen quang', 'ha giang', 'tinh ha giang'],
  },
  {
    code: 'P09',
    name: 'Tỉnh Lào Cai',
    aliases: ['lao cai', 'tinh lao cai', 'yen bai', 'tinh yen bai'],
  },
  {
    code: 'P10',
    name: 'Tỉnh Thái Nguyên',
    aliases: ['thai nguyen', 'tinh thai nguyen', 'bac kan', 'bac can', 'tinh bac kan'],
  },
  {
    code: 'P11',
    name: 'Tỉnh Phú Thọ',
    aliases: [
      'phu tho',
      'tinh phu tho',
      'vinh phuc',
      'tinh vinh phuc',
      'hoa binh',
      'tinh hoa binh',
    ],
  },
  {
    code: 'P12',
    name: 'Tỉnh Bắc Ninh',
    aliases: ['bac ninh', 'tinh bac ninh', 'bac giang', 'tinh bac giang'],
  },
  {
    code: 'P13',
    name: 'Tỉnh Hưng Yên',
    aliases: ['hung yen', 'tinh hung yen', 'thai binh', 'tinh thai binh'],
  },
  {
    code: 'P14',
    name: 'Tỉnh Ninh Bình',
    aliases: [
      'ninh binh',
      'tinh ninh binh',
      'nam dinh',
      'tinh nam dinh',
      'ha nam',
      'tinh ha nam',
    ],
  },
  {
    code: 'P15',
    name: 'Tỉnh Quảng Trị',
    aliases: ['quang tri', 'tinh quang tri', 'quang binh', 'tinh quang binh'],
  },
  {
    code: 'P16',
    name: 'Tỉnh Gia Lai',
    aliases: ['gia lai', 'tinh gia lai', 'binh dinh', 'tinh binh dinh'],
  },
  {
    code: 'P17',
    name: 'Tỉnh Khánh Hòa',
    aliases: ['khanh hoa', 'tinh khanh hoa', 'ninh thuan', 'tinh ninh thuan'],
  },
  {
    code: 'P18',
    name: 'Tỉnh Lâm Đồng',
    aliases: [
      'lam dong',
      'tinh lam dong',
      'dak nong',
      'dac nong',
      'tinh dak nong',
      'binh thuan',
      'tinh binh thuan',
    ],
  },
  {
    code: 'P19',
    name: 'Tỉnh Đắk Lắk',
    aliases: ['dak lak', 'dac lak', 'tinh dak lak', 'phu yen', 'tinh phu yen'],
  },
  {
    code: 'P20',
    name: 'Tỉnh Đồng Nai',
    aliases: ['dong nai', 'tinh dong nai', 'binh phuoc', 'tinh binh phuoc'],
  },
  {
    code: 'P21',
    name: 'Tỉnh Tây Ninh',
    aliases: ['tay ninh', 'tinh tay ninh', 'long an', 'tinh long an'],
  },
  {
    code: 'P22',
    name: 'Tỉnh Vĩnh Long',
    aliases: [
      'vinh long',
      'tinh vinh long',
      'ben tre',
      'tinh ben tre',
      'tra vinh',
      'tinh tra vinh',
    ],
  },
  {
    code: 'P23',
    name: 'Tỉnh Đồng Tháp',
    aliases: ['dong thap', 'tinh dong thap', 'tien giang', 'tinh tien giang'],
  },
  {
    code: 'P24',
    name: 'Tỉnh An Giang',
    aliases: ['an giang', 'tinh an giang', 'kien giang', 'tinh kien giang'],
  },
  {
    code: 'P25',
    name: 'Tỉnh Cà Mau',
    aliases: ['ca mau', 'tinh ca mau', 'bac lieu', 'tinh bac lieu'],
  },
  { code: 'P26', name: 'Tỉnh Cao Bằng', aliases: ['cao bang', 'tinh cao bang'] },
  { code: 'P27', name: 'Tỉnh Lai Châu', aliases: ['lai chau', 'tinh lai chau'] },
  { code: 'P28', name: 'Tỉnh Điện Biên', aliases: ['dien bien', 'tinh dien bien'] },
  { code: 'P29', name: 'Tỉnh Sơn La', aliases: ['son la', 'tinh son la'] },
  { code: 'P30', name: 'Tỉnh Lạng Sơn', aliases: ['lang son', 'tinh lang son'] },
  { code: 'P31', name: 'Tỉnh Quảng Ninh', aliases: ['quang ninh', 'tinh quang ninh'] },
  { code: 'P32', name: 'Tỉnh Thanh Hóa', aliases: ['thanh hoa', 'tinh thanh hoa'] },
  { code: 'P33', name: 'Tỉnh Nghệ An', aliases: ['nghe an', 'tinh nghe an'] },
  { code: 'P34', name: 'Tỉnh Hà Tĩnh', aliases: ['ha tinh', 'tinh ha tinh'] },
];

export function stripVietnameseAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function resolveCanonicalProvince(rawProvince: string): { code: string; name: string } | null {
  const cleaned = rawProvince.trim();
  if (!cleaned) return null;

  // Khớp theo mã P01..P34
  const byCode = CANONICAL_34_PROVINCES.find(
    (p) => p.code.toLowerCase() === cleaned.toLowerCase()
  );
  if (byCode) return { code: byCode.code, name: byCode.name };

  const norm = stripVietnameseAccents(cleaned)
    .replace(/^(tinh|thanh pho|tp)\s+/i, '')
    .trim();

  for (const p of CANONICAL_34_PROVINCES) {
    const pNorm = stripVietnameseAccents(p.name)
      .replace(/^(tinh|thanh pho|tp)\s+/i, '')
      .trim();
    if (norm === pNorm || p.aliases.includes(norm) || p.aliases.includes(stripVietnameseAccents(cleaned))) {
      return { code: p.code, name: p.name };
    }
  }

  return null;
}

export function normalizeCommuneName(rawCommune: string, rawType?: string): string {
  let name = rawCommune.replace(/\s+/g, ' ').trim();
  if (!name) return '';

  // Bỏ số thứ tự đầu dòng nếu có (VD: "1. Phường Ba Đình" -> "Phường Ba Đình")
  name = name.replace(/^\d+[\.\)\s-]+/, '').trim();

  const prefixRegex = /^(phường|xã|thị trấn|đặc khu|p\.|x\.|tt\.)\s+/i;
  if (!prefixRegex.test(name) && rawType) {
    const cleanType = rawType.trim();
    if (/phường/i.test(cleanType)) name = `Phường ${name}`;
    else if (/đặc khu/i.test(cleanType)) name = `Đặc khu ${name}`;
    else if (/xã/i.test(cleanType)) name = `Xã ${name}`;
  } else {
    // Chuẩn hoá chữ hoa đầu từ loại đơn vị hành chính
    name = name
      .replace(/^phường\s+/i, 'Phường ')
      .replace(/^xã\s+/i, 'Xã ')
      .replace(/^đặc khu\s+/i, 'Đặc khu ')
      .replace(/^thị trấn\s+/i, 'Thị trấn ')
      .replace(/^p\.\s*/i, 'Phường ')
      .replace(/^x\.\s*/i, 'Xã ');
  }

  return name;
}

/**
 * Đọc bảng dữ liệu từ file Excel (.xlsx) bằng JSZip
 */
async function parseXlsxRows(buffer: Buffer): Promise<string[][]> {
  const zip = await JSZip.loadAsync(buffer);
  const sharedStringsXml = await zip.file('xl/sharedStrings.xml')?.async('string');
  const sharedStrings: string[] = [];

  if (sharedStringsXml) {
    const siMatches = sharedStringsXml.match(/<si[\s\S]*?<\/si>/g) || [];
    for (const si of siMatches) {
      const tMatches = si.match(/<t[^>]*>([\s\S]*?)<\/t>/g) || [];
      const text = tMatches
        .map((t) => t.replace(/<[^>]+>/g, ''))
        .join('')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      sharedStrings.push(text);
    }
  }

  const sheetFiles = Object.keys(zip.files)
    .filter((k) => /^xl\/worksheets\/sheet\d+\.xml$/.test(k))
    .sort();

  const allRows: string[][] = [];

  for (const sheetPath of sheetFiles) {
    const xml = await zip.file(sheetPath)?.async('string');
    if (!xml) continue;

    const rowMatches = xml.match(/<row[\s\S]*?<\/row>/g) || [];
    for (const rowXml of rowMatches) {
      const cells: string[] = [];
      const cMatches = rowXml.match(/<c[\s\S]*?(?:\/>|<\/c>)/g) || [];
      for (const cXml of cMatches) {
        const typeMatch = cXml.match(/\bt="([^"]+)"/);
        const cellType = typeMatch ? typeMatch[1] : '';
        const vMatch = cXml.match(/<v>([\s\S]*?)<\/v>/);
        const isMatch = cXml.match(/<is>[\s\S]*?<t[^>]*>([\s\S]*?)<\/t>[\s\S]*?<\/is>/);

        let val = '';
        if (cellType === 's' && vMatch) {
          const idx = parseInt(vMatch[1], 10);
          val = sharedStrings[idx] ?? '';
        } else if (isMatch) {
          val = isMatch[1];
        } else if (vMatch) {
          val = vMatch[1];
        }
        cells.push(val.trim());
      }
      if (cells.some((c) => c.length > 0)) {
        allRows.push(cells);
      }
    }
  }

  return allRows;
}

/**
 * Đọc dòng từ CSV / TSV
 */
function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === delimiter && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseDelimitedText(content: string): string[][] {
  const clean = content.replace(/^\uFEFF/, '');
  const lines = clean
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return [];

  const sample = lines.slice(0, 5).join('\n');
  let delimiter = ',';
  if (sample.includes('\t')) delimiter = '\t';
  else if (sample.split(';').length > sample.split(',').length) delimiter = ';';
  else if (sample.split('|').length > sample.split(',').length) delimiter = '|';

  return lines.map((line) => parseCsvLine(line, delimiter));
}

/**
 * Trích xuất cặp (provinceCode, communeName) từ danh sách dòng bảng (XLSX / CSV / TSV)
 */
function extractPairsFromRows(rows: string[][]): Array<{ provinceCode: string; commune: string }> {
  if (rows.length === 0) return [];

  let provinceCol = -1;
  let communeCol = -1;
  let typeCol = -1;
  let startRow = 0;

  // Tìm dòng tiêu đề trong 10 dòng đầu
  for (let r = 0; r < Math.min(10, rows.length); r++) {
    const row = rows[r];
    const normCells = row.map((c) => stripVietnameseAccents(c));

    const pIdx = normCells.findIndex((c) =>
      /\b(tinh|thanh pho|tinh thanh|ten tinh|don vi cap tinh|province)\b/.test(c)
    );
    const cIdx = normCells.findIndex((c) =>
      /\b(xa|phuong|dac khu|xa phuong|ten xa|ten phuong|don vi cap xa|commune|ward)\b/.test(c)
    );
    const tIdx = normCells.findIndex((c) =>
      /\b(cap|loai|loai hinh|type|level)\b/.test(c)
    );

    if (pIdx !== -1 && cIdx !== -1 && pIdx !== cIdx) {
      provinceCol = pIdx;
      communeCol = cIdx;
      typeCol = tIdx !== pIdx && tIdx !== cIdx ? tIdx : -1;
      startRow = r + 1;
      break;
    }
  }

  const pairs: Array<{ provinceCode: string; commune: string }> = [];
  let currentProvinceCode: string | null = null;

  for (let r = startRow; r < rows.length; r++) {
    const row = rows[r].map((c) => c.trim());
    if (row.every((c) => !c)) continue;

    if (provinceCol !== -1 && communeCol !== -1) {
      const rawProv = row[provinceCol] || '';
      const rawComm = row[communeCol] || '';
      const rawType = typeCol !== -1 ? row[typeCol] : undefined;

      const resolvedProv = resolveCanonicalProvince(rawProv);
      if (resolvedProv) {
        currentProvinceCode = resolvedProv.code;
      }

      if (currentProvinceCode && rawComm) {
        const comm = normalizeCommuneName(rawComm, rawType);
        if (
          comm &&
          !/^(ten xa|xa phuong|phuong xa|commune|ward|tong so)$/i.test(stripVietnameseAccents(comm))
        ) {
          pairs.push({ provinceCode: currentProvinceCode, commune: comm });
        }
      }
      continue;
    }

    // Tự động nhận diện trên từng dòng nếu không có header chuẩn
    let rowProv: { code: string; name: string } | null = null;
    let rowComm = '';

    for (const cell of row) {
      if (!cell) continue;
      const maybeProv = resolveCanonicalProvince(cell);
      if (maybeProv && !/^(phường|xã|đặc khu|thị trấn)\s/i.test(cell)) {
        rowProv = maybeProv;
      } else if (/^(phường|xã|đặc khu|thị trấn)\s+/i.test(cell)) {
        rowComm = normalizeCommuneName(cell);
      }
    }

    if (rowProv) {
      currentProvinceCode = rowProv.code;
    }
    if (!rowComm && row.length >= 2 && currentProvinceCode) {
      const candidate = row[row.length - 1];
      if (candidate && !resolveCanonicalProvince(candidate)) {
        rowComm = normalizeCommuneName(candidate);
      }
    }

    if (currentProvinceCode && rowComm) {
      pairs.push({ provinceCode: currentProvinceCode, commune: rowComm });
    }
  }

  return pairs;
}

/**
 * Trích xuất cặp (provinceCode, communeName) từ file JSON bất kỳ
 */
function extractPairsFromJson(data: any): Array<{ provinceCode: string; commune: string }> {
  const pairs: Array<{ provinceCode: string; commune: string }> = [];

  if (!data) return pairs;

  // Trường hợp 1: { provinces: [ { code, name, communes/wards: [...] } ] }
  const provinceArray = Array.isArray(data)
    ? data
    : Array.isArray(data.provinces)
    ? data.provinces
    : Array.isArray(data.data)
    ? data.data
    : null;

  if (provinceArray) {
    for (const item of provinceArray) {
      if (!item || typeof item !== 'object') continue;

      const rawProvName =
        item.provinceName ||
        item.province ||
        item.tinh ||
        item.ten_tinh ||
        item.name ||
        item.code ||
        '';
      const resolvedProv = resolveCanonicalProvince(String(rawProvName));

      // Nếu phần tử có mảng communes / wards con
      const childList = item.communes || item.wards || item.units || item.xa_phuong || item.children;
      if (resolvedProv && Array.isArray(childList)) {
        for (const ch of childList) {
          if (typeof ch === 'string') {
            const cName = normalizeCommuneName(ch);
            if (cName) pairs.push({ provinceCode: resolvedProv.code, commune: cName });
          } else if (ch && typeof ch === 'object') {
            const cName = normalizeCommuneName(
              String(ch.name || ch.ten || ch.commune || ch.ward || ''),
              String(ch.type || ch.loai || ch.level || '')
            );
            if (cName) pairs.push({ provinceCode: resolvedProv.code, commune: cName });
          }
        }
        continue;
      }

      // Nếu phần tử là bản ghi phẳng { province, commune }
      const rawComm =
        item.communeName ||
        item.commune ||
        item.ward ||
        item.xa ||
        item.phuong ||
        item.ten_xa ||
        '';
      if (resolvedProv && rawComm) {
        const cName = normalizeCommuneName(String(rawComm), String(item.type || item.loai || ''));
        if (cName) pairs.push({ provinceCode: resolvedProv.code, commune: cName });
      }
    }
    return pairs;
  }

  // Trường hợp 2: Object map { "Thành phố Hà Nội": ["Phường Ba Đình", ...] }
  if (typeof data === 'object') {
    for (const [k, v] of Object.entries(data)) {
      const resolvedProv = resolveCanonicalProvince(k);
      if (resolvedProv && Array.isArray(v)) {
        for (const ch of v) {
          const cName =
            typeof ch === 'string'
              ? normalizeCommuneName(ch)
              : normalizeCommuneName(String((ch as any)?.name || ''));
          if (cName) pairs.push({ provinceCode: resolvedProv.code, commune: cName });
        }
      }
    }
  }

  return pairs;
}

export async function convertOfficialAdminFileToCatalog(
  inputPath: string,
  options?: {
    existingCatalogPath?: string;
    mergeWithExisting?: boolean;
  }
): Promise<VnAdminCatalog2025> {
  const ext = path.extname(inputPath).toLowerCase();
  let pairs: Array<{ provinceCode: string; commune: string }> = [];

  if (ext === '.xlsx') {
    const buf = fs.readFileSync(inputPath);
    const rows = await parseXlsxRows(buf);
    pairs = extractPairsFromRows(rows);
  } else if (ext === '.json') {
    const raw = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    pairs = extractPairsFromJson(raw);
  } else {
    const content = fs.readFileSync(inputPath, 'utf8');
    const rows = parseDelimitedText(content);
    pairs = extractPairsFromRows(rows);
  }

  // Khởi tạo map 34 tỉnh/thành theo đúng thứ tự P01..P34
  const communeMap = new Map<string, Map<string, string>>();
  for (const p of CANONICAL_34_PROVINCES) {
    communeMap.set(p.code, new Map());
  }

  // Nếu bật cờ --merge, nạp dữ liệu hiện có trước rồi bổ sung thêm
  if (options?.mergeWithExisting && options.existingCatalogPath && fs.existsSync(options.existingCatalogPath)) {
    try {
      const existing = JSON.parse(
        fs.readFileSync(options.existingCatalogPath, 'utf8')
      ) as VnAdminCatalog2025;
      for (const prov of existing.provinces || []) {
        const resolved = resolveCanonicalProvince(prov.code || prov.name);
        if (!resolved) continue;
        const bucket = communeMap.get(resolved.code)!;
        for (const c of prov.communes || []) {
          const clean = normalizeCommuneName(c);
          if (clean) {
            const key = stripVietnameseAccents(clean);
            if (!bucket.has(key)) bucket.set(key, clean);
          }
        }
      }
    } catch (e) {
      console.warn('Không thể đọc file hiện tại để merge:', e);
    }
  }

  for (const { provinceCode, commune } of pairs) {
    const bucket = communeMap.get(provinceCode);
    if (!bucket) continue;
    const key = stripVietnameseAccents(commune);
    if (key && !bucket.has(key)) {
      bucket.set(key, commune);
    }
  }

  const provinces: VnAdminProvinceEntry[] = CANONICAL_34_PROVINCES.map((p) => ({
    code: p.code,
    name: p.name,
    communes: Array.from(communeMap.get(p.code)?.values() || []),
  }));

  return {
    version: '2025-07-01',
    description:
      'Danh mục 34 tỉnh, thành phố trực thuộc Trung ương và toàn bộ xã/phường/đặc khu theo Nghị quyết 202/2025/QH15 (áp dụng từ 01/07/2025)',
    provinces,
  };
}

// CLI Runner
async function main() {
  const args = process.argv.slice(2);
  const defaultTarget = path.resolve(process.cwd(), 'src/data/vn_admin_2025.json');

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
================================================================================
 CÔNG CỤ CHUYỂN ĐỔI DANH MỤC 34 TỈNH/THÀNH & XÃ/PHƯỜNG (01/07/2025)
================================================================================
Cách dùng:
  npx tsx scripts/convert-vn-admin-2025.ts <file-nguon.(xlsx|csv|tsv|json|txt)> [tùy chọn]

Tùy chọn:
  --out <path>   Đường dẫn file JSON đầu ra (mặc định: src/data/vn_admin_2025.json)
  --merge        Gộp bổ sung vào danh mục hiện có thay vì ghi đè hoàn toàn
  --stats        Kiểm tra thống kê file src/data/vn_admin_2025.json hiện tại
`);
    if (args.includes('--stats') && fs.existsSync(defaultTarget)) {
      const current = JSON.parse(fs.readFileSync(defaultTarget, 'utf8')) as VnAdminCatalog2025;
      const total = current.provinces.reduce((s, p) => s + p.communes.length, 0);
      console.log(`Thống kê hiện tại (${defaultTarget}):`);
      console.log(`- Tổng số tỉnh/thành: ${current.provinces.length}/34`);
      console.log(`- Tổng số xã/phường/đặc khu: ${total}`);
      current.provinces.forEach((p) => {
        console.log(`  [${p.code}] ${p.name}: ${p.communes.length} xã/phường`);
      });
    }
    return;
  }

  const inputPath = path.resolve(process.cwd(), args[0]);
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Không tìm thấy file nguồn: ${inputPath}`);
    process.exit(1);
  }

  const outIdx = args.indexOf('--out');
  const outPath =
    outIdx !== -1 && args[outIdx + 1]
      ? path.resolve(process.cwd(), args[outIdx + 1])
      : defaultTarget;
  const mergeWithExisting = args.includes('--merge');

  console.log(`⏳ Đang đọc và chuyển đổi dữ liệu từ: ${inputPath} ...`);
  const catalog = await convertOfficialAdminFileToCatalog(inputPath, {
    existingCatalogPath: outPath,
    mergeWithExisting,
  });

  const totalCommunes = catalog.provinces.reduce((acc, p) => acc + p.communes.length, 0);
  const nonEmptyProvinces = catalog.provinces.filter((p) => p.communes.length > 0).length;

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');

  console.log(`✅ Đã xuất thành công: ${outPath}`);
  console.log(`📊 Tổng số tỉnh/thành có dữ liệu: ${nonEmptyProvinces}/34`);
  console.log(`📊 Tổng số xã/phường/đặc khu: ${totalCommunes}`);
  const hanoi = catalog.provinces.find((p) => p.code === 'P01');
  if (hanoi) {
    console.log(`📍 Thành phố Hà Nội (P01): ${hanoi.communes.length} xã/phường`);
  }
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));

if (isMain) {
  main().catch((err) => {
    console.error('❌ Lỗi khi chuyển đổi danh mục:', err);
    process.exit(1);
  });
}
