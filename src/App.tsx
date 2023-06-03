"react";
import Navabar from "./Navbar/Navbar";
import Editor from "./Editor/MainEditor";
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
      />
      <Editor columnsCount={columnsCount} rowsCount={rowsCount} />
    </div>
  );
}

export default App;
