import React, { useEffect, useState } from 'react'
import { FigmaClient, Variable } from '@figma-vars/core'
import { VariableList } from '../components/VariableList.js'
import { getEnvVar } from '../utils/env.js'

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
