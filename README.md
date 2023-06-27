# Level editor

You have the amazing Arkanoid level editor at your disposal! It lets you create brand new levels and gives you the flexibility to adjust the number of rows and columns in them. But be aware that if you modify these parameters, the canvas will be cleared, removing any existing content.

The level editor offers a wide range of eight different brick colors, each with its own unique properties. This diverse palette allows you to design visually stunning and strategically diverse levels.

If you want to use previously saved data, you can easily load your progress using the "load progress" feature located in the navigation bar. However, please note that only file texts that meet specific conditions and are considered valid levels can be successfully loaded into the editor.

Once you've carefully crafted a level and decide to save it, the level will be promptly sent to the backend of the Arkanoid game. This ensures that your creation becomes a playable level in the game, immediately visible for everyone to enjoy.

While unleashing your creativity, keep in mind that the maximum number of rows allowed is 10, and the column count is limited to 20. Sticking to these boundaries ensures optimal gameplay and level design.

Now, let's take a look at an example map inspired by the popular game "Among Us." This map will give you a glimpse of the exciting possibilities that await you in the Arkanoid level editor!

![Amogus](./src/images/amogus.png)

## Brick Types

| Color       | Times to Hit  | Points | Buff Drop Rate |
| ----------- | ------------- | ------ | -------------- |
| Yellow      | 2             | 20     | 0.1            |
| Green       | 1             | 10     | 0.1            |
| Blue        | 1             | 10     | 0.02           |
| Red         | 1             | 50     | 0.02           |
| Light Blue  | 1             | 10     | 0.02           |
| Light Green | 1             | 10     | 0.05           |
| Black       | 4             | 50     | 0.05           |
| Gray        | 1,000,000,000 | 0      | 0.05           |

Please refer to the following code snippet for the brick data:

```typescript
import { BrickData } from "../interfaces/Level";

export const bricksData = (): BrickData[] => {
  return [
    {
      color: "#ffff00",
      timesToHit: 2,
      points: 20,
      buffDropRate: 0.1,
    },
    {
      color: "#00ff00",
      timesToHit: 1,
      points: 10,
      buffDropRate: 0.1,
    },
    {
      color: "#0000ff",
      timesToHit: 1,
      points: 10,
      buffDropRate: 0.02,
    },
    {
      color: "#cb356d",
      timesToHit: 1,
      points: 50,
      buffDropRate: 0.02,
    },
    {
      color: "#66cae5",
      timesToHit: 1,
      points: 10,
      buffDropRate: 0.02,
    },
    {
      color: "#CAD982",
      timesToHit: 1,
      points: 10,
      buffDropRate: 0.05,
    },
    {
      color: "#000",
      timesToHit: 4,
      points: 50,
      buffDropRate: 0.05,
    },
    {
      color: "#808080",
      timesToHit: 1000000000,
      points: 0,
      buffDropRate: 0.05,
    },
  ];
};
```
