import thunk from "redux-thunk";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import reducer from "./reducer";
import { applyMiddleware, compose, createStore } from "redux";
import storage from "redux-persist/lib/storage";

import type { Store } from "redux";
import type { RootState } from "./index";
import createOidcMiddleware from "./oidc/oidc.middleware";
import { oidcImplicitSettings } from "../config/oidc.config";

export type ConfiguredStore = Readonly<{
	store: Store<RootState>;
	persistor: Persistor;
}>;

const rootPersistConfig = {
	key: "root",
	storage: storage,
	whitelist: [],
};

const oidcMiddleware = createOidcMiddleware(oidcImplicitSettings);

const store = (initialState?: RootState): ConfiguredStore => {
	const composeEnhancer: typeof compose =
		(window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(
		persistReducer(rootPersistConfig, reducer()),
		initialState,
		composeEnhancer(applyMiddleware(oidcMiddleware, thunk))
	);

	const persistor = persistStore(store);

	return { store, persistor };
};

export default store;
