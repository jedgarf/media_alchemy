import React from "react";

const moveTo = (className: string) => {
    const element = document.getElementsByClassName(className);
    if (element) {
    element[0].scrollIntoView({ behavior: "smooth" });
    }
};

export { moveTo };