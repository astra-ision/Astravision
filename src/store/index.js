import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import crmReducer from './crm-slice';
import erpReducer from './erp-slice';
import hrmsReducer from './hrms-slice';
import aiReducer from './ai-slice';
import blockchainReducer from './blockchain-slice';
import uiReducer from './ui-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crm: crmReducer,
    erp: erpReducer,
    hrms: hrmsReducer,
    ai: aiReducer,
    blockchain: blockchainReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in specific paths
        ignoredActions: ['blockchain/setWeb3', 'blockchain/setContract'],
        ignoredPaths: ['blockchain.web3', 'blockchain.contracts'],
      },
    }),
});

export default store; 