import LoadingSpinner from "components/LoadingSpinner";
import useSecuredData from "hooks/useSecuredData";
import PageLayout from "components/PageLayout";

const Profile = () => {
  const { data, isLoading } = useSecuredData("/api/users", "/auth/login");
  const currentUser = data?.user;

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <PageLayout user={currentUser}>
      <h1>Welcome to the Profile Page!</h1>
    </PageLayout>
  );
};

export default Profile;
