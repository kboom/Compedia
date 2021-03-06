import "react-hot-loader"; // Must be imported befire React and ReactDOM
import { render } from "react-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./assets/style/scss/site.scss";
import "./config/fa.config";
import { createStore, RootState } from "./store";
import { configureToken } from "./api/axios";
import { cssTransition, ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { PersistGate } from "redux-persist/integration/react";
import { oidcGetInitialLoginState } from "./store/oidc/oidc.middleware";

const transition = cssTransition({
	enter: "custom__toast__animate__bounceIn",
	exit: "custom__toast__animate__bounceOut",
});

const ToastElement = (
	<ToastContainer
		newestOnTop
		theme="colored"
		autoClose={1500}
		draggable={false}
		position="top-center"
		transition={transition}
	/>
);

oidcGetInitialLoginState().then((oidcState) => {
	const initialState: RootState = (window as any)?.initialReduxState;
	const { store, persistor } = createStore(
		Object.assign({}, initialState, oidcState)
	);
	configureToken(store);

	render(
		<StrictMode>
			<BrowserRouter>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<App />
					</PersistGate>
				</Provider>
			</BrowserRouter>
			{ToastElement}
		</StrictMode>,
		document.getElementById("root")
	);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
