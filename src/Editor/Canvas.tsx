import { useRef, useEffect, RefObject } from "react";
import { memo } from "react";
import { generateBrickGrid } from "../helpers/generateBrickGrid";
import { Brick } from "../helpers/generateBrickGrid";
import { handleCanvasClick } from "../helpers/clickBrick";
import {
  MAX_COLUMNS_COUNT,
  MAX_ROWS_COUNT,
  OUT_OF_RANGE,
} from "../constants/defaultValues";
import NoView from "./NoView";

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
      if (
        rowsNumber > MAX_ROWS_COUNT ||
        columnsNumber > MAX_COLUMNS_COUNT ||
        rowsNumber < 0 ||
        columnsNumber < 0
      ) {
        console.warn(OUT_OF_RANGE);
        return;
      }

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
        context.fillStyle = "#fff";
        context.strokeStyle = "#000";
        context.strokeRect(brick.x, brick.y, brick.width, brick.height);
        context.fillRect(brick.x, brick.y, brick.width, brick.height);
      });

      canvas.addEventListener("click", (e) =>
        handleCanvasClick(e, bricks, canvas)
      );

      return () => {
        // Clean up event listeners if necessary
      };
    }, [rowsNumber, columnsNumber]);

    const rowBool = Boolean(rowsNumber);
    const columnBool = Boolean(columnsNumber);

    if (!rowBool || !columnBool || rowsNumber < 0 || columnsNumber < 0) {
      return <NoView />;
    }

    return (
      <canvas className="main" ref={canvasRef} width={width} height={height} />
    );
  }
);

export default Canvas;
