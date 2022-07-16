import React from 'react';
import {
  Table as MuiTable, TableBody,
  TableCell, TableHead,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Action from '../views/Business/components/Table/Action';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const {row} = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.full_name}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
        <TableCell>
          <Action user_id={row.id}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                  School
              </Typography>
              <MuiTable size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Group</TableCell>
                    <TableCell >Total seats</TableCell>
                    <TableCell >Rest seats</TableCell>
                    <TableCell >End date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.subscriptions.map((school_group) => (
                    <TableRow key={school_group.id} >
                      <TableCell className={classes.tableCell}>{school_group.group.name}</TableCell>
                      <TableCell >{school_group.total_seats}</TableCell>
                      <TableCell>{school_group.rest_seats}</TableCell>
                      <TableCell>{school_group.end_date}</TableCell>
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
