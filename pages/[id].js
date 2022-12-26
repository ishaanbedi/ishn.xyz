import React from "react";
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
  const data = await xata.db.global_data.getAll();
  const temp = data.filter((item) => item.slug === context.params.id);
  if (temp.length === 0) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  let url = temp[0].url;
  if (!/^https?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  let record = data.filter((item) => item.slug === context.params.id);
  const id = record[0].id;
  let views = record[0].views;
  views = views + 1;
  record = await xata.db.global_data.update(id, {
    views,
  });
  return {
    redirect: {
      destination: url,
      permanent: false,
    },
  };
};
