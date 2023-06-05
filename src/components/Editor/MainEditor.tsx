import "./mainEditor.css";
import Canvas from "./Canvas";

type Props = {
  columnsCount: number;
  rowsCount: number;
  brickColor: string;
  grid: boolean;
};

const Editor = ({ columnsCount, rowsCount, brickColor, grid }: Props) => {
  return (
    <Canvas
      width={window.innerWidth * 0.8}
      height={window.innerHeight}
      columnsNumber={columnsCount}
      rowsNumber={rowsCount}
      brickColor={brickColor}
      grid={grid}
    />
  );
};

export default Editor;
