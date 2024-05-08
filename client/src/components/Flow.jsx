import React from "react";
import Posts from "./posts/Posts";
import Box from "./Box";

const Flow = () => {
  return (
    <div className=" relative flex py-2 justify-center w-full gap-3 ">
      <Posts />
      <Box />
    </div>
  );
};

Flow.displayName = "Flow";
export default Flow;
