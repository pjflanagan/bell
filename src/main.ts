import { readBellFile, initState } from "./legacy/interpreter";

function main() {
  const fileName = process.env.npm_config_file;
  if (!fileName) {
    throw 'fileName not specified: npm run main --file=<fileName>'
  }
  initState();
  try {
    readBellFile(fileName);
  } catch (err) {
    throw err;
  }
}

main();
