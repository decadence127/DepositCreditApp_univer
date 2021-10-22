import React from "react";
import classes from "./ATMContainer.module.css";

const ATMContainer: React.FC = (props) => {
  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}></div>
    </div>
  );
};

export default ATMContainer;
