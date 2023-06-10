import "./saveLevelModal.css";
import { useRef, useCallback } from "react";
import { LevelInfo } from "../../interfaces/Level";
import {
  DEFAULT_LEVEL_NAME,
  DEFAULT_LEVEL_DESCRIPTION,
  DEFAULT_TIMER_VALUE,
  DEFAULT_LIVES_COUNT,
} from "../../constants/defaultValues";

type Props = {
  generateMap: (levelInfo: LevelInfo) => void;
};

const SaveLevelModal = ({ generateMap }: Props) => {
  const livesRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<HTMLInputElement>(null);
  const bossLevelRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const highScoreRef = useRef<HTMLInputElement>(null);
  const requiredScoreRef = useRef<HTMLInputElement>(null);
  const levelNameRef = useRef<HTMLInputElement>(null);

  console.log("render");
  const generateObjectForSave = useCallback((): LevelInfo => {
    return {
      level: 2,
      lives: livesRef.current?.valueAsNumber || DEFAULT_LIVES_COUNT,
      timer: timerRef.current?.valueAsNumber || DEFAULT_TIMER_VALUE,
      bossLevel: bossLevelRef.current?.checked || false,
      description: descriptionRef.current?.value || DEFAULT_LEVEL_DESCRIPTION,
      highScore: highScoreRef.current?.valueAsNumber || 0,
      requiredScore: requiredScoreRef.current?.valueAsNumber || 0,
      levelName: levelNameRef.current?.value || DEFAULT_LEVEL_NAME,
    };
  }, []);

  return (
    <div className="levelSet">
      <form className="form">
        <input type="text" placeholder="level name" ref={levelNameRef} />
        <input type="number" placeholder="lives" ref={livesRef} />
        <input type="text" placeholder="requiredScore" ref={requiredScoreRef} />
        <input
          type="number"
          placeholder="timer / max 1 hour min 1 minute"
          min={60}
          max={3600}
          ref={timerRef}
        />
        <textarea
          cols={30}
          rows={10}
          placeholder="description"
          ref={descriptionRef}
        ></textarea>
        <div className="boss">
          <label htmlFor="">Boss Level</label>
          <input type="checkbox" placeholder="boss level" ref={bossLevelRef} />
        </div>
      </form>
      <button
        onClick={() => generateMap(generateObjectForSave())}
        className="save-level"
      >
        SAVE LEVEL
      </button>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default SaveLevelModal;
