import { useRef, useEffect, RefObject, useState, useCallback } from "react";
import { drawBricks, generateBrickGrid } from "../../helpers/generateBrickGrid";
import { handleCanvasClick } from "../../helpers/clickBrick";
import {
  MAX_COLUMNS_COUNT,
  MAX_ROWS_COUNT,
  OUT_OF_RANGE,
} from "../../constants/defaultValues";
import NoView from "./NoView";
import { Brick, BrickData } from "../../interfaces/Level";
import useResize from "../../hooks/useResize";

interface CanvasProps {
  width: number;
  height: number;
  rowsNumber: number;
  columnsNumber: number;
  brickData: BrickData;
  grid: boolean;
  bricks: Brick[];
  setBricks: (bricks: Brick[]) => void;
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
  brickData,
  grid,
  bricks,
  setBricks,
}: CanvasProps) => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const [canvasContext, setCanvasContext] = useState<CanvasContextState>({
    canvas: null,
    context: null,
  });

  const isOutOfBounds =
    rowsNumber > MAX_ROWS_COUNT ||
    columnsNumber > MAX_COLUMNS_COUNT ||
    rowsNumber <= 0 ||
    columnsNumber <= 1;

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
      canvas.width,
      canvas.height,
      columnsNumber,
      rowsNumber
    );

    setBricks(generatedBricks);
    drawBricks(context, canvas, generatedBricks, rowsNumber, columnsNumber);

    setCanvasContext({ canvas, context });
  }, [rowsNumber, columnsNumber, isOutOfBounds, setBricks]);

  useEffect(() => {
    const { context, canvas } = canvasContext;
    if (!context || !canvas) return;
    drawBricks(context, canvas, bricks, rowsNumber, columnsNumber, grid);
  }, [grid, canvasContext, bricks, columnsNumber, rowsNumber]);

  useResize(8, () => {
    if (!canvasContext.canvas || !canvasContext.context) {
      throw new Error("canvas does not exist");
    }
    const resizedBricks: Brick[] = generateBrickGrid(
      canvasContext.canvas.width,
      canvasContext.canvas.height,
      columnsNumber,
      rowsNumber,
      bricks.map((brick) => ({ ...brick }))
    );
    setBricks(resizedBricks);
    drawBricks(
      canvasContext.context,
      canvasContext.canvas,
      resizedBricks,
      rowsNumber,
      columnsNumber
    );
  });

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
        brickData
      );
      setBricks(newBricks);
    },
    [bricks, setBricks, brickData]
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
