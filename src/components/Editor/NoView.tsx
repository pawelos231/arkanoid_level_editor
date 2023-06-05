import "./NoView.css";
import { OUT_OF_RANGE } from "../../constants/defaultValues";

const NoView = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__heading">{OUT_OF_RANGE}</h1>
      <p className="not-found__message">you tried something silly bra</p>
    </div>
  );
};

export default NoView;
