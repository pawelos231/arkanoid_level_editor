import "./navbar.css";
import {
  MAX_COLUMNS_COUNT,
  MAX_ROWS_COUNT,
} from "../../constants/defaultValues";
import { bricksData, BrickData } from "../../helpers/brickData";
import { useState, useEffect, useCallback, Suspense, lazy } from "react";
const Info = lazy(() => import("../InfoModal/Info"));

type Props = {
  changeRowsCount: (rows: number) => void;
  changeColumnCount: (columns: number) => void;
  setBrick: (brick: string) => void;
  handleGridOpen: (gridState: boolean) => void;
  rows: number;
  grid: boolean;
  columns: number;
};

const Navbar = ({
  changeRowsCount,
  changeColumnCount,
  rows,
  columns,
  setBrick,
  handleGridOpen,
  grid,
}: Props) => {
  const [modal, handleOpenModal] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

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

  const handleModal = useCallback((modal: boolean) => {
    handleOpenModal(modal);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderBricks = useCallback(() => {
    return bricksData().map((brick) => (
      <div
        key={brick.color}
        onClick={() => handleBrickChoose(brick)}
        className={"brick"}
        style={{ backgroundColor: brick.color }}
      ></div>
    ));
  }, [handleBrickChoose]);

  if (!mounted) return null;

  return (
    <nav className="navbar">
      <h1>Level editor Menu</h1>
      <div className="grid">
        <div>
          <p>Columns</p>
          <input
            type="number"
            value={columns}
            onChange={handleColumnCountInputChange}
            max={MAX_COLUMNS_COUNT}
          />
        </div>
        <div>
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
        </div>
      </div>
      <div className="kolor">
        <div className="brickColor">
          <p>Brick Color</p>
          <p onClick={() => handleOpenModal(!modal)}>info</p>
        </div>
        <div className="brickContainer">{renderBricks()}</div>
      </div>
      {modal ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Info bricksData={bricksData} onClose={handleModal} />
        </Suspense>
      ) : null}
    </nav>
  );
};

export default Navbar;
