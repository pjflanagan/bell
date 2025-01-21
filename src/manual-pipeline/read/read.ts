
import * as fs from 'fs/promises';

export async function read(fileName: string): Promise<string> {
  try {
    const data = await fs.readFile(fileName)
    return data.toString();
  } catch (err) {
    throw `Unable to read file ${fileName}: ${err}`;
  }
}