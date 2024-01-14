
export const COMMANDS = ['log', 'write', 'import', 'export', 'request', 'require'] as const;
export type Command = typeof COMMANDS[number];

export function isLineCommand(firstWordOfLine: string) {
  return COMMANDS.includes(firstWordOfLine as Command);
}
