import LoadingSpinner from "components/LoadingSpinner";
import PrivateRoute from "components/PrivateRoute";
import useSecureData from "hooks/useSecureData";
import PageLayout from "components/PageLayout";

const Profile = () => {
  const { data, isLoading } = useSecureData("/api/users");
  const currentUser = data?.user;

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <PageLayout user={currentUser}>
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
