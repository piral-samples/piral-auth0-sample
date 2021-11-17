import "piral/polyfills";
import * as React from "react";
import { Redirect } from "react-router-dom";
import { renderInstance } from "piral";
import { createOidcApi } from "piral-oidc";
import { client } from "./client";
import { setup } from "./pilet";
import { layout, errors } from "./layout";

client.handleAuthentication().then(
  (result) => {
    if (result.shouldRender) {
      // change to your feed URL here (either using feed.piral.cloud or your own service)
      const feedUrl = "https://feed.piral.cloud/api/v1/pilet/empty";

      const instance = renderInstance({
        layout,
        state: {
          routes: {
            "/auth": () => <Redirect from="/auth" to="/" />,
          },
        },
        errors,
        plugins: [createOidcApi(client)],
        requestPilets() {
          return fetch(feedUrl)
            .then((res) => res.json())
            .then((res) => res.items);
        },
      });

      setup(instance.root);
    }
  },
  () => {
    client.login();
  }
);
