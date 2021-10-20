import LoadingSpinner from "components/LoadingSpinner";
import PrivateRoute from "components/PrivateRoute";
import useCurrentUser from "hooks/useCurrentUser";
import PageLayout from "components/PageLayout";

const Profile = () => {
  const { currentUser, isLoading } = useCurrentUser();

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
