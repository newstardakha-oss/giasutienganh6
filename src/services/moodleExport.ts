import { saveAs } from 'file-saver';
import { Question } from '../types';

/**
 * Export Questions in Moodle GIFT Format (.txt)
 * GIFT is the standard text format for importing quizzes into Moodle LMS
 */
export function exportToMoodleGift(title: string, questions: Question[]) {
  let giftContent = `// GIFT format export for Moodle LMS - ${title}\n\n`;

  questions.forEach((q, index) => {
    giftContent += `// Question ${index + 1}: ${q.skill}\n`;
    giftContent += `::Q${index + 1}:: ${q.content} {\n`;

    if (q.options) {
      q.options.forEach((opt) => {
        if (opt === q.correctAnswer) {
          giftContent += `  =${opt}\n`; // = means correct answer in GIFT
        } else {
          giftContent += `  ~${opt}\n`; // ~ means wrong answer in GIFT
        }
      });
    }

    giftContent += `  #### ${q.explanation}\n`; // Feedback explanation
    giftContent += `}\n\n`;
  });

  const blob = new Blob([giftContent], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${title.replace(/\s+/g, '_')}_Moodle_GIFT.txt`);
}
