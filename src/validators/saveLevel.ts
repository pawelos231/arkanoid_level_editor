import * as yup from "yup";

const DEFAULT_MIN_DESCRIPTION = 50;
const DEFAULT_MAX_DESCRIPTION = 300;
const DEFAULT_MIN_LIVES = 3;
const DEFAULT_MAX_LIVES = 50;
const DEFAULT_MIN_REQ_SCORE = 50;
const DEFAULT_MAX_REQ_SCORE = 1500;
const DEFAULT_MIN_LEVEL_NAME = 5;
const DEFAULT_MAX_LEVEL_NAME = 25;
const DEFAULT_MAX_TIMER_COUNT = 3600;
const DEFAULT_MIN_TIMER_COUNT = 60;

export const LevelValidator = yup
  .object()
  .shape({
    level: yup.number().required("level is required"),
    lives: yup
      .number()
      .required("lives number is required")
      .min(DEFAULT_MIN_LIVES, `lives must have at least ${DEFAULT_MIN_LIVES}`)
      .max(DEFAULT_MAX_LIVES, `lives can have at most ${DEFAULT_MAX_LIVES}`),
    bossLevel: yup
      .bool()
      .required("you must provide if the level is boss level"),
    description: yup
      .string()
      .required("you must provide description")
      .min(
        DEFAULT_MIN_DESCRIPTION,
        `min length of description is ${DEFAULT_MIN_DESCRIPTION}`
      )
      .max(
        DEFAULT_MAX_DESCRIPTION,
        `max length of sescription is ${DEFAULT_MAX_DESCRIPTION}`
      ),
    requiredScore: yup
      .number()
      .required("you must provide requiredScore")
      .min(
        DEFAULT_MIN_REQ_SCORE,
        `min score must be atleast ${DEFAULT_MIN_REQ_SCORE}`
      )
      .max(
        DEFAULT_MAX_REQ_SCORE,
        `max score can be at most ${DEFAULT_MAX_REQ_SCORE}`
      ),
    levelName: yup
      .string()
      .required("You must provide level name")
      .min(
        DEFAULT_MIN_LEVEL_NAME,
        `level name must be at least ${DEFAULT_MIN_LEVEL_NAME} characters`
      )
      .max(
        DEFAULT_MAX_LEVEL_NAME,
        `level name must be at most ${DEFAULT_MAX_LEVEL_NAME} characters`
      ),
    timer: yup
      .number()
      .required()
      .min(
        DEFAULT_MIN_TIMER_COUNT,
        `timer must be at least ${DEFAULT_MIN_TIMER_COUNT} seconds`
      )
      .max(
        DEFAULT_MAX_TIMER_COUNT,
        `timer must be at most ${DEFAULT_MAX_TIMER_COUNT} seconds`
      ),
    highScore: yup.number().required("you must provide highscore"),
  })
  .required();

export type LevelCreationReq = Required<yup.InferType<typeof LevelValidator>>;
