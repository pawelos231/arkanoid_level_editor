import "./mainEditor.css";
import Canvas from "./Canvas";

type Props = {
  columnsCount: number;
  rowsCount: number;
};

const Editor = ({ columnsCount, rowsCount }: Props) => {
  return (
    <Canvas
      width={1000}
      height={1000}
      columnsNumber={columnsCount}
      rowsNumber={rowsCount}
    />
  );
};

export default Editor;
