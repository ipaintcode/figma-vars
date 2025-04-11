import React from 'react'
import { Variable } from '@figma-vars/core'

export interface VariableListProps {
  variables: Variable[]
  onVariableClick?: (variable: Variable) => void
}

/**
 * Component to display a list of variables in a Figma plugin
 */
export function VariableList({
  variables,
  onVariableClick,
}: VariableListProps) {
  // This is a simplified representation for Figma plugin UI
  // In a real implementation, you would use Figma's plugin API to create UI elements
  return {
    type: 'list',
    children: variables.map((variable) => ({
      type: 'row',
      key: variable.name,
      onClick: () => onVariableClick?.(variable),
      children: [
        {
          type: 'text',
          value: variable.name,
        },
        {
          type: 'color-preview',
          value: variable.value,
        },
        {
          type: 'text',
          value: variable.value,
        },
      ],
    })),
  }
}
