import "./navbar.css";
import { memo } from "react";
import { MAX_COLUMNS_COUNT, MAX_ROWS_COUNT } from "../constants/defaultValues";

type Props = {
  changeRowsCount: (rows: number) => void;
  changeColumnCount: (columns: number) => void;
  rows: number;
  columns: number;
};

const Navabar = memo(
  ({ changeRowsCount, changeColumnCount, rows, columns }: Props) => {
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
    console.log(rows, columns);

    return (
      <>
        <nav className="navbar">
          <h1>Level editor Menu</h1>
          <div className="grid">
            <input
              type="number"
              value={columns}
              onChange={handleColumnCountChange}
              max={MAX_COLUMNS_COUNT}
            />
            <input
              type="number"
              value={rows}
              onChange={handleRowCountChange}
              max={MAX_ROWS_COUNT}
            />
          </div>{" "}
          <div className="kolor">
            <p>Kolor cegły</p>
          </div>
        </nav>
      </>
    );
  }
);

export default Navabar;
