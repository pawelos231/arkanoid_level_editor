export function calculateBrickHeight(canvasHeight: number, brickRowCount: number): number {

    if(brickRowCount > 5) {
        const maxBrickHeight = Math.floor(canvasHeight / 4);
        const calculatedBrickHeight = Math.floor(maxBrickHeight / brickRowCount);
        return calculatedBrickHeight;
    } else {
        const maxBrickHeight = Math.floor(canvasHeight / 5);
        const calculatedBrickHeight = Math.floor(maxBrickHeight / brickRowCount);
        return calculatedBrickHeight;
    }

  }