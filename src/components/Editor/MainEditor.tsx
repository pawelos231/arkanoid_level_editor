import "./mainEditor.css";
import Canvas from "./Canvas";
import { Brick } from "../../interfaces/Level";
import { BrickData } from "../../interfaces/Level";

type Props = {
  columnsCount: number;
  rowsCount: number;
  brickData: BrickData;
  grid: boolean;
  setBricks: (bricks: Brick[]) => void;
  bricks: Brick[];
};

const Editor = ({
  columnsCount,
  rowsCount,
  brickData,
  grid,
  bricks,
  setBricks,
}: Props) => {
  //console.log("render");
  return (
    <Canvas
      bricks={bricks}
      width={window.innerWidth * 0.8}
      height={window.innerHeight}
      columnsNumber={columnsCount}
      rowsNumber={rowsCount}
      brickData={brickData}
      setBricks={setBricks}
      grid={grid}
    />
  );
};

export default Editor;
