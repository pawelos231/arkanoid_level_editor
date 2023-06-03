import React, { useRef, useEffect, RefObject } from "react";

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;

    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!context) return;

    context.fillRect(500, 500, 40, 100);

    return () => {
      // Clean up event listeners if necessary
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas;
