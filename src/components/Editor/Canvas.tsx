import { useRef, useEffect, RefObject, useState } from "react";
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
}

const Canvas = memo(
  ({ width, height, rowsNumber, columnsNumber, brickColor }: CanvasProps) => {
    const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
    const [bricks, setBricks] = useState<Brick[]>([]);

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

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [rowsNumber, columnsNumber, OUT_OF_BOUNDS]);

    const handleClick = (
      e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ): void => {
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      if (!canvas) return;
      const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (!context) return;

      const newBricks: Brick[] = handleCanvasClick(
        e,
        JSON.parse(JSON.stringify(bricks)),
        canvas,
        brickColor
      );
      setBricks(newBricks);
      drawBricks(context, canvas, newBricks);
    };

    const rowBool = Boolean(rowsNumber);
    const columnBool = Boolean(columnsNumber);

    if (!rowBool || !columnBool || rowsNumber < 0 || columnsNumber < 0) {
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
