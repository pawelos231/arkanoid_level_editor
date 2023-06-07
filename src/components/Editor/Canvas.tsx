import { useRef, useEffect, RefObject, useState, useCallback } from "react";
import { drawBricks, generateBrickGrid } from "../../helpers/generateBrickGrid";
import { Brick } from "../../helpers/generateBrickGrid";
import { handleCanvasClick } from "../../helpers/clickBrick";
import {
  MAX_COLUMNS_COUNT,
  MAX_ROWS_COUNT,
  OUT_OF_RANGE,
} from "../../constants/defaultValues";
import NoView from "./NoView";

interface CanvasProps {
  width: number;
  height: number;
  rowsNumber: number;
  columnsNumber: number;
  brickColor: string;
  grid: boolean;
}

interface CanvasContextState {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
}

const Canvas = ({
  width,
  height,
  rowsNumber,
  columnsNumber,
  brickColor,
  grid,
}: CanvasProps) => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const [bricks, setBricks] = useState<Brick[]>([]);
  const [canvasContext, setCanvasContext] = useState<CanvasContextState>({
    canvas: null,
    context: null,
  });

  const isOutOfBounds =
    rowsNumber > MAX_ROWS_COUNT ||
    columnsNumber > MAX_COLUMNS_COUNT ||
    rowsNumber <= 0 ||
    columnsNumber <= 0;

  useEffect(() => {
    if (isOutOfBounds) {
      console.warn(OUT_OF_RANGE);
      return;
    }

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!context) return;

    const generatedBricks: Brick[] = generateBrickGrid(
      canvas,
      columnsNumber,
      rowsNumber
    );

    setBricks(generatedBricks);
    drawBricks(context, canvas, generatedBricks);

    setCanvasContext({ canvas, context });
  }, [rowsNumber, columnsNumber, isOutOfBounds]);

  useEffect(() => {
    const { context, canvas } = canvasContext;
    if (!context || !canvas) return;
    drawBricks(context, canvas, bricks, grid);
  }, [grid, bricks, canvasContext]);

  useEffect(() => {
    const handleResize = () => {
      if (!canvasContext.canvas || !canvasContext.context) {
        throw new Error("canvas does not exist");
      }

      const resizedBricks: Brick[] = generateBrickGrid(
        canvasContext.canvas,
        columnsNumber,
        rowsNumber,
        bricks.map((brick) => ({ ...brick }))
      );
      setBricks(resizedBricks);
      drawBricks(canvasContext.context, canvasContext.canvas, resizedBricks);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [bricks, columnsNumber, rowsNumber, canvasContext]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      if (!canvas) return;
      const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (!context) return;

      const newBricks: Brick[] = handleCanvasClick(
        e,
        bricks.map((brick) => ({ ...brick })),
        canvas,
        brickColor
      );
      setBricks(newBricks);
    },
    [bricks, brickColor]
  );

  if (isOutOfBounds) {
    return <NoView />;
  }

  return (
    <canvas
      className="main"
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
    />
  );
};

export default Canvas;
