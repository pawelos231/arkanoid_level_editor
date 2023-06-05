import "./navbar.css";
import {
  MAX_COLUMNS_COUNT,
  MAX_ROWS_COUNT,
} from "../../constants/defaultValues";
import { bricksData } from "../../helpers/brickData";
import { BrickData } from "../../helpers/brickData";

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

  const handleBrickChoose = (brick: BrickData) => {
    setBrick(brick.color);
  };

  const renderBricks = () => {
    return bricksData().map((brick) => (
      <div
        key={brick.color}
        onClick={() => handleBrickChoose(brick)}
        className="brick"
        style={{ backgroundColor: brick.color }}
      ></div>
    ));
  };

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
            <p>{grid ? "Delete grid" : "Set grid"}</p>{" "}
            <input onChange={() => handleGridOpen(!grid)} type="checkbox" />
          </div>
          <button className="delete">DELETE</button>
        </div>
      </div>
      <div className="kolor">
        <p>Brick color</p>
        <div className="brickContainer">{renderBricks()}</div>
      </div>
    </nav>
  );
};

export default Navbar;
