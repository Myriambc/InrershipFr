import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#000000";

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: "#007ee2",
    main: "#0093e2",
    light: "#009ee2",
  },
  secondary: {
    contrastText: white,
    dark: "#FD7F44",
    main: "#FD9D59",
    light: "#FEC072",
  },
  success: {
    contrastText: white,
    dark: "#1b5e20",
    main: "#43a047",
    light: "#66bb6a",
  },
  info: {
    contrastText: white,
    dark: "#0d47a1",
    main: "#1e88e5",
    light: "#42a5f5",
  },
  warning: {
    contrastText: white,
    dark: "#bf360c",
    main: "#f4511e",
    light: "#ff7043",
  },
  error: {
    contrastText: white,
    dark: "#b71c1c",
    main: "#e53935",
    light: "#ef5350",
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  background: {
    default: "#F4F6F8",
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};
