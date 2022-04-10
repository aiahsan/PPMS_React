import {combineReducers} from "redux";
import * as User from './reducers/user/idnex';
import * as Loader from './reducers/loader/idnex';
import * as Message  from './reducers/messsage/idnex';
import * as Projects  from './reducers/projects/idnex';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const rootReducer = combineReducers({
  User:User.userReducer,
  Loading:Loader.loadingReducer,
  Message:Message.messageReducer,
  Projects:Projects.projectReducer,
});

const persistConfig={
  key:'root',
  storage,
  whitelist:['User']
}

export default persistReducer(persistConfig,rootReducer )

export function* rootSaga() {

}
