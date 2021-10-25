import LoadingSpinner from "components/LoadingSpinner";
import useSecuredData from "hooks/useSecuredData";
import PageLayout from "components/PageLayout";

const HomePage = () => {
  const { data, isLoading } = useSecuredData("/api/users");
  const currentUser = data?.user;

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <PageLayout user={currentUser}>
      <h1>Welcome to the Home Page!</h1>
    </PageLayout>
  );
};

export default HomePage;
