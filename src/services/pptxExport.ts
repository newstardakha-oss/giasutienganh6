import pptxgen from 'pptxgenjs';
import { SgkUnit } from '../types';

/**
 * Export Unit lesson presentation slides to .pptx
 */
export function exportUnitToPptx(unit: SgkUnit) {
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9';

  // Slide 1: Cover Slide
  const slide1 = pptx.addSlide();
  slide1.background = { color: '1E1B4B' }; // Dark indigo

  slide1.addText(`TIẾNG ANH 6 - GLOBAL SUCCESS`, {
    x: 0.8,
    y: 1.5,
    w: 8.5,
    h: 0.8,
    fontSize: 20,
    color: 'A5B4FC',
    bold: true,
  });

  slide1.addText(`UNIT ${unit.unitNumber}: ${unit.title}`, {
    x: 0.8,
    y: 2.3,
    w: 8.5,
    h: 1.2,
    fontSize: 36,
    color: 'FFFFFF',
    bold: true,
  });

  slide1.addText(`Chủ điểm: ${unit.theme} | Ngữ âm: ${unit.pronunciationIPA}`, {
    x: 0.8,
    y: 3.8,
    w: 8.5,
    h: 0.6,
    fontSize: 16,
    color: 'C7D2FE',
  });

  // Slide 2: Vocabulary Slide
  const slide2 = pptx.addSlide();
  slide2.addText(`VOCABULARY (TỪ VỰNG TRỌNG TÂM)`, {
    x: 0.8,
    y: 0.6,
    w: 8.5,
    h: 0.8,
    fontSize: 24,
    color: '4F46E5',
    bold: true,
  });

  const vocabRows = unit.vocabulary.map((v) => [{ text: v, options: { fontSize: 16 } }]);

  slide2.addTable(vocabRows, {
    x: 0.8,
    y: 1.5,
    w: 8.5,
    colW: [8.5],
    border: { pt: 1, color: 'E2E8F0' },
    fill: { color: 'F8FAFC' },
  });

  // Slide 3: Grammar Slide
  const slide3 = pptx.addSlide();
  slide3.addText(`GRAMMAR FOCUS (NGỮ PHÁP)`, {
    x: 0.8,
    y: 0.6,
    w: 8.5,
    h: 0.8,
    fontSize: 24,
    color: '059669',
    bold: true,
  });

  unit.grammar.forEach((gRule, i) => {
    slide3.addText(`• ${gRule}`, {
      x: 0.8,
      y: 1.5 + i * 0.8,
      w: 8.5,
      h: 0.6,
      fontSize: 18,
      color: '1F2937',
    });
  });

  // Save presentation
  pptx.writeFile({ fileName: `Unit_${unit.unitNumber}_${unit.title.replace(/\s+/g, '_')}.pptx` });
}
