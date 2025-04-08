import type { Variable, Collection } from './types.js';

/**
 * Find a variable by ID from a collection of variables
 */
export function findVariableById(variables: Variable[], id: string): Variable | undefined {
  return variables.find(variable => variable.id === id);
}

/**
 * Find all variables in a collection
 */
export function findVariablesByCollection(
  variables: Variable[],
  collectionId: string
): Variable[] {
  return variables.filter(variable => variable.variableCollectionId === collectionId);
}

/**
 * Find a collection by ID
 */
export function findCollectionById(
  collections: Collection[],
  id: string
): Collection | undefined {
  return collections.find(collection => collection.id === id);
}