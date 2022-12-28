import React from "react";
import { getXataClient } from "../xata";
import axios from "axios";
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
  var array = JSON.parse(temp[0].countries);
  var country = await axios
    .get("https://ipapi.co/json/")
    .then((response) => {
      let data = response.data;
      var flag = `https://countryflagsapi.com/png/${data.country_name.toLowerCase()}`;
      return {
        country: data.country_name,
        flag: flag,
      };
    })
    .catch((error) => {
      console.log(error);
    });
  if (!array.includes(country)) {
    array.push(country);
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
    countries: JSON.stringify(array),
  });
  return {
    redirect: {
      destination: url,
      permanent: false,
    },
  };
};
