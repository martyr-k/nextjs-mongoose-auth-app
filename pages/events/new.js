import LoadingSpinner from "components/LoadingSpinner";
import useAuthorizedClient from "hooks/useAuthorizedClient";
import PageLayout from "components/PageLayout";

const CreateEvent = () => {
  const { isLoading } = useAuthorizedClient(
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
