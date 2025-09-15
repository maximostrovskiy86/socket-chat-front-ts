import React from "react";
import style from "./Container.module.scss";

interface Props {
  children: React.ReactElement;
  className?: string;
}

function Container({ children }: Props) {
  return <div className={`${style.container}`}>{children}</div>;
}

export default Container;
