import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { bricksData } from "../../helpers/brickData";
import LoadingState from "./LoadingState";
import "./navbar.css";
import { LevelInfo, BrickData } from "../../interfaces/Level";
import {
  MAX_COLUMNS_COUNT,
  MAX_ROWS_COUNT,
} from "../../constants/defaultValues";
import withCommonModal from "../PortalHelper/CommonModalHOC";
import withPortal from "../PortalHelper/Portal";
const InfoModal = lazy(() => import("../InfoModal/Info"));
const SaveLevelModal = lazy(() => import("../SaveLevelModal/SaveLevelModal"));
const LoadLevelModal = lazy(() => import("../loadLevelModal/loadLevel"));

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

const Navbar = React.memo(
  ({
    changeRowsCount,
    changeColumnCount,
    rows,
    columns,
    setBrick,
    handleGridOpen,
    generateMap,
    grid,
  }: Props) => {
    const [modalInfo, setModalInfo] = useState<boolean>(false);
    const [modalSaveLevel, setModalSaveLevel] = useState<boolean>(false);
    const [modalLoadLevel, setModalLoadLevel] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
      setMounted(true);
    }, []);
    console.log("render");
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

    const handleModalSaveLevel = useCallback((modal: boolean) => {
      setModalSaveLevel(modal);
    }, []);

    const handleModalInfo = useCallback(() => {
      setModalInfo((prevModalOpen) => !prevModalOpen);
    }, []);

    const handleModalLoadLevel = useCallback(() => {
      setModalLoadLevel((prevModalOpen) => !prevModalOpen);
    }, []);

    const WrappedLoadLevelModal = withPortal(withCommonModal(LoadLevelModal), {
      portalId: "#portal-load-map",
    });

    const WrappedSaveLevelModal = withPortal(withCommonModal(SaveLevelModal), {
      portalId: "#portal-save-map",
    });

    const renderBricks = useCallback(() => {
      return bricksData().map((brick: BrickData) => (
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
        <h1>Level Editor Menu</h1>
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
              <p>Delete Grid</p>{" "}
              <input onChange={() => handleGridOpen(!grid)} type="checkbox" />
            </div>
            <button className="delete">Delete Progress</button>
            <button
              className="save"
              onClick={() => handleModalSaveLevel(!modalSaveLevel)}
            >
              Save Progress
            </button>
            <button className="wczytaj" onClick={() => handleModalLoadLevel()}>
              Wczytaj Progress
            </button>
          </div>
        </div>
        <div className="color">
          <div className="brickColor">
            <p>Available Bricks</p>
            <p onClick={handleModalInfo}>Info</p>
          </div>
          <div className="brickContainer">{renderBricks()}</div>
        </div>
        {modalInfo && (
          <Suspense fallback={<LoadingState />}>
            <InfoModal onClose={handleModalInfo} bricksData={bricksData} />
          </Suspense>
        )}
        {modalSaveLevel && (
          <Suspense fallback={<LoadingState />}>
            <WrappedSaveLevelModal
              onClose={handleModalSaveLevel}
              generateMap={generateMap}
            />
          </Suspense>
        )}
        {modalLoadLevel && (
          <Suspense fallback={<LoadingState />}>
            <WrappedLoadLevelModal onClose={handleModalLoadLevel} />
          </Suspense>
        )}
      </nav>
    );
  }
);

export default Navbar;
