import withPortal from "../PortalHelper/Portal";
import "./saveLevelModal.css";
const SaveLevelModal = withPortal(
  () => {
    return <div className="saveLevelModal">Save level</div>;
  },
  { portalId: "#portal-save-map" }
);

export default SaveLevelModal;
