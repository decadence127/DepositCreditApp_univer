import { Typography } from "@material-ui/core";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AccountDataInput from "../AccountDataInput";
import classes from "./ATMContainer.module.css";

const ATMContainer: React.FC = (props) => {
  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <Typography variant="h3">Банкомат</Typography>
        <AccountDataInput />
      </div>
    </div>
  );
};

export default ATMContainer;
