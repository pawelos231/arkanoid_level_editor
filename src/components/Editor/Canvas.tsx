import { useRef, useEffect, RefObject, useState, useCallback } from "react";
import { memo } from "react";
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

const Canvas = memo(
  ({
    width,
    height,
    rowsNumber,
    columnsNumber,
    brickColor,
    grid,
  }: CanvasProps) => {
    const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
    const [bricks, setBricks] = useState<Brick[]>([]);
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();
    const [context, setContext] = useState<CanvasRenderingContext2D>();

    const OUT_OF_BOUNDS =
      rowsNumber > MAX_ROWS_COUNT ||
      columnsNumber > MAX_COLUMNS_COUNT ||
      rowsNumber < 0 ||
      columnsNumber < 0;

    useEffect(() => {
      if (OUT_OF_BOUNDS) {
        console.warn(OUT_OF_RANGE);
        return;
      }

      const canvas: HTMLCanvasElement | null = canvasRef.current;
      if (!canvas) return;
      setCanvas(canvas);

      const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (!context) return;
      setContext(context);

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

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [rowsNumber, columnsNumber, OUT_OF_BOUNDS]);

    useEffect(() => {
      if (!context || !canvas) return;
      drawBricks(context, canvas, bricks, grid);
    }, [grid, bricks, context, canvas]);

    type ClickReactEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

    const handleClick = useCallback(
      (e: ClickReactEvent): void => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (!canvas) return;

        const context: CanvasRenderingContext2D | null =
          canvas.getContext("2d");

        if (!context) return;

        const newBricks: Brick[] = handleCanvasClick(
          e,
          JSON.parse(JSON.stringify(bricks)),
          canvas,
          brickColor
        );
        setBricks(newBricks);
      },
      [bricks, canvasRef, brickColor]
    );

    if (rowsNumber <= 0 || columnsNumber <= 0) {
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
  }
);

export default Canvas;
