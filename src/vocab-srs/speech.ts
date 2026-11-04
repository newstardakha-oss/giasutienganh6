import { Word, VocabSrsSettings } from './types';

let currentAudioElement: HTMLAudioElement | null = null;

/**
 * Phát âm từ vựng:
 * - Nếu từ có trường audioUrl thì ưu tiên phát file audio đó.
 * - Ngược lại dùng Web Speech API (speechSynthesis, giọng en-US hoặc en-GB, tốc độ 0.9 mặc định).
 */
export function speakWord(wordObj: Word, settings: VocabSrsSettings): void {
  try {
    if (typeof window === 'undefined') return;

    // Dừng audio đang phát trước đó
    if (currentAudioElement) {
      currentAudioElement.pause();
      currentAudioElement = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Ưu tiên phát audioUrl nếu có
    if (wordObj.audioUrl && wordObj.audioUrl.trim() !== '') {
      const audio = new Audio(wordObj.audioUrl.trim());
      audio.playbackRate = settings.speechRate || 0.9;
      currentAudioElement = audio;
      audio.play().catch(() => {
        // Fallback sang Web Speech API nếu file audio lỗi
        speakWithSynthesis(wordObj.word, settings.voiceLang, settings.speechRate);
      });
      return;
    }

    speakWithSynthesis(wordObj.word, settings.voiceLang, settings.speechRate);
  } catch (err) {
    console.warn('[Speech] Không thể phát âm:', err);
  }
}

export function speakWithSynthesis(
  text: string,
  lang: 'en-US' | 'en-GB' = 'en-US',
  rate: number = 0.9
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      // Tìm giọng khớp chính xác en-US hoặc en-GB
      const exactVoice = voices.find(
        (v) => v.lang.replace('_', '-').toLowerCase() === lang.toLowerCase()
      );
      const fallbackEnglishVoice = voices.find((v) =>
        v.lang.toLowerCase().startsWith('en')
      );
      if (exactVoice) {
        utterance.voice = exactVoice;
      } else if (fallbackEnglishVoice) {
        utterance.voice = fallbackEnglishVoice;
      }
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('[SpeechSynthesis] Lỗi phát âm:', err);
  }
}
