/**
 * Find a variable by ID from a collection of variables
 */
export function findVariableById(variables, id) {
    return variables.find(variable => variable.id === id);
}
/**
 * Find all variables in a collection
 */
export function findVariablesByCollection(variables, collectionId) {
    return variables.filter(variable => variable.variableCollectionId === collectionId);
}
/**
 * Find a collection by ID
 */
export function findCollectionById(collections, id) {
    return collections.find(collection => collection.id === id);
}
