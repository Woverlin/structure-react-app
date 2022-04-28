import React from "react";
import { useQuery } from "react-query";
import { getAllPost } from "api/categories";
export default () => {
  const { data, isFetching: loading } = useQuery("getAllPost", getAllPost);
  return (
    <div className="">
    </div>
  );
};
