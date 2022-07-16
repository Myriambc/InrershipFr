import React from 'react';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Label from '../../../components/Label';

const useStyles = makeStyles((theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const LevelsInfo = ({
  levels,
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Student levels"/>
      <Divider/>
      <Table>
        <TableBody>
          {levels.map((level) => {
            return (
              <TableRow>
                <TableCell className={classes.fontWeightMedium}>
                  {level?.subject?.name}
                </TableCell>
                <TableCell>
                  <Label color= 'warning'>
                    {level?.student_level?.name}
                  </Label>
                </TableCell>
              </TableRow>
            );
          })}


        </TableBody>
      </Table>
    </Card>
  );
};

LevelsInfo.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default LevelsInfo;
