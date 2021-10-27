import LoadingSpinner from "components/LoadingSpinner";
import useAuthenticatedClient from "hooks/useAuthenticatedClient";
import PageLayout from "components/PageLayout";

const CreateEvent = () => {
  const { isLoading } = useAuthenticatedClient(
    "/auth/login",
    "admin",
    "developer"
  );

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <PageLayout>
      <h1>Create an Event!</h1>
    </PageLayout>
  );
};

export default CreateEvent;
