import { interpretFile } from "./interpreter";
import { RequestProperties } from "./interpreter/requestProperties";

// TODO: read file name from command line

export let requestProperties: RequestProperties;

function init() {
  requestProperties = new RequestProperties();
}

function main() {
  init();
  interpretFile('./examples/0-basicGetRequest/post.GET.bel');
}
