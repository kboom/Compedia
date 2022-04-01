export const globalConfig = {
	baseIdentityUrl: process.env["REACT_APP_IDENTITY_SERVER_URL"],
	baseApiUrl: process.env["REACT_APP_API_SERVER_URL"],
	currentBaseUrl: `${window.location.protocol}//${window.location.hostname}${
		window.location.port ? `:${window.location.port}` : ""
	}`,
};
