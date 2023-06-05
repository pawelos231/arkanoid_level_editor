  import { Brick } from "./generateBrickGrid";
  import { DEFAULT_BRICK_COLOR } from "../constants/defaultValues";
export function handleCanvasClick(
    event:  React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    bricks: Brick[],
    canvas: HTMLCanvasElement,
    brickColor: string,
    ): Brick[] {
    const canvasRect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;


    bricks.forEach((brick) => {

        const isBrick =  mouseX >= brick.x &&
        mouseX <= brick.x + brick.width &&
        mouseY >= brick.y &&
        mouseY <= brick.y + brick.height

        if (isBrick) {

            if(brick.color !== DEFAULT_BRICK_COLOR && (brickColor.length == 0 || brick.color == brickColor)){
                brick.color = DEFAULT_BRICK_COLOR
            } else {
                brick.color = brickColor
            }

      
        }
    });
    return bricks
}