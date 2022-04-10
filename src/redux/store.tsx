import {createStore} from 'redux';
import {persistStore} from 'redux-persist';
import rootReducer from './rootReducer';
export const store=createStore(rootReducer);
export const perssistor=persistStore(store);
const myStore={store,perssistor}
export default myStore;
