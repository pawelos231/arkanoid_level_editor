/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useMemo } from "react";
import Navbar from "./components/Navbar/Navbar";
import Editor from "./components/Editor/MainEditor";
import {
  DEFAULT_ROWS_COUNT,
  DEFAULT_COLUMNS_COUNT,
} from "./constants/defaultValues";
import { LevelInfo, Level, Brick, BrickToLevelSave } from "./interfaces/Level";

function App() {
  const [rowsCount, setRowsCount] = useState(DEFAULT_ROWS_COUNT);
  const [columnsCount, setColumnsCount] = useState(DEFAULT_COLUMNS_COUNT);
  const [brickColor, setBrickColor] = useState("");
  const [gridOpen, setGridOpen] = useState(true);
  const [bricks, setBricks] = useState<Brick[]>([]);

  const dependency = JSON.stringify(
    bricks.map((item: Brick) => [item.color, item.rowNumber, item.columnNumber])
  );

  const filtered = useMemo(() => {
    return bricks.map((item: Brick) => {
      const { color, rowNumber, columnNumber } = item;
      const filteredObject: BrickToLevelSave = {
        color,
        rowNumber,
        columnNumber,
      };
      return filteredObject;
    });
  }, [dependency]);

  const generateMapData = useCallback(
    async (levelInfo: LevelInfo): Promise<Level> => {
      const levelMap = {
        ...levelInfo,
        numberOfRows: rowsCount,
        numberOfColumns: columnsCount,
        brickArray: filtered,
      };
      await fetch("http://localhost:3002/sendLevelData", {
        method: "POST",
        body: JSON.stringify(levelMap),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      return levelMap;
    },
    [columnsCount, rowsCount, filtered]
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
      <Navbar
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
