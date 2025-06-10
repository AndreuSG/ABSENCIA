import * as migration_20250610_122423 from './20250610_122423';

export const migrations = [
  {
    up: migration_20250610_122423.up,
    down: migration_20250610_122423.down,
    name: '20250610_122423'
  },
];
