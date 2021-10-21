import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { green} from '@mui/material/colors';


interface Props{
  path: string,
  children?: ReactNode,
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  borderRadius: "50%",
  width: "90px",
  height: "90px",
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[700],
  },
}));

const PromptButton:React.FC<Props> = ({path, children}) => {
  const history = useHistory();
  return (
  <ColorButton variant="contained" onClick={()=>history.push(path)}>
  {children}
  </ColorButton>
  );
};

export default PromptButton;