import { calculateBrickHeight } from "./calculateBrickHeight";
import { DEFAULT_BRICK_COLOR } from "../constants/defaultValues";
import { Brick } from "../interfaces/Level";

export const generateBrickGrid = (canvas: HTMLCanvasElement , columnsNumber: number, rowsNumber: number, bricks: Brick[] = []) => {


    const isBricksProvided = Boolean(bricks.length)
    
    const brickGrid: Brick[] = [];

    const brickWidth = canvas.width / columnsNumber;
    const brickHeight = calculateBrickHeight(canvas.height, rowsNumber);


    if(isBricksProvided) {
      bricks.forEach((item) => {
        brickGrid.push({
          rowNumber: item.rowNumber,
          columnNumber: item.columnNumber,
          x: (item.x / item.width) * brickWidth,
          y: (item.y / item.height) * brickHeight,
          width: brickWidth,
          height: brickHeight,
          color: item.color,
          timesToHit: item.timesToHit, 
          points: item.points, 
          buffDropRate:item.buffDropRate

        })
      })

      return brickGrid
    }

    for (let i = 0; i < columnsNumber; i++) {
      for (let j = 0; j < rowsNumber; j++) {

        brickGrid.push({
            rowNumber: j,
            columnNumber: i,
            x: i * brickWidth,
            y: j * brickHeight,
            width: brickWidth,
            height: brickHeight,
            color: DEFAULT_BRICK_COLOR,
            timesToHit: 0, 
            points: 0, 
            buffDropRate:0
            
        });
      }
    }

    return brickGrid

}

export const drawBricks = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, bricks: Brick[], grid = true) => {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1;
    bricks.forEach((brick: Brick) => {
        context.fillStyle = brick.color;
        if(grid){
          context.strokeStyle = "#000";
          context.strokeRect(brick.x, brick.y, brick.width, brick.height);
        }
        context.fillRect(brick.x, brick.y, brick.width, brick.height);
      });
}