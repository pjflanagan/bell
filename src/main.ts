import { readBellFile, initState } from "./interpreter";

// TODO: read file name from command line

function main() {
  initState();
  readBellFile('./examples/weatherTest.GET.bel');
}

main();