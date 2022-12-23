import { getXataClient } from "../xata";
const Shorter = () => {
  return (
    <h3>
      If you&apos;re seeing this, something is not quite right.
      <br />
      Please try again.
    </h3>
  );
};
export default Shorter;
export const getServerSideProps = async (context) => {
  const xata = getXataClient();
  var data = await xata.db.links.getAll();
  data = data.filter(
    (item) => item.slug.toLowerCase() === context.params.id.toLowerCase()
  );
  if (data.length === 0) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  var url = data[0].url;
  if (!/^https?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  return {
    redirect: {
      destination: url,
      permanent: false,
    },
  };
};
