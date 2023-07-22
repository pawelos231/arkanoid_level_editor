import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LevelInfo } from "../../interfaces/Level";
import {
  DEFAULT_LEVEL_NAME,
  DEFAULT_LEVEL_DESCRIPTION,
  DEFAULT_TIMER_VALUE,
  DEFAULT_LIVES_COUNT,
} from "../../constants/defaultValues";
import { LevelValidator, LevelCreationReq } from "../../validators/saveLevel";
import "./saveLevelModal.css";

type Props = {
  generateMap: (levelInfo: LevelInfo) => void;
  apiResponse: string;
};

const SaveLevelModal = ({ generateMap, apiResponse }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LevelCreationReq>({
    resolver: yupResolver(LevelValidator),
    defaultValues: {
      level: 2,
      levelName: DEFAULT_LEVEL_NAME,
      description: DEFAULT_LEVEL_DESCRIPTION,
      lives: DEFAULT_LIVES_COUNT,
      timer: DEFAULT_TIMER_VALUE,
      bossLevel: false,
      highScore: 0,
      requiredScore: 50,
    },
  });

  const generateObjectForSave = (): LevelInfo => {
    return {
      level: Math.floor(Math.random() * 10),
      lives: watch("lives"),
      timer: watch("timer"),
      bossLevel: watch("bossLevel"),
      description: watch("description"),
      highScore: watch("highScore"),
      requiredScore: watch("requiredScore"),
      levelName: watch("levelName"),
    };
  };

  const onSubmit = () => {
    // Prevent the default form submission behavior
    // and call the generateMap function with the generated level info
    const levelInfo = generateObjectForSave();
    generateMap(levelInfo);
  };

  return (
    <div className="levelSet">
      <div className="message">{apiResponse}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          type="text"
          placeholder="Level Name"
          {...register("levelName")}
        />
        {errors.levelName && (
          <p className="error">{errors.levelName.message}</p>
        )}

        <input type="number" placeholder="Lives" {...register("lives")} />
        {errors.lives && <p className="error">{errors.lives.message}</p>}

        <input
          type="number"
          placeholder="Required Score"
          {...register("requiredScore")}
        />
        {errors.requiredScore && (
          <p className="error">{errors.requiredScore.message}</p>
        )}

        <input
          type="number"
          placeholder="Timer / Max 1 hour, Min 1 minute"
          {...register("timer")}
        />
        {errors.timer && <p className="error">{errors.timer.message}</p>}

        <textarea
          cols={30}
          rows={10}
          placeholder="Description"
          {...register("description")}
        ></textarea>
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}

        <div className="boss">
          <label htmlFor="">Boss Level</label>
          <input
            type="checkbox"
            placeholder="Boss Level"
            {...register("bossLevel")}
          />
        </div>
        <button
          type="submit"
          className="save-level"
          disabled={apiResponse.length !== 0}
        >
          SAVE LEVEL
        </button>
      </form>
    </div>
  );
};

export default SaveLevelModal;
