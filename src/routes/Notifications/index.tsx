import Navbar from "~/components/NavBar"
import NotificationsLoader from "./NotificationsLoader"
import Private from "~/components/Routes"

const NotificationsRoute = () => {
    return (
        <Private endpoint="/">
            <Navbar />
            <NotificationsLoader />
        </Private>
    )
}

export default NotificationsRoute