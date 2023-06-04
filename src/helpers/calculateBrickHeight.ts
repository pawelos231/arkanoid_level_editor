export function calculateBrickHeight(canvasHeight: number, brickRowCount: number): number {

    if(brickRowCount > 7 && brickRowCount <= 10){
        const maxBrickHeight = Math.floor(canvasHeight / 3.5);
        const calculatedBrickHeight = Math.floor(maxBrickHeight / brickRowCount);
        return calculatedBrickHeight;
    }

    if(brickRowCount > 5 && brickRowCount <=7) {
        const maxBrickHeight = Math.floor(canvasHeight / 4);
        const calculatedBrickHeight = Math.floor(maxBrickHeight / brickRowCount);
        return calculatedBrickHeight;
    } else {
        const maxBrickHeight = Math.floor(canvasHeight / 5);
        const calculatedBrickHeight = Math.floor(maxBrickHeight / brickRowCount);
        return calculatedBrickHeight;
    }

  }