import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Bank } from "../../queryHandlers/bankQuery";
import { Client, fetchBankClients } from "../../queryHandlers/clientQuery";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ClientModal from "../Modals/ClientModal";
import CreationModal from "../Modals/CreationModal";

interface Props {
  bank: Bank;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const Row: React.FC<Props> = ({ bank, setReload }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openCreationModal, setOpenCreationModal] = useState<boolean>(false);
  const [clients, setClients] = useState<Client[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentClient, setCurrentClient] = useState<Client | undefined>({
    id: "",
    name: "",
    passport: "",
    birthDate: "",
    phone: "",
    email: "",
    residence: "",
    monthlyIncome: 0,
    balance: 0,
    depositAccounts: [],
    creditAccounts: [],
  });
  window.addEventListener("click", (event: MouseEvent): void => {
    event.preventDefault();
    setOpen(false);
  });
  const clickHandler = async (id: string) => {
    const response = await fetchBankClients(id);

    setClients(response);
    setLoading(false);
  };
  const clickClientHandler = (e: React.MouseEvent) => {
    console.log(e.currentTarget.textContent);
    const id = e.currentTarget.textContent;
    const foundClient = clients!.find(
      (client) => client.id === e.currentTarget.textContent
    );
    setCurrentClient(foundClient);
    setOpenModal(true);
  };
  const addClientHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenCreationModal(true);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              setOpen(!open);
              clickHandler(bank.id);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {bank.id}
        </TableCell>
        <TableCell align="left">{bank.bankTitle}</TableCell>
        <TableCell align="right">{bank.balance}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Клиенты
              </Typography>
              <Table size="small" aria-label="banks">
                <TableHead>
                  <TableRow>
                    <TableCell>ID Клиента</TableCell>
                    <TableCell>Имя клиента</TableCell>
                    <TableCell align="right">E-mail клиента</TableCell>
                    <TableCell align="right">Баланс клиента</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading ? (
                    <>
                      {clients!.length ? (
                        <>
                          {clients!.map((clientRow) => (
                            <TableRow key={clientRow.id}>
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{
                                  "&:hover": {
                                    cursor: "pointer",
                                    color: "gray",
                                    borderBottom: "1px dotted black",
                                  },
                                }}
                                onClick={(event) => clickClientHandler(event)}
                              >
                                {clientRow.id}
                              </TableCell>
                              <TableCell>{clientRow.name}</TableCell>
                              <TableCell align="right">
                                {clientRow.email}
                              </TableCell>
                              <TableCell align="right">
                                {clientRow.balance}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      ) : (
                        <TableCell colSpan={4}>
                          <Typography textAlign="center">
                            Клиентов еще нет
                          </Typography>
                        </TableCell>
                      )}
                    </>
                  ) : (
                    <CircularProgress />
                  )}
                  <TableRow
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#fafafa",
                      },
                    }}
                  >
                    <TableCell
                      colSpan={4}
                      onClick={(event) => addClientHandler(event)}
                    >
                      <Typography textAlign="center" fontWeight="700">
                        Добавить
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {
        <CreationModal
          setReload={setReload}
          bankId={bank.id}
          setOpen={setOpenCreationModal}
          isOpen={openCreationModal}
        />
      }
      {
        <ClientModal
          setReload={setReload}
          client={currentClient!}
          setOpen={setOpenModal}
          isOpen={openModal}
        />
      }
    </React.Fragment>
  );
};
export default Row;
