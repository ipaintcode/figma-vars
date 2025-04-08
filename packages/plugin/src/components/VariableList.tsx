import React from 'react'
import { Variable } from '@figma-vars/core'

export interface VariableListProps {
  variables: Variable[]
}

export const VariableList: React.FC<VariableListProps> = ({ variables }) => {
  return (
    <div>
      {variables.map((variable) => (
        <div key={variable.id}>
          <h3>{variable.name}</h3>
          <p>Type: {variable.resolvedType}</p>
          <p>
            Values:{' '}
            {Object.entries(variable.valuesByMode).map(([modeId, value]) => (
              <span key={modeId}>
                {modeId}: {JSON.stringify(value)}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  )
}
