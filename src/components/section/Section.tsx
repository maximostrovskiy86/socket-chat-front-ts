import React from "react";
import style from "./Section.module.scss";

type Props = {
  children: React.ReactElement;
  title: string;
};

const Section = function ({ children, title = "" }: Props) {
  return (
    <div className={style.section}>
      <h2 className={style.title}>{title.toUpperCase()}</h2>
      {children}
    </div>
  );
};

export default Section;
