import "./mainEditor.css";
import Canvas from "./Canvas";

type Props = {
  columnsCount: number;
  rowsCount: number;
  brickColor: string;
};

const Editor = ({ columnsCount, rowsCount, brickColor }: Props) => {
  return (
    <Canvas
      width={window.innerWidth * 0.8}
      height={window.innerHeight}
      columnsNumber={columnsCount}
      rowsNumber={rowsCount}
      brickColor={brickColor}
    />
  );
};

export default Editor;
