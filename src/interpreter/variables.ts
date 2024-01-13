
class ExportVariables {

}

class VariableMap {

}

export function isVariableDefinition(line: string): boolean {
  return /([a-zA-Z]*)\=.*/.test(line);
}