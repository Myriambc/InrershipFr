import React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Action from "../views/Teacher/components/Table/Action";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
function Row(props) {
  const { row, tableCell } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.full_name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>
          <Action user_id={row.id} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Classess
              </Typography>
              <MuiTable size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {tableCell.map((cell) => {
                      return (
                        <TableCell align="center" key={cell.id}>
                          {cell.name}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.subjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell align="center">{subject.name}</TableCell>
                      <TableCell align="center">
                        {subject.division?.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </MuiTable>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default Row;
