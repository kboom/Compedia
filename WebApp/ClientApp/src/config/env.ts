// These will get replaced by react build tools
const baseIdentityUrl = process.env["REACT_APP_IDENTITY_SERVER_URL"];
const baseApiUrl = process.env["REACT_APP_API_SERVER_URL"];

export const globalConfig = {
	baseIdentityUrl,
	baseApiUrl,
	currentBaseUrl: `${window.location.protocol}//${window.location.hostname}${
		window.location.port ? `:${window.location.port}` : ""
	}`,
};
