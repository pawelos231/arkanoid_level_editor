import { Brick, BrickData } from "../interfaces/Level";
import { DEFAULT_BRICK_COLOR } from "../constants/defaultValues";

export function handleCanvasClick(
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  bricks: Brick[],
  canvas: HTMLCanvasElement,
  brickData: BrickData
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
      const wr =
        brick.color !== DEFAULT_BRICK_COLOR &&
        (brickData.color.length === 0 || brick.color === brickData.color);

      if (wr) {
        brick.color = DEFAULT_BRICK_COLOR;
        brick.buffDropRate = 0;
        brick.points = 0;
        brick.timesToHit = 0;
      } else {
        brick.color = brickData.color;
        brick.buffDropRate = brickData.buffDropRate;
        brick.points = brickData.points;
        brick.timesToHit = brickData.timesToHit;
      }
    }

    return brick;
  });
}
