import { createPortal } from "react-dom";
import { useRef, useState, useEffect } from "react";
import "./info.css";
import BrickInfoModal from "./brickInfoModal";
import { BrickData } from "../../interfaces/Level";

type Props = {
  bricksData: () => BrickData[];
  onClose: (modal: boolean) => void;
};

const Info = ({ onClose, bricksData }: Props): JSX.Element | null => {
  
  const ref = useRef<Element | null>(null);

  const [mounted, setMounted] = useState<boolean>(false);
  const [brick, setBrick] = useState<BrickData | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const showBrickInfo = (brick: BrickData) => {
    setBrick(brick);
    setModal(true);
  };

  const renderInfoBricks = () => {
    return bricksData().map((brick) => (
      <div
        key={brick.color}
        onClick={() => showBrickInfo(brick)}
        className="brickInfo"
        style={{ backgroundColor: brick.color }}
      ></div>
    ));
  };

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal-info");
    setMounted(true);
  }, []);

  if (!mounted || !ref.current) return null;

  return createPortal(
    <div className="info-modal">
      <div onClick={() => onClose(false)} className="close">
        X
      </div>
      <div className="data">{renderInfoBricks()}</div>
      {brick && modal && <BrickInfoModal brick={brick} onClose={setModal} />}
    </div>,
    ref.current
  );
};

export default Info;
