import { response } from "../state";

export function logResponse() {
  if (response) {
    console.log(response);
  }
}