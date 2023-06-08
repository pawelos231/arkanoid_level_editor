export interface Level {
    level: number;
    levelName: string;
    numberOfRows: number;
    numberOfColumns: number;
    lives: number;
    timer: number;
    bossLevel: boolean;
    brickArray: Brick[];
    description: string;
    highScore: number;
    requiredScore: number;
  }
  
  export type LevelInfo = {
    lives: number;
    timer: number;
    bossLevel: boolean;
    description: string;
    highScore: number;
    requiredScore: number;
    levelName: string;
    level: number;
  };

  export type Brick = {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string
}

export interface BrickData {
    color: string
    timesToHit: number
    points: number
    buffDropRate: number
}