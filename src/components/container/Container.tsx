import React from "react";

import style from "./Container.module.scss";

interface Props {
    children: React.ComponentProps<any>,
    className?: any
}

function Container({children, className}: Props) {
    return <div className={`${style.container}`}>
        {children}
    </div>;
}

export default Container;
