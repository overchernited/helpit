import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import UserHandler from "~/user/UserHandler";
import Notifications from "~/components/Notifications";
import Signature from "~/components/Signature";
import "~/styles/global.scss";
import "~/styles/tailwind.css";
import ModalSetter from "./components/modal";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Signature />
          <UserHandler />
          <Notifications />
          <ModalSetter />
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}