import { useRef, useEffect, RefObject } from "react";
import { memo } from "react";
import { generateBrickGrid } from "../helpers/generateBrickGrid";
import { Brick } from "../helpers/generateBrickGrid";
import { handleCanvasClick } from "../helpers/clickBrick";

interface CanvasProps {
  width: number;
  height: number;
  rowsNumber: number;
  columnsNumber: number;
}

const Canvas = memo(
  ({ width, height, rowsNumber, columnsNumber }: CanvasProps) => {
    const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);

    useEffect(() => {
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      if (!canvas) return;

      const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (!context) return;

      const bricks: Brick[] = generateBrickGrid(
        canvas,
        columnsNumber,
        rowsNumber,
        context
      );

      bricks.forEach((brick) => {
        context.fillStyle = "blue";
        context.strokeRect(brick.x, brick.y, brick.width, brick.height);
      });

      canvas.addEventListener("click", (e) =>
        handleCanvasClick(e, bricks, canvas)
      );

      return () => {
        // Clean up event listeners if necessary
      };
    }, [rowsNumber, columnsNumber]);

    return (
      <canvas className="main" ref={canvasRef} width={width} height={height} />
    );
  }
);

export default Canvas;
