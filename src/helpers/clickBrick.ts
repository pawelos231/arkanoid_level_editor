  import { Brick } from "./generateBrickGrid";
export function handleCanvasClick(
    event: MouseEvent,
    bricks: Brick[],
    canvas: HTMLCanvasElement
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
            console.log("Brick clicked:", brick);
        }
    });
}