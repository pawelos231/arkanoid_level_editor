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

  const OUT_OF_BOUNDS: boolean =
    rowsNumber > MAX_ROWS_COUNT ||
    columnsNumber > MAX_COLUMNS_COUNT ||
    rowsNumber <= 0 ||
    columnsNumber <= 0;

  useEffect(() => {
    if (OUT_OF_BOUNDS) {
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

    const handleResize = () => {
      const resizedBricks: Brick[] = generateBrickGrid(
        canvas,
        columnsNumber,
        rowsNumber
      );
      setBricks(resizedBricks);
      drawBricks(context, canvas, resizedBricks);
    };

    window.addEventListener("resize", handleResize);

    setCanvasContext({ canvas, context });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [rowsNumber, columnsNumber, OUT_OF_BOUNDS]);

  useEffect(() => {
    const { context, canvas } = canvasContext;
    if (!context || !canvas) return;
    drawBricks(context, canvas, bricks, grid);
  }, [grid, bricks, canvasContext]);

  type ClickReactEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

  const handleClick = useCallback(
    (e: ClickReactEvent): void => {
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
    [bricks, canvasRef, brickColor]
  );

  if (OUT_OF_BOUNDS) {
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
