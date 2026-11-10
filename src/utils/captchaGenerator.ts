/**
 * Generates random 5-character alphanumeric CAPTCHA text.
 * Excludes easily ambiguous characters (0, O, I, 1, L) for better usability while remaining secure.
 */
export function generateCaptchaText(length = 5): string {
  const chars = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Renders authentic EBL bank captcha with noise, interference lines, and character distortion.
 */
export function renderCaptchaOnCanvas(
  canvas: HTMLCanvasElement,
  text: string
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  // Background
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(0, 0, width, height);

  // Background noise dots
  ctx.fillStyle = '#b0b8c0';
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Background interference lines
  ctx.strokeStyle = '#c5d0db';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.bezierCurveTo(
      Math.random() * width,
      Math.random() * height,
      Math.random() * width,
      Math.random() * height,
      Math.random() * width,
      Math.random() * height
    );
    ctx.stroke();
  }

  // Foreground strikethrough lines like authentic bank captcha
  ctx.strokeStyle = '#8a9ba8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(15, height * 0.45);
  ctx.lineTo(width - 15, height * 0.7);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(25, height * 0.65);
  ctx.lineTo(width - 20, height * 0.35);
  ctx.stroke();

  // Render individual letters with rotation and slight jitter
  const charSpacing = (width - 40) / text.length;
  ctx.font = 'bold 26px "Segoe UI", Arial, sans-serif';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const x = 24 + i * charSpacing + (Math.random() * 4 - 2);
    const y = height / 2 + (Math.random() * 6 - 3);
    const angle = (Math.random() * 0.4 - 0.2); // -11 to +11 deg

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // EBL dark blue brand color
    ctx.fillStyle = '#003876';
    ctx.fillText(char, 0, 0);

    ctx.restore();
  }
}
