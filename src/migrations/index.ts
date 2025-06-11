import * as migration_20250610_122423 from './20250610_122423';
import * as migration_20250610_135015 from './20250610_135015';
import * as migration_20250611_122446 from './20250611_122446';

export const migrations = [
  {
    up: migration_20250610_122423.up,
    down: migration_20250610_122423.down,
    name: '20250610_122423',
  },
  {
    up: migration_20250610_135015.up,
    down: migration_20250610_135015.down,
    name: '20250610_135015',
  },
  {
    up: migration_20250611_122446.up,
    down: migration_20250611_122446.down,
    name: '20250611_122446'
  },
];
