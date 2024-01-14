import { METHODS } from "http";
import { COMMANDS, REQUEST_PROPERTIES } from "../parsers";

export const RESERVED_WORDS = [
  ...REQUEST_PROPERTIES,
  ...METHODS,
  ...COMMANDS,
  'response'
]