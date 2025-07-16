import { AnonymousAuthenticationProvider } from "@microsoft/kiota-abstractions";
import {
  FetchRequestAdapter,
  HttpClient,
} from "@microsoft/kiota-http-fetchlibrary";
import { createApiClient } from "./api/apiClient.ts";

const authProvider = new AnonymousAuthenticationProvider();

const customFetch: typeof fetch = (input, init = {}) => {
  console.log(init);
  return fetch(input, {
    ...init,
    credentials: "include", // <== THIS is the important part
  });
};
const httpClient = new HttpClient(customFetch);
const adapter = new FetchRequestAdapter(
  authProvider,
  undefined,
  undefined,
  httpClient
);

adapter.baseUrl = "/api";
const client = createApiClient(adapter);

export default client;
