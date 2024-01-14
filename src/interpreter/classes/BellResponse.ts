
export class BellResponse {
  response?: Response;

  set(newResponse: Response) {
    this.response = newResponse;
  }

  get() {
    return this.response;
  }

  log() {
    console.log(this.response);
  }
}
