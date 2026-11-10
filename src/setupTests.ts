import '@testing-library/jest-dom';

// Mock speech synthesis for environments without Web Speech API
if (typeof window !== 'undefined' && !window.speechSynthesis) {
  Object.defineProperty(window, 'speechSynthesis', {
    value: {
      speak: () => {},
      cancel: () => {},
      pause: () => {},
      resume: () => {},
      getVoices: () => [],
    },
    writable: true,
  });
}

// Mock canvas getContext for jsdom
(HTMLCanvasElement.prototype as any).getContext = function () {
  return {
    fillStyle: '',
    fillRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
    moveTo: () => {},
    lineTo: () => {},
    bezierCurveTo: () => {},
    stroke: () => {},
    save: () => {},
    restore: () => {},
    translate: () => {},
    rotate: () => {},
    fillText: () => {},
    clearRect: () => {},
    getImageData: () => ({ data: [] }),
    putImageData: () => {},
    createImageData: () => ({ data: [] }),
    setTransform: () => {},
    drawImage: () => {},
  } as unknown as CanvasRenderingContext2D;
};
