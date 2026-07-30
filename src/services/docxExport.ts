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

/**
 * Export Writing Grader feedback & essay report to .docx
 */
export async function exportWritingFeedbackToDocx(
  studentName: string,
  topicTitle: string,
  essayPrompt: string,
  studentEssay: string,
  feedback: import('../types').WritingFeedback
) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'TRƯỜNG THCS: ............................................',
          }),
          new Paragraph({
            text: `HỌ VÀ TÊN HỌC SINH: ${studentName || 'Học sinh Lớp 6'}`,
          }),
          new Paragraph({
            text: `BÁO CÁO ĐÁNH GIÁ VÀ CHẤM ĐIỂM BÀI VIẾT TIẾNG ANH 6`,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: `Chủ đề: ${topicTitle}`,
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Đề bài: ', bold: true }),
              new TextRun({ text: essayPrompt, italics: true }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: '--- BÀI LÀM CỦA HỌC SINH ---',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 150, after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: studentEssay })],
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: '--- KẾT QUẢ ĐÁNH GIÁ TỔNG THỂ ---',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Điểm tổng thể: ${feedback.overallScore}/10  |  Xếp loại: ${feedback.band}  |  Số từ: ${feedback.wordCount} từ\n`, bold: true }),
              new TextRun({ text: `• Ngữ pháp: ${feedback.grammarScore}/10  • Từ vựng: ${feedback.vocabScore}/10  • Cấu trúc: ${feedback.structureScore}/10` }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: '--- ĐIỂM SÁNG BÀI LÀM ---',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 150, after: 100 },
          }),
          ...feedback.strengths.map((st) => new Paragraph({ text: `• ${st}`, spacing: { after: 50 } })),
          new Paragraph({
            text: '--- CẦN CẢI THIỆN ---',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 150, after: 100 },
          }),
          ...feedback.areasForImprovement.map((ar) => new Paragraph({ text: `• ${ar}`, spacing: { after: 50 } })),
          new Paragraph({
            text: '--- CHI TIẾT LỖI VÀ CÁCH SỬA ---',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 100 },
          }),
          ...feedback.detailedCorrections.map((cor, idx) => new Paragraph({
            children: [
              new TextRun({ text: `${idx + 1}. Lỗi gốc: "${cor.original}" ➔ Sửa đúng: "${cor.correction}"\n`, bold: true }),
              new TextRun({ text: `   Lý do: ${cor.reason}`, italics: true }),
            ],
            spacing: { after: 100 },
          })),
          new Paragraph({
            text: '--- ĐOẠN VĂN MẪU GỢI Ý CỦA AI ---',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: feedback.suggestedRevision, italics: true })],
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: '--- LỜI KHUYÊN CỦA THẦY CÔ ---',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 150, after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: feedback.pedagogicalAdvice })],
            spacing: { after: 200 },
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `BaiViet_${studentName.replace(/\s+/g, '_')}_Lop6.docx`);
}

