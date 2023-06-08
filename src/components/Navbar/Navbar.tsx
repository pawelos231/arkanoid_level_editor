import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import {
  MAX_COLUMNS_COUNT,
  MAX_ROWS_COUNT,
} from "../../constants/defaultValues";
import { bricksData } from "../../helpers/brickData";
import LoadingState from "./LoadingState";
import "./navbar.css";
import {
  DEFAULT_LEVEL_NAME,
  DEFAULT_LEVEL_DESCRIPTION,
  DEFAULT_TIMER_VALUE,
  DEFAULT_LIVES_COUNT,
} from "../../constants/defaultValues";
import { LevelInfo, BrickData } from "../../interfaces/Level";
const Info = lazy(() => import("../InfoModal/Info"));

type Props = {
  changeRowsCount: (rows: number) => void;
  changeColumnCount: (columns: number) => void;
  setBrick: (brick: string) => void;
  handleGridOpen: (gridState: boolean) => void;
  generateMap: (levelInfo: LevelInfo) => void;
  rows: number;
  grid: boolean;
  columns: number;
};

const Navbar: React.FC<Props> = ({
  changeRowsCount,
  changeColumnCount,
  rows,
  columns,
  setBrick,
  handleGridOpen,
  generateMap,
  grid,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(DEFAULT_LIVES_COUNT);
  const [timer, setTimer] = useState<number>(DEFAULT_TIMER_VALUE);
  const [bossLevel, setBossLevel] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(
    DEFAULT_LEVEL_DESCRIPTION
  );
  const [highScore, setHighScore] = useState<number>(0);
  const [requiredScore, setRequiredScore] = useState<number>(0);
  const [levelName, setLevelName] = useState<string>(DEFAULT_LEVEL_NAME);

  useEffect(() => {
    setMounted(true);
  }, []);

  const GenerateObjectForSave = (): LevelInfo => {
    return {
      level: 2,
      lives,
      timer,
      bossLevel,
      description,
      highScore,
      requiredScore,
      levelName,
    };
  };

  const handleColumnCountInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    changeColumnCount(value);
  };

  const handleRowCountInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    changeRowsCount(value);
  };

  const handleBrickChoose = useCallback(
    (brick: BrickData) => {
      setBrick(brick.color);
    },
    [setBrick]
  );

  const handleModal = useCallback(() => {
    setModalOpen((prevModalOpen) => !prevModalOpen);
  }, []);

  const renderBricks = useCallback(() => {
    return bricksData().map((brick) => (
      <div
        key={brick.color}
        onClick={() => handleBrickChoose(brick)}
        className="brick"
        style={{ backgroundColor: brick.color }}
      ></div>
    ));
  }, [handleBrickChoose]);

  if (!mounted) return null;

  return (
    <nav className="navbar">
      <h1>Level editor Menu</h1>
      <div className="grid">
        <div className="columns">
          <p>Columns</p>
          <input
            type="number"
            value={columns}
            onChange={handleColumnCountInputChange}
            max={MAX_COLUMNS_COUNT}
          />
        </div>
        <div className="rows">
          <p>Rows</p>
          <input
            type="number"
            value={rows}
            onChange={handleRowCountInputChange}
            max={MAX_ROWS_COUNT}
          />
        </div>
        <div className="checkers">
          <div>
            <p>Delete grid</p>{" "}
            <input onChange={() => handleGridOpen(!grid)} type="checkbox" />
          </div>
          <button className="delete">DELETE PROGRESS</button>
          <button
            className="save"
            onClick={() => generateMap(GenerateObjectForSave())}
          >
            SAVE PROGRESS
          </button>
        </div>
      </div>
      <div className="kolor">
        <div className="brickColor">
          <p>Available bricks</p>
          <p onClick={handleModal}>info</p>
        </div>
        <div className="brickContainer">{renderBricks()}</div>
      </div>
      {modalOpen && (
        <Suspense fallback={<LoadingState />}>
          <Info bricksData={bricksData} onClose={handleModal} />
        </Suspense>
      )}
    </nav>
  );
};

export default Navbar;
