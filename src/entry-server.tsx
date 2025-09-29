// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <title>HelpIt</title>
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
          <div innerHTML="<!-- _                     _ _           _ 
  _____   _____ _ __ ___| |__   ___ _ __ _ __ (_) |_ ___  __| |
 / _ \ \ / / _ \ '__/ __| '_ \ / _ \ '__| '_ \| | __/ _ \/ _` |
| (_) \ V /  __/ | | (__| | | |  __/ |  | | | | | ||  __/ (_| |
 \___/ \_/ \___|_|  \___|_| |_|\___|_|  |_| |_|_|\__\___|\__,_| -->">
          </div>
        </body>
        <script src="https://kit.fontawesome.com/a79f7121ff.js" crossorigin="anonymous"></script>
      </html>
    )}
  />
));
