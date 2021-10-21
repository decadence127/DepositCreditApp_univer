import React, { ReactNode } from "react";
import PromptButton from "./PromptButton";
import classes from "./routeButton.module.css";

interface Props {
  path: string;
  children?: ReactNode;
}

const RouteButton: React.FC<Props> = ({ path, children }) => {
  return (
    <div className={classes.routeButton}>
      <PromptButton path={path}>{children}</PromptButton>
    </div>
  );
};

export default RouteButton;
