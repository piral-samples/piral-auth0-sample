// should be standalone, but for simplicity just embedded in the app shell
import { PiletApi } from "piral";
import * as React from "react";

export function setup(api: PiletApi) {
  api.registerTile(
    () => {
      const [profile, setProfile] = React.useState(undefined);

      React.useEffect(() => {
        let active = true;

        api.getProfile().then((profile) => active && setProfile(profile));

        return () => {
          active = false;
        };
      }, []);

      if (!profile) {
        return null;
      }

      return (
        <div className="teaser">
          <div style={{ fontSize: "0.6em", color: "#666" }}>
            User ID @ auth0
          </div>
          <div style={{ fontSize: "1.8em", wordBreak: "break-all" }}>
            {profile.sub}
          </div>
        </div>
      );
    },
    {
      initialRows: 2,
      initialColumns: 6,
    }
  );
}
