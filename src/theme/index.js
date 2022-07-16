//import {createMuiTheme} from '@material-ui/core';
import {createTheme} from '@material-ui/core';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import {green} from '@material-ui/core/colors';

//const theme = createMuiTheme({
  const theme = createTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },

});

export default theme;
