import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { useUser } from "contexts/UserContext";

function RouteGuard({ children }) {
  const router = useRouter();
  const { user } = useUser();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // // on route change start - hide page content by setting authorized to false
    // const hideContent = () => setAuthorized(false);
    // router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", verifyAuth);

    // // unsubscribe from events in useEffect return function
    return () => {
      //   router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/auth/login", "/auth/signup"];
    const path = url.split("?")[0];

    if (!user && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/auth/login",
      });
    } else {
      setAuthorized(true);
    }
  }

  function verifyAuth(url) {
    const publicPaths = ["/auth/login", "/auth/signup"];
    const path = url.split("?")[0];
    console.log(path);
    console.log(user);

    if (!user && !publicPaths.includes(path)) {
      console.log("i'm not here!");
      setAuthorized(false);
    } else {
      console.log("i'm here!");
      setAuthorized(true);
    }
  }

  return authorized && children;
}

export default RouteGuard;
