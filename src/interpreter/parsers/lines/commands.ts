
export const COMMANDS = ['log', 'write', 'import', 'export', 'request', 'require', 'wait'] as const;
export type Command = typeof COMMANDS[number];

const COMMAND_LINE_REGEX = /^(log|write|import|export|request|require|wait) (.*)$/

export function isLineCommand(line: string) {
  return COMMAND_LINE_REGEX.test(line);
}
