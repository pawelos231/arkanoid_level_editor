import { calculateBrickHeight } from "./calculateBrickHeight";

export type Brick = {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string
}

export const generateBrickGrid = (canvas: HTMLCanvasElement , columnsNumber: number, rowsNumber: number) => {

    const brickGrid: Brick[] = [];

    const brickWidth = canvas.width / columnsNumber;
    const brickHeight = calculateBrickHeight(canvas.height, rowsNumber);

    for (let i = 0; i < columnsNumber; i++) {
      for (let j = 0; j < rowsNumber; j++) {

        brickGrid.push({
            x: i * brickWidth,
            y: j * brickHeight,
            width: brickWidth,
            height: brickHeight,
            color: "#fff"
        });
      }
    }

    return brickGrid

}

export const drawBricks = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, bricks: Brick[]) => {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1;

    bricks.forEach((brick: Brick) => {
        context.fillStyle = brick.color;
        context.strokeStyle = "#000";
        context.strokeRect(brick.x, brick.y, brick.width, brick.height);
        context.fillRect(brick.x, brick.y, brick.width, brick.height);
      });
}