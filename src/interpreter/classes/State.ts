
export class Variable {
  private name: string;
  private value: any;
  private exported: boolean = false;

  constructor(name: string, value: any, exported = false) {
    this.name = name;
    this.value = value;
    this.exported = exported;
  }

  getName() {
    return this.name;
  }

  getValue(): any {
    return this.value;
  }

  setValue(newValue: any) {
    this.value = newValue;
  }

  isExported(): boolean {
    return this.exported;
  }

  setExport(exported: boolean = true) {
    this.exported = exported;
  }
}

export class State {
  // FIXME: this would be better as a Map
  private variables: Variable[];

  constructor() {
    this.variables = [];
  }

  public access(name: string) {
    const variable = this.find(name);
    if (!variable) {
      throw `Unable to find variable ${name}`;
    }
    return variable.getValue();
  }

  public contains(name: string) {
    const variable = this.find(name);
    if (!variable) {
      throw `Unable to find variable ${name}`;
    }
    return true;
  }

  public setVariable(name: string, value: any) {
    const variable = this.find(name);
    if (variable) {
      variable.setValue(value);
    } else {
      this.variables.push(new Variable(name, value));
    }
  }

  public exportVariable(name: string) {
    const variable = this.find(name);
    if (!variable) {
      throw `Unable to find variable for export ${name}`;
    }
    variable.setExport();
  }

  // filter unexported variables
  public clearUnexportedVariables() {
    this.variables = this.variables.filter(v => v.isExported());
  }

  private find(name: string): Variable | undefined {
    return this.variables.find(v => v.getName() === name);
  }
}