"react";
import Navabar from "./components/Navbar/Navbar";
import Editor from "./components/Editor/MainEditor";
import { useState, useCallback } from "react";
import {
  DEFAULT_ROWS_COUNT,
  DEFAULT_COLUMNS_COUNT,
} from "./constants/defaultValues";

function App() {
  const [rowsCount, setRowsCount] = useState<number>(DEFAULT_ROWS_COUNT);
  const [columnsCount, setColumnsCount] = useState<number>(
    DEFAULT_COLUMNS_COUNT
  );
  const [brickColor, setBrick] = useState<string>("");
  const [grid, handleGridOpen] = useState<boolean>(true);

  return (
    <div className="wrapper">
      <Navabar
        changeRowsCount={useCallback((rows: number) => setRowsCount(rows), [])}
        changeColumnCount={useCallback(
          (columns: number) => setColumnsCount(columns),
          []
        )}
        rows={rowsCount}
        columns={columnsCount}
        grid={grid}
        setBrick={useCallback((brick: string) => setBrick(brick), [])}
        handleGridOpen={useCallback(
          (gridState: boolean) => handleGridOpen(gridState),
          []
        )}
      />
      <Editor
        columnsCount={columnsCount}
        rowsCount={rowsCount}
        brickColor={brickColor}
        grid={grid}
      />
    </div>
  );
}

export default App;
