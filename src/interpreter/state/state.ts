import { BellResponse, RequestProperties, State } from "../classes";

export let state: State;
export let requestProperties: RequestProperties;
export let response: BellResponse;

export function initState() {
  state = new State();
  requestProperties = new RequestProperties();
  response = new BellResponse();
}
