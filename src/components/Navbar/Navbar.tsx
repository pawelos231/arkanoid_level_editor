import "./navbar.css";
import { memo } from "react";
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
  rows: number;
  columns: number;
};

const Navabar = memo(
  ({ changeRowsCount, changeColumnCount, rows, columns, setBrick }: Props) => {
    const handleColumnCountChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = parseInt(event.target.value);
      changeColumnCount(value);
    };

    const handleRowCountChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = parseInt(event.target.value);
      changeRowsCount(value);
    };

    const handleBrickChoose = (brick: BrickData) => {
      setBrick(brick.color);
    };

    return (
      <>
        <nav className="navbar">
          <h1>Level editor Menu</h1>
          <div className="grid">
            <div>
              <p>columns</p>
              <input
                type="number"
                value={columns}
                onChange={handleColumnCountChange}
                max={MAX_COLUMNS_COUNT}
              />
            </div>
            <div>
              <p>rows</p>
              <input
                type="number"
                value={rows}
                onChange={handleRowCountChange}
                max={MAX_ROWS_COUNT}
              />
            </div>
          </div>{" "}
          <div className="kolor">
            <p>Brick color</p>
            <div className="brickContainer">
              {bricksData().map((brick) => {
                return (
                  <div
                    key={brick.color}
                    onClick={() => handleBrickChoose(brick)}
                    className="brick"
                    style={{ backgroundColor: brick.color }}
                  ></div>
                );
              })}
            </div>
          </div>
        </nav>
      </>
    );
  }
);

export default Navabar;
