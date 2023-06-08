import "./mainEditor.css";
import Canvas from "./Canvas";
import { Brick } from "../../interfaces/Level";

type Props = {
  columnsCount: number;
  rowsCount: number;
  brickColor: string;
  grid: boolean;
  setBricks: (bricks: Brick[]) => void;
  bricks: Brick[];
};

const Editor = ({
  columnsCount,
  rowsCount,
  brickColor,
  grid,
  bricks,
  setBricks,
}: Props) => {
  console.log("render");
  return (
    <Canvas
      bricks={bricks}
      width={window.innerWidth * 0.8}
      height={window.innerHeight}
      columnsNumber={columnsCount}
      rowsNumber={rowsCount}
      brickColor={brickColor}
      setBricks={setBricks}
      grid={grid}
    />
  );
};

export default Editor;
