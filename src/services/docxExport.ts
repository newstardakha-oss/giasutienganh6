import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import { Question, SgkUnit } from '../types';

/**
 * Export English 6 Test / Practice sheet to .docx
 */
export async function exportQuestionsToDocx(
  title: string,
  questions: Question[],
  unit?: SgkUnit
) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header title
          new Paragraph({
            text: 'TRƯỜNG THCS: ............................................',
            style: 'HeaderStyle',
          }),
          new Paragraph({
            text: 'HỌ VÀ TÊN: ................................................ LỚP: 6A...',
            style: 'HeaderStyle',
          }),
          new Paragraph({
            text: `ĐỀ KIỂM TRA MÔN TIẾNG ANH LỚP 6`,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: `Chủ đề: ${title} ${unit ? `- Unit ${unit.unitNumber}: ${unit.title}` : ''}`,
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 300 },
          }),

          // Questions List
          ...questions.flatMap((q, index) => {
            const qParagraph = new Paragraph({
              children: [
                new TextRun({
                  text: `Câu ${index + 1} (${q.skill} - ${q.difficulty}): `,
                  bold: true,
                }),
                new TextRun({
                  text: q.content,
                }),
              ],
              spacing: { before: 150, after: 100 },
            });

            const optionParagraphs = (q.options || []).map((opt, i) => {
              const letter = String.fromCharCode(65 + i);
              return new Paragraph({
                children: [
                  new TextRun({
                    text: `   ${letter}. ${opt}`,
                  }),
                ],
                spacing: { after: 50 },
              });
            });

            return [qParagraph, ...optionParagraphs];
          }),

          // Answer Key Section (Trang Đáp Án & Giải Thích)
          new Paragraph({
            text: '--- ĐÁP ÁN VÀ GIẢI THÍCH CHI TIẾT ---',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),

          ...questions.map((q, index) => {
            return new Paragraph({
              children: [
                new TextRun({
                  text: `Câu ${index + 1}: `,
                  bold: true,
                }),
                new TextRun({
                  text: `Đáp án đúng: ${q.correctAnswer} | `,
                  bold: true,
                }),
                new TextRun({
                  text: `Giải thích: ${q.explanation}`,
                  italics: true,
                }),
              ],
              spacing: { after: 100 },
            });
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${title.replace(/\s+/g, '_')}_TiengAnh6.docx`);
}
