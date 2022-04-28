import React from "react";
const Layout = ({ children }: any) => {
  const isLoggedIn = true;
  return isLoggedIn ? (
      <div className="flex flex-col flex-1">
          <div className="text-3xl font-bold underline "> Header</div>
          {children && children}
      </div>
  ) : (
      <div className="flex flex-1 flex-grow">{children}</div>
  );
};
export default Layout;
