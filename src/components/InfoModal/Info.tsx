import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./info.css";

type Props = {
  renderBricks: () => ReactNode;
};

const Info = ({ renderBricks }: Props): JSX.Element | null => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal-info");
    setMounted(true);
  }, []);

  if (!mounted || !ref.current) return null;

  return createPortal(
    <div className="info-modal">
      <div className="close">X</div>
      <div className="data">{renderBricks()}</div>
    </div>,
    ref.current
  );
};

export default Info;
