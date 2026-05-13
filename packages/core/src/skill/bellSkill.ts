import * as fs from 'fs';
import * as path from 'path';

export const BELL_SKILL: string = fs.readFileSync(
  path.join(__dirname, 'bell-skill.md'),
  'utf8'
);
