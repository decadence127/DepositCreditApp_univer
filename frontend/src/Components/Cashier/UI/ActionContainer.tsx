import { Box, Button } from "@mui/material";
import React from "react";
type Props = {
  exit: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActionContainer: React.FC<Props> = ({ children, exit }) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: 2,
        }}
      >
        {children}
        <Button
          sx={{ marginTop: 3 }}
          color="info"
          variant="contained"
          onClick={(e) => exit(true)}
        >
          Вернуться
        </Button>
      </Box>
    </div>
  );
};

export default ActionContainer;
