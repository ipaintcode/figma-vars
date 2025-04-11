import React, { useEffect, useState } from 'react'
import { FigmaClient, Variable } from '@figma-vars/core'
import { VariableList } from '../components/VariableList'

/**
 * Widget for displaying variables in Figma
 */
export const VariablesWidget = () => {
  const getEnvVar = (name: string): string => {
    // This is a simplified implementation; in a real plugin, you would get this from Figma settings
    return name
  }

  const client = new FigmaClient(getEnvVar('FIGMA_ACCESS_TOKEN'))

  // In a real plugin, we would use figma API to get the file key
  // This is a simplified placeholder implementation
  const getFileKey = (): string => {
    return 'sample-file-key'
  }

  const fileKey = getFileKey()
  let variables: Variable[] = []

  const loadVariables = async () => {
    try {
      variables = await client.getFileVariables(fileKey)
      return {
        type: 'success' as const,
        variables,
      }
    } catch (error) {
      return {
        type: 'error' as const,
        message:
          error instanceof Error ? error.message : 'Failed to load variables',
      }
    }
  }

  // Widget implementation
  return {
    name: 'Figma Variables',
    width: 320,
    height: 480,
    render: async () => {
      const result = await loadVariables()

      if (result.type === 'error') {
        return {
          type: 'text',
          value: `Error: ${result.message}`,
        }
      }

      return VariableList({
        variables: result.variables,
        onVariableClick: (variable: Variable) => {
          console.log('Variable clicked:', variable)
        },
      })
    },
  }
}
