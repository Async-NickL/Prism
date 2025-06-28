import { checkUser } from "@/actions/checkUser";
import React from "react";

const layout = async ({ children }) => {
  await checkUser();
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
};

export default layout;
