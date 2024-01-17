import { VariableNameChain } from "../parsers";
import { getIn } from "../state";

export class BellResponse {
  status?: number;
  headers?: Headers;
  body?: any;

  async set(newResponse: Response) {
    this.status = newResponse.status
    this.headers = newResponse.headers;
    this.body = await newResponse.json();
  }

  get(chain?: VariableNameChain) {
    if (!chain || chain?.length === 0) {
      return this;
    } else if (chain[0] === 'body') {
      chain.shift();
      return getIn(this.body, chain);
    } else if (chain[0] === 'status') {
      return this.status;
    }
  }

  log() {
    console.log(this.headers, this.body);
  }
}
