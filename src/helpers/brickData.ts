import { BrickData } from "../interfaces/Level"
export const bricksData = (): BrickData[] => {

    return [
        {
            color: "#ffff00",
            timesToHit: 2,
            points: 20,
            buffDropRate: 0.1
        },
        {
            color: "#00ff00",
            timesToHit: 1,
            points: 10,
            buffDropRate: 0.1
        },
        {
            color: "#0000ff",
            timesToHit: 1,
            points: 10,
            buffDropRate: 0.02
        },
        {
            color: "#cb356d",
            timesToHit: 1,
            points: 50,
            buffDropRate: 0.02
        },
        {
            color: "#66cae5",
            timesToHit: 1,
            points: 10,
            buffDropRate: 0.02
        },
        {
            color: "#CAD982",
            timesToHit: 1,
            points: 10,
            buffDropRate: 0.05
        },
        {
            color: "#000",
            timesToHit: 4,
            points: 50,
            buffDropRate: 0.05
        },
        {
            color: "#808080",
            timesToHit: 1000000000,
            points: 0,
            buffDropRate: 0.05
        }
    ]
}