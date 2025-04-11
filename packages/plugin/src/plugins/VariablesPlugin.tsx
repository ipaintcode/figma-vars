import React, { useEffect, useState } from 'react'
import { FigmaClient, Variable } from '@figma-vars/core'
import { VariableList } from '../components/VariableList.js'
import { getEnvVar } from '../utils/env.js'

/**
 * Plugin for working with Figma variables
 */
export const VariablesPlugin: React.FC = () => {
  const [variables, setVariables] = useState<Variable[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const client = new FigmaClient(getEnvVar('FIGMA_ACCESS_TOKEN'))
    const fileId = window.location.pathname.split('/').pop() || ''

    async function loadVariables() {
      try {
        const vars = await client.getFileVariables(fileId)
        setVariables(vars)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load variables'
        )
      }
    }

    loadVariables()
  }, [])

  if (error) {
    return <div className="error">{error}</div>
  }

  return <VariableList variables={variables} />
}

export const VariablesPluginSingleton = {
  /**
   * Initialize the plugin
   */
  init() {
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

    // Simplified implementation for the plugin
    // In a real plugin, we would use figma.showUI and handle message passing
    console.log('Initializing Variables Plugin')
    console.log('File Key:', fileKey)

    // Example of loading variables
    client
      .getFileVariables(fileKey)
      .then((variables) => {
        console.log('Variables loaded:', variables)
      })
      .catch((error) => {
        console.error('Error loading variables:', error)
      })
  },
}
