import { UserProvider, useUser } from "contexts/UserContext";
import RouteGuard from "components/RouteGuard";

import "bootstrap/dist/css/bootstrap.min.css";

function App({ Component, pageProps }) {
  return (
    <UserProvider>
      {/* <RouteGuard> */}
      <Component {...pageProps} />
      {/* </RouteGuard> */}
    </UserProvider>
  );
}

export default App;
