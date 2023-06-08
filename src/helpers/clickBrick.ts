import { Brick } from "../interfaces/Level";
import { DEFAULT_BRICK_COLOR } from "../constants/defaultValues";

export function handleCanvasClick(
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  bricks: Brick[],
  canvas: HTMLCanvasElement,
  brickColor: string
): Brick[] {
  const canvasRect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - canvasRect.left;
  const mouseY = event.clientY - canvasRect.top;

  return bricks.map((brick) => {
    const isBrick =
      mouseX >= brick.x &&
      mouseX <= brick.x + brick.width &&
      mouseY >= brick.y &&
      mouseY <= brick.y + brick.height;

    if (isBrick) {
      brick.color = brick.color !== DEFAULT_BRICK_COLOR && (brickColor.length === 0 || brick.color === brickColor)
        ? DEFAULT_BRICK_COLOR
        : brickColor;
    }

    return brick;
  });
}
