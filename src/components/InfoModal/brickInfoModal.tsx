import { BrickData } from "../../helpers/brickData";

type Props = { brick: BrickData; onClose: (modal: boolean) => void };
const BrickInfoModal = ({ brick, onClose }: Props) => {
  return (
    <div className="brickInfoModal">
      <div className="inner" onClick={() => onClose(false)}>
        {Object.entries(brick).map((values) => {
          return (
            <div className="valuesOfBrick">
              <div>{values[0]}:</div>
              <div>{values[1]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrickInfoModal;
