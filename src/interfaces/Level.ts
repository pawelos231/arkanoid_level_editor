export interface Level {
    level: number;
    levelName: string;
    numberOfRows: number;
    numberOfColumns: number;
    lives: number;
    timer: number;
    bossLevel: boolean;
    brickArray: BrickToLevelSave[];
    description: string;
    highScore: number;
    requiredScore: number;
  }
  
  export interface LevelInfo {
    lives: number;
    timer: number;
    bossLevel: boolean;
    description: string;
    highScore: number;
    requiredScore: number;
    levelName: string;
    level: number;
  }
  
  export interface Brick {
    rowNumber: number, 
    columnNumber: number
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  }

  export type BrickToLevelSave = Pick<Brick, "rowNumber" | "columnNumber" | "color">
  
  export interface BrickData {
    color: string;
    timesToHit: number;
    points: number;
    buffDropRate: number;
  }
  