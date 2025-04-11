import { describe, it, expect, beforeEach } from 'vitest'
import { FigmaVars } from '../FigmaVars'

describe('FigmaVars', () => {
  let figmaVars: FigmaVars

  beforeEach(() => {
    figmaVars = new FigmaVars()
  })

  describe('constructor', () => {
    it('should initialize with empty variables array', () => {
      expect(figmaVars.getVariables()).toEqual([])
    })
  })

  describe('setVariables', () => {
    it('should set variables correctly', () => {
      const variables = [
        { name: 'color-primary', value: '#FF0000' },
        { name: 'color-secondary', value: '#00FF00' }
      ]
      figmaVars.setVariables(variables)
      expect(figmaVars.getVariables()).toEqual(variables)
    })

    it('should create a deep copy of variables array', () => {
      const variables = [
        { name: 'color-primary', value: '#FF0000' }
      ]
      figmaVars.setVariables(variables)
      variables.push({ name: 'color-secondary', value: '#00FF00' })
      expect(figmaVars.getVariables()).toEqual([
        { name: 'color-primary', value: '#FF0000' }
      ])
    })

    it('should handle empty array', () => {
      figmaVars.setVariables([])
      expect(figmaVars.getVariables()).toEqual([])
    })

    it('should handle variables with special characters in names', () => {
      const variables = [
        { name: 'color/primary/main', value: '#FF0000' },
        { name: 'spacing.unit.4', value: '16px' }
      ]
      figmaVars.setVariables(variables)
      expect(figmaVars.getVariables()).toEqual(variables)
    })

    it('should handle variables with complex values', () => {
      const variables = [
        { name: 'gradient-primary', value: 'linear-gradient(45deg, #FF0000, #00FF00)' },
        { name: 'shadow-main', value: '0 4px 6px rgba(0, 0, 0, 0.1)' }
      ]
      figmaVars.setVariables(variables)
      expect(figmaVars.getVariables()).toEqual(variables)
    })
  })

  describe('getVariables', () => {
    it('should return a deep copy of variables array', () => {
      const variables = [
        { name: 'color-primary', value: '#FF0000' }
      ]
      figmaVars.setVariables(variables)
      const result = figmaVars.getVariables()
      result.push({ name: 'color-secondary', value: '#00FF00' })
      expect(figmaVars.getVariables()).toEqual(variables)
    })

    it('should return empty array when no variables are set', () => {
      expect(figmaVars.getVariables()).toEqual([])
    })
  })

  describe('variable immutability', () => {
    it('should maintain variable immutability after multiple operations', () => {
      const initialVariables = [
        { name: 'color-primary', value: '#FF0000' }
      ]
      figmaVars.setVariables(initialVariables)

      // Modify the returned array
      const variables = figmaVars.getVariables()
      variables.push({ name: 'color-secondary', value: '#00FF00' })

      // Get variables again
      const newVariables = figmaVars.getVariables()
      expect(newVariables).toEqual(initialVariables)
    })
  })
})