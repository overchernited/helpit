import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "~/styles/global.scss";
import "~/styles/tailwind.css";
import GetUser from "./auth/GetUser";

export default function App() {
  return (
    <>
      <GetUser />
      <Router
        root={props => (
          <>
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </>
  );
}
