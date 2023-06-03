  import { Brick } from "./generateBrickGrid";
  import { drawBricks } from "./generateBrickGrid";
export function handleCanvasClick(
    event: MouseEvent,
    bricks: Brick[],
    canvas: HTMLCanvasElement,
    brickColor: string,
    context: CanvasRenderingContext2D
    ) {
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
    drawBricks(context, canvas, bricks)
}