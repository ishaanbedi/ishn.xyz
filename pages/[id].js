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
  var data = await xata.db.global_data.getAll();
  var temp = data.filter((item) => item.slug === context.params.id);
  if (temp.length === 0) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  var url = temp[0].url;
  if (!/^https?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  var record = data.filter((item) => item.slug === context.params.id);
  var id = record[0].id;
  var views = record[0].views;
  views = views + 1;
  record = await xata.db.global_data.update(id, {
    views: views,
  });
  return {
    redirect: {
      destination: url,
      permanent: false,
    },
  };
};
