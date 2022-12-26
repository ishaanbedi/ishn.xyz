const Create = () => {
  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default Create;
export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
};
