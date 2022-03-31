import axios from "./axios";
import { ServerPath } from "./paths";
import type { AxiosResponse } from "axios";
import type { IOauthToken, ICredentials } from "../store/account/account.types";

export async function loginAsync(
  credentials?: ICredentials
): Promise<IOauthToken> {
  const { data } = await axios.post<IOauthToken>(
    ServerPath.AccountPostToken,
    credentials
  );
  return data;
}

export async function logoutAsync(): Promise<AxiosResponse> {
  return await axios.post("Logout");
}
