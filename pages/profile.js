import LoadingSpinner from "components/LoadingSpinner";
import useAuthorizedClient from "hooks/useAuthorizedClient";
import PageLayout from "components/PageLayout";

const Profile = () => {
  const { user, isLoading } = useAuthorizedClient("/auth/login");

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <PageLayout>
      <h1>Welcome to the Profile page, {user.email}!</h1>
    </PageLayout>
  );
};

export default Profile;
