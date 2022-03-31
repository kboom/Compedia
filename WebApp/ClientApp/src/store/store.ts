import thunk from "redux-thunk";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import reducer from "./reducer";
import { applyMiddleware, compose, createStore } from "redux";
import storage from "redux-persist/lib/storage";

import type { Store } from "redux";
import type { RootState } from "./index";

export type ConfiguredStore = Readonly<{
  store: Store<RootState>;
  persistor: Persistor;
}>;

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
};

export default (initialState?: RootState): ConfiguredStore => {
  const composeEnhancer: typeof compose =
    (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistReducer(rootPersistConfig, reducer()),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );

  const persistor = persistStore(store);

  return { store, persistor };
};
