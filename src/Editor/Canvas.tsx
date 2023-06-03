import { useRef, useEffect, RefObject } from "react";
import { memo } from "react";
import { drawBricks, generateBrickGrid } from "../helpers/generateBrickGrid";
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
  brickColor: string;
}

const Canvas = memo(
  ({ width, height, rowsNumber, columnsNumber, brickColor }: CanvasProps) => {
    const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);

    const OUT_OF_BOUNDS =
      rowsNumber > MAX_ROWS_COUNT ||
      columnsNumber > MAX_COLUMNS_COUNT ||
      rowsNumber < 0 ||
      columnsNumber < 0;

    useEffect(() => {
      const handleResize = (
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D
      ) => {
        const bricks = generateBrickGrid(canvas, columnsNumber, rowsNumber);
        drawBricks(context, canvas, bricks);
      };

      if (OUT_OF_BOUNDS) {
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
        rowsNumber
      );

      const resizeFunc = () => handleResize(canvas, context);

      window.addEventListener("resize", resizeFunc);

      const handleClick = (e: MouseEvent) =>
        handleCanvasClick(e, bricks, canvas, brickColor, context);

      canvas.addEventListener("click", handleClick);

      drawBricks(context, canvas, bricks);

      return () => {
        //
      };
    }, [rowsNumber, columnsNumber, brickColor, OUT_OF_BOUNDS]);

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
