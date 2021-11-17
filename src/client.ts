import { setupOidcClient } from "piral-oidc";

const identityProviderUri = "https://piral-sample.eu.auth0.com";
const clientId = "bz3h5Giytmwf1lDa9bELQpiNbTToPjgz";
const redirectUri = location.origin + "/auth";
const logoutUrl = location.origin + "/";

export const client = setupOidcClient({
  clientId,
  identityProviderUri,
  redirectUri,
});

export function logout() {
  const url = encodeURIComponent(logoutUrl);
  localStorage.clear();
  location.href = `${identityProviderUri}/v2/logout?returnTo=${url}&client_id=${clientId}`;
}
