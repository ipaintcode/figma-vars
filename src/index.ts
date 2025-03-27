// index.ts

export { default as useFigmaAuth } from './hooks/useFigmaAuth';
export { default as useFigmaVars } from './hooks/useFigmaVars';
export { default as useCreateFigmaVar } from './hooks/useCreateFigmaVar';
export { default as useUpdateFigmaVar } from './hooks/useUpdateFigmaVar';
export { default as useDeleteFigmaVar } from './hooks/useDeleteFigmaVar';
export { default as useFigmaVarCollections } from './hooks/useFigmaVarCollections';
export { default as useFigmaVarModes } from './hooks/useFigmaVarModes';
export { default as useFigmaVarValues } from './hooks/useFigmaVarValues';
export { default as useFigmaSync } from './hooks/useFigmaSync';
export { default as useFigmaVarByType } from './hooks/useFigmaVarByType';
export { default as useFigmaVarsCache } from './hooks/useFigmaVarsCache';
export { default as useFigmaVarBindings } from './hooks/useFigmaVarBindings';
export { default as useFigmaPublishVars } from './hooks/useFigmaPublishVars';
export { default as useFigmaVarAliases } from './hooks/useFigmaVarAliases';

// Export any utilities or types that might be useful externally
export * from './utils/fetchHelpers';
export * from './utils/authHelpers';
export * from './hooks/types';
