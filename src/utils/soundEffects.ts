/**
 * Sound Effects & Procedural Background Music using Web Audio API
 * No external audio files needed!
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgOscillators: OscillatorNode[] = [];
  private bgGain: GainNode | null = null;
  private isBgmPlaying = false;
  private bgmInterval: any = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Play short sound effect
   */
  public playSound(type: 'correct' | 'wrong' | 'victory' | 'bell' | 'tick' | 'flip' | 'boost') {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      if (type === 'correct') {
        // Two-tone cheerful chime (E5 -> A5)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(659.25, now); // E5
        osc2.frequency.setValueAtTime(880.0, now + 0.1); // A5

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.15);
        osc2.start(now + 0.1);
        osc2.stop(now + 0.4);
      } else if (type === 'wrong') {
        // Low buzz (150Hz -> 100Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(80, now + 0.3);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'victory') {
        // Fanfare melody (C5 - E5 - G5 - C6)
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const startTime = now + i * 0.12;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.25, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + 0.3);
        });
      } else if (type === 'bell') {
        // Golden Bell chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.8);
      } else if (type === 'tick') {
        // Clock tick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'flip') {
        // Card flip swoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'boost') {
        // Rocket boost sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.25);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  /**
   * Start procedural background music
   */
  public startBgMusic(theme: 'chase' | 'march' | 'calm' | 'dramatic' = 'chase') {
    if (this.isBgmPlaying) this.stopBgMusic();
    const ctx = this.getContext();
    if (!ctx) return;

    this.isBgmPlaying = true;
    const bpm = theme === 'chase' ? 130 : theme === 'march' ? 110 : 90;
    const stepDuration = (60 / bpm) / 2;

    const scales = {
      chase: [261.63, 293.66, 329.63, 392.0, 440.0], // Pentatonic C
      march: [220.0, 246.94, 261.63, 293.66, 329.63], // Minor A
      calm: [261.63, 329.63, 392.0, 523.25],
      dramatic: [196.0, 220.0, 233.08, 293.66],
    };
    const scale = scales[theme];
    let step = 0;

    this.bgmInterval = setInterval(() => {
      if (!this.isBgmPlaying || !ctx) return;
      try {
        const now = ctx.currentTime;
        const note = scale[step % scale.length];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = theme === 'march' ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(note, now);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stepDuration * 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + stepDuration * 0.9);

        step++;
      } catch (err) {
        // ignore audio errors
      }
    }, stepDuration * 1000);
  }

  /**
   * Stop background music
   */
  public stopBgMusic() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const soundManager = new SoundEngine();
export const playSound = (type: 'correct' | 'wrong' | 'victory' | 'bell' | 'tick' | 'flip' | 'boost') =>
  soundManager.playSound(type);
export const startBgMusic = (theme?: 'chase' | 'march' | 'calm' | 'dramatic') =>
  soundManager.startBgMusic(theme);
export const stopBgMusic = () => soundManager.stopBgMusic();
