import withPortal from "../PortalHelper/Portal";
import "./loadLevel.css";
type Props = {
  onClose: (modal: boolean) => void;
};

const LoadLevelModal = withPortal(
  ({ onClose }: Props) => {
    return (
      <div className="loadLevelModal">
        <div className="close" onClick={() => onClose(false)}>
          X
        </div>
        <div>siema</div>
      </div>
    );
  },
  { portalId: "#portal-load-map" }
);

export default LoadLevelModal;
