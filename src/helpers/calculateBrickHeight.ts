export function calculateBrickHeight(canvasHeight: number, brickRowCount: number): number {
    const maxBrickHeight = Math.floor(canvasHeight / 5);
    const calculatedBrickHeight = Math.floor(maxBrickHeight / brickRowCount);
  
    return calculatedBrickHeight;
  }