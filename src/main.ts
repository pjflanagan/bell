import { readFile } from "./interpreter";
import { RequestProperties } from "./interpreter/requestProperties";

// TODO: read file name from command line

export let requestProperties: RequestProperties;
export let response: Response;

function init() {
  requestProperties = new RequestProperties();
}

function main() {
  init();
  console.log('MAIN');
  readFile('./examples/0-basicGetRequest/post.GET.bel');
}

console.log('RUN');
main();