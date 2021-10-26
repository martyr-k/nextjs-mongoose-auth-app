import { Container } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import Head from "next/head";

const PageLayout = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.1/font/bootstrap-icons.css"
        />
      </Head>
      <NavigationBar />
      <Container fluid>{children}</Container>
    </>
  );
};

export default PageLayout;
