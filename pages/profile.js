import LoadingSpinner from "components/LoadingSpinner";
import PrivateRoute from "components/PrivateRoute";
import useSecureData from "hooks/useSecureData";
import PageLayout from "components/PageLayout";

const Profile = () => {
  const { data, isLoading } = useSecureData("/api/users");

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <PageLayout>
      <h1>Welcome to the Profile Page!</h1>
    </PageLayout>
  );
};

const ProfilePage = () => {
  return (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );
};

export default ProfilePage;
