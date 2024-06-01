import React from "react";

interface Props {
  children: any;
}

const layout: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;
