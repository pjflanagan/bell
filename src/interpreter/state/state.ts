import { BellResponse, RequestProperties } from "../classes";

export let requestProperties: RequestProperties;
export let response: BellResponse;

export function initState() {
  requestProperties = new RequestProperties();
  response = new BellResponse();
}
