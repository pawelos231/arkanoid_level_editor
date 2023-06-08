import { useState, useCallback } from "react";
import Navabar from "./components/Navbar/Navbar";
import Editor from "./components/Editor/MainEditor";
import {
  DEFAULT_ROWS_COUNT,
  DEFAULT_COLUMNS_COUNT,
} from "./constants/defaultValues";
import { LevelInfo, Level, Brick } from "./interfaces/Level";

function App() {
  const [rowsCount, setRowsCount] = useState(DEFAULT_ROWS_COUNT);
  const [columnsCount, setColumnsCount] = useState(DEFAULT_COLUMNS_COUNT);
  const [brickColor, setBrickColor] = useState("");
  const [gridOpen, setGridOpen] = useState(true);
  const [bricks, setBricks] = useState<Brick[]>([]);

  const generateMapData = useCallback(
    (levelInfo: LevelInfo): Level => {
      const combined = {
        numberOfRows: rowsCount,
        numberOfColumns: columnsCount,
        brickArray: bricks,
      };

      return { ...levelInfo, ...combined };
    },
    [bricks, columnsCount, rowsCount]
  );

  const handleChangeRowsCount = useCallback((rows: number) => {
    setRowsCount(rows);
  }, []);

  const handleChangeColumnsCount = useCallback((columns: number) => {
    setColumnsCount(columns);
  }, []);

  const handleChangeBrickColor = useCallback((color: string) => {
    setBrickColor(color);
  }, []);

  const handleToggleGrid = useCallback((isOpen: boolean) => {
    setGridOpen(isOpen);
  }, []);

  return (
    <div className="wrapper">
      <Navabar
        generateMap={generateMapData}
        changeRowsCount={handleChangeRowsCount}
        changeColumnCount={handleChangeColumnsCount}
        rows={rowsCount}
        columns={columnsCount}
        grid={gridOpen}
        setBrick={handleChangeBrickColor}
        handleGridOpen={handleToggleGrid}
      />
      <Editor
        bricks={bricks}
        setBricks={setBricks}
        columnsCount={columnsCount}
        rowsCount={rowsCount}
        brickColor={brickColor}
        grid={gridOpen}
      />
    </div>
  );
}

export default App;
