  import { Brick } from "./generateBrickGrid";
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
        if (
        mouseX >= brick.x &&
        mouseX <= brick.x + brick.width &&
        mouseY >= brick.y &&
        mouseY <= brick.y + brick.height
        ) {
            brick.color = brickColor
            console.log(brick)
        }
    });
    return bricks
}