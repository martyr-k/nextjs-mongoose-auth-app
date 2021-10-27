import LoadingSpinner from "components/LoadingSpinner";
import useAuthenticatedClient from "hooks/useAuthenticatedClient";
import PageLayout from "components/PageLayout";

const Profile = () => {
  const { user, isLoading } = useAuthenticatedClient("/auth/login");

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <PageLayout>
      <h1>Welcome to the Profile page, {user.email}!</h1>
    </PageLayout>
  );
};

export default Profile;
