import { AuthenticationProvider } from "contexts/AuthenticationContext";
import { ToastContainer, Zoom } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        rtl={false}
        transition={Zoom}
      />
      <AuthenticationProvider>
        <Component {...pageProps} />
      </AuthenticationProvider>
    </>
  );
}

export default App;
