import React from "react";
const Layout = ({ children }: any) => {
  const isLoggedIn = true;
  return isLoggedIn ? (
    <div>
      <div className="text-3xl font-bold underline "> </div>
      {children && children}
    </div>
  ) : (
    <div>{children}</div>
  );
};
export default Layout;
