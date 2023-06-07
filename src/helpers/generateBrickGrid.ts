import { calculateBrickHeight } from "./calculateBrickHeight";
import { DEFAULT_BRICK_COLOR } from "../constants/defaultValues";

export type Brick = {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string
}

export const generateBrickGrid = (canvas: HTMLCanvasElement , columnsNumber: number, rowsNumber: number, bricks: Brick[] = []) => {


    const isBricksProvided = Boolean(bricks.length)
    
    const brickGrid: Brick[] = [];

    const brickWidth = canvas.width / columnsNumber;
    const brickHeight = calculateBrickHeight(canvas.height, rowsNumber);


    if(isBricksProvided) {
      
      bricks.forEach((item) => {
        brickGrid.push({
          x: item.x,
          y: item.y,
          width: brickWidth,
          height: brickHeight,
          color: item.color
        })
      })

      return brickGrid
    }




    for (let i = 0; i < columnsNumber; i++) {
      for (let j = 0; j < rowsNumber; j++) {

        brickGrid.push({
            x: i * brickWidth,
            y: j * brickHeight,
            width: brickWidth,
            height: brickHeight,
            color: DEFAULT_BRICK_COLOR
        });
      }
    }

    return brickGrid

}

export const drawBricks = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, bricks: Brick[], grid = true) => {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1;
    console.log("drawCall")
    bricks.forEach((brick: Brick) => {
        context.fillStyle = brick.color;
        if(grid){
          context.strokeStyle = "#000";
          context.strokeRect(brick.x, brick.y, brick.width, brick.height);
        }
        context.fillRect(brick.x, brick.y, brick.width, brick.height);
      });
}