import { setupOidcClient } from "piral-oidc";

const identityProviderUri = "https://piral-sample.eu.auth0.com";
const clientId = "bz3h5Giytmwf1lDa9bELQpiNbTToPjgz";
const redirectUri = location.origin + "/auth";
const logoutUrl = location.origin + "/";

export const client = setupOidcClient({
  clientId,
  responseType: 'token',
  scopes: ['oidc', 'profile', 'email'],
  identityProviderUri,
  redirectUri,
  extraQueryParams: {
    audience: location.origin,
  },
});

export function logout() {
  const url = encodeURIComponent(logoutUrl);
  localStorage.clear();
  sessionStorage.clear();
  location.href = `${identityProviderUri}/v2/logout?returnTo=${url}&client_id=${clientId}`;
}
