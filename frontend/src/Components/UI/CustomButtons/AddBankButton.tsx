import { Box } from "@mui/system";
import React, { SetStateAction, useState } from "react";
import classes from "./bankCard.module.css";
import BankCreationModal from "../../Modals/BankCreationModal";
interface Props {
  setReload: React.Dispatch<SetStateAction<boolean>>;
}
const AddBankButton: React.FC<Props> = ({ setReload }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const clickHandler = () => {
    setOpenAddModal(!openAddModal);
  };
  return (
    <>
      <Box className={classes.bankBox} onClick={clickHandler}>
        <p>Добавить банк</p>
      </Box>
      {openAddModal && (
        <BankCreationModal
          setReload={setReload}
          isOpen={openAddModal}
          setOpen={setOpenAddModal}
        />
      )}
    </>
  );
};

export default AddBankButton;
