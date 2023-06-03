import { calculateBrickHeight } from "./calculateBrickHeight";

export type Brick = {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string
}

export const generateBrickGrid = (canvas: HTMLCanvasElement , columnsNumber: number, rowsNumber: number, context: CanvasRenderingContext2D) => {

    const brickGrid = [];

    const brickWidth = canvas.width / columnsNumber;
    const brickHeight = calculateBrickHeight(canvas.height, rowsNumber);

    context.clearRect(0, 0, canvas.width, canvas.height);

    const color = "#111"
    context.lineWidth = 1;

    for (let i = 0; i < columnsNumber; i++) {
      for (let j = 0; j < rowsNumber; j++) {

        brickGrid.push({
            x: i * brickWidth,
            y: j * brickHeight,
            width: brickWidth,
            height: brickHeight,
            color: color
        });
      }
    }

    return brickGrid

}