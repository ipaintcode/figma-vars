export interface Variable {
  name: string
  value: string
}

export class FigmaVars {
  private variables: Variable[]

  constructor() {
    this.variables = []
  }

  setVariables(variables: Variable[]): void {
    this.variables = [...variables]
  }

  getVariables(): Variable[] {
    return [...this.variables]
  }
}