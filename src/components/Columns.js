import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import  {getItemFromStorage, setItemFromStorage} from "../utils/Storage.js";

const useStyles = makeStyles((theme) => ({
  root: {},
  spacer: {
    flexGrow: 1,
  },
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    paddingBottom: '16px !important',
  },
}));

const Columns = (props) => {
  const {className, columns, columnsChange, ...rest} = props;
  const classes = useStyles();
  useEffect(()=>{
    init();
  }, []);

  const init = () => {
    const pageName = window.location.pathname.substr(1);
    for (const column of columns) {
      const isHidden = getItemFromStorage(pageName + '_' + column.accessor)
      if (isHidden) {
        column.show = Boolean(Number(isHidden));
      }
    }
    columnsChange([...columns]);
  };

  const handleChange = (event) => {
    const column = columns.find((c)=> c.accessor === event.target.name);
    column.show = !column.show;
    columnsChange([...columns]);
    const pageName = window.location.pathname.substr(1);
    setItemFromStorage(pageName+'_'+column.accessor, Number(event.target.checked))
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <FormGroup row>
            {columns.map((col) => (
              <FormControlLabel
                key={col.accessor}
                control={<Switch
                  checked={col.show}
                  onChange={handleChange}
                  name={col.accessor} />}
                label={col.label}
              />
            ))}
          </FormGroup>
        </CardContent>
      </Card>
    </div>
  );
};

Columns.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.any,
  columnsChange: PropTypes.func,
};

export default Columns;

