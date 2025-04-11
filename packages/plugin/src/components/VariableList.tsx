import React from 'react'
import { Variable } from '@figma-vars/core'

export interface VariableListProps {
  variables: Variable[]
}

export const VariableList: React.FC<VariableListProps> = ({ variables }) => {
  if (!variables || variables.length === 0) {
    return <div className="empty-state">No variables found</div>
  }

  return (
    <div className="variable-list">
      <h3>Figma Variables ({variables.length})</h3>
      <ul>
        {variables.map((variable) => (
          <li
            key={variable.id}
            className="variable-item">
            <div className="variable-name">{variable.name}</div>
            <div className="variable-value">
              {typeof variable.value === 'object'
                ? JSON.stringify(variable.value)
                : String(variable.value)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
