import LoadingSpinner from "components/LoadingSpinner";
import PrivateRoute from "components/PrivateRoute";
import useSecuredData from "hooks/useSecuredData";
import PageLayout from "components/PageLayout";

const Profile = () => {
  const { data, isLoading } = useSecuredData("/api/users");
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
