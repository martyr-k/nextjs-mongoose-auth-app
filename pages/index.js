import LoadingSpinner from "components/LoadingSpinner";
import useCurrentUser from "hooks/useCurrentUser";
import PageLayout from "components/PageLayout";

const HomePage = () => {
  const { currentUser, isLoading } = useCurrentUser();

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <PageLayout user={currentUser}>
      <h1>Welcome to the Home Page!</h1>
    </PageLayout>
  );
};

export default HomePage;
