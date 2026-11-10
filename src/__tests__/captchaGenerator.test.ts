import { describe, it, expect } from 'vitest';
import { generateCaptchaText, renderCaptchaOnCanvas } from '../utils/captchaGenerator';

describe('Captcha Generator Utility', () => {
  it('generates 5-character string by default', () => {
    const text = generateCaptchaText();
    expect(text).toHaveLength(5);
  });

  it('generates custom length string when specified', () => {
    const text = generateCaptchaText(6);
    expect(text).toHaveLength(6);
  });

  it('only includes uppercase alphanumeric characters excluding ambiguous characters', () => {
    const text = generateCaptchaText(20);
    // Should not contain ambiguous 0, O, 1, I, L
    expect(text).not.toMatch(/[01OIL]/);
    expect(text).toMatch(/^[2-9A-HJ-NP-Z]+$/);
  });

  it('renders on canvas without error', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 190;
    canvas.height = 60;
    expect(() => renderCaptchaOnCanvas(canvas, 'A8B9C')).not.toThrow();
  });
});
