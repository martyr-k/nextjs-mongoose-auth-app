import { AuthenticationProvider } from "contexts/AuthenticationContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
      <Component {...pageProps} />
    </AuthenticationProvider>
  );
}

export default App;
