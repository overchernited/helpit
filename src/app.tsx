import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import UserHandler from "~/user/UserHandler";
import Notifications from "~/components/Notifications";
import Signature from "~/components/Signature";
import "~/styles/global.scss";
import "~/styles/tailwind.css";
import ModalSetter from "./components/modal";
import Theme from "./store/theme";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Theme />
          <UserHandler />
          <Signature />
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