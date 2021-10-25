import LoadingSpinner from "components/LoadingSpinner";
import useSecureData from "hooks/useSecureData";
import PageLayout from "components/PageLayout";

const HomePage = () => {
  const { data, isLoading } = useSecureData("/api/users");
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
