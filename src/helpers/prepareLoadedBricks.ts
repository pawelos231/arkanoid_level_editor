import { Brick } from "../interfaces/Level";
import { calculateBrickHeight } from "./calculateBrickHeight";

type Combination = {
  bricks: Brick[];
  columns: number;
  rows: number;
};

export const bricksLoader = (contents: string): Combination | null => {
  if (!contents) return null;

  let bricks: Brick[];
  try {
    const parsedData = JSON.parse(contents);
    if (!Array.isArray(parsedData.brickArray)) {
      console.error(
        "Invalid file contents. 'brickArray' is missing or not an array."
      );
      return null;
    }
    bricks = parsedData.brickArray;
  } catch (error) {
    console.error("Error parsing JSON file contents:", error);
    return null;
  }

  let rows = 0;
  let columns = 0;
  for (const item of bricks) {
    if (
      typeof item.rowNumber !== "number" ||
      typeof item.columnNumber !== "number"
    ) {
      console.error(
        "Invalid brick data. 'rowNumber' or 'columnNumber' is missing or not a number."
      );
      return null;
    }
    rows = Math.max(rows, item.rowNumber);
    columns = Math.max(columns, item.columnNumber);
  }
  rows += 1;
  columns += 1;

  const brickWidth = (window.innerWidth * 0.8) / columns;
  const brickHeight = calculateBrickHeight(window.innerHeight, rows);

  return {
    bricks: bricks.map((item: Brick) => ({
      rowNumber: item.rowNumber,
      columnNumber: item.columnNumber,
      x: item.columnNumber * brickWidth,
      y: item.rowNumber * brickHeight,
      width: brickWidth,
      height: brickHeight,
      color: item.color,
      timesToHit: item.timesToHit,
      points: item.points,
      buffDropRate: item.buffDropRate,
    })),
    rows: rows,
    columns: columns,
  };
};
