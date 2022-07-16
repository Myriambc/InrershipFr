import React, { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, colors, List, ListItem } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";
import { aclPages } from "../../../../../../utils/acl/aclPages";

const styles = (theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  buttonChild: {
    color: colors.blueGrey[800],
    padding: "10px 8px 10px 25px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightRegular,
  },
  icon: {
    color: theme.palette.icon,
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    marginRight: 30,
  },
  expandIcon: {
    marginLeft: "auto",
  },
  display: "flex",
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
});

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgb(30,88,88)",
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}))(Tooltip);

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

class SidebarNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: props.open,
      pages: aclPages(
        props.pages,
        props?.user?.roles,
        props?.user?.admin_groups
      ),
      user: [],
      open: false,
      groupSupAdmin: false,
      Click: props.open,
      itemSelected: null,
    };
    this.openModal = this.openModal.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }
  openModal() {
    this.setState({ open: true });
  }
  componentDidMount() {
    const pathname = window.location.pathname;
    const parent = this.props.pages.find((p) => {
      if (p.children) {
        return p.children.find((c) => {
          return pathname.includes(c.href);
        });
      }
    });
    if (parent) {
      this.setState({ [parent.title]: true });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user != this.state.user) {
      this.setState({
        pages: aclPages(
          this.props.pages,
          prevProps?.user?.roles,
          prevProps?.user?.admin_groups
        ),
        user: prevProps.user,
      });
    }
  }
  handleClick = (e) => {
    this.setState({ [e]: !this.state[e] });
  };

  handleSelected = (index) => {
    this.setState((prev) => {
      return {
        ...prev,
        itemSelected: prev.itemSelected == index ? null : index,
      };
    });
  };

  render() {
    const { pages, Click, classes, className, user, ...rest } = this.props;
    return (
      <div>
        <List {...rest} className={clsx(classes.root, className)}>
          {this.state.pages.map((page, index) => {
            return (
              <div key={page.title}>
                {page.children != null ? (
                  <div>
                    <ListItem
                      className={classes.item}
                      disableGutters
                      key={page.title}
                      onClick={() => {
                        this.handleSelected(index);
                      }}
                    >
                      {!this.props.sidebar ? (
                        <LightTooltip title={page.title} placement="right">
                          <Button
                            onClick={this.props.Click}
                            className={classes.button}
                          >
                            <div className={classes.icon}>{page.icon}</div>
                            {page.title}

                            {this.state.itemSelected == index ? (
                              <ExpandLess className={classes.expandIcon} />
                            ) : (
                              <ExpandMore className={classes.expandIcon} />
                            )}
                          </Button>
                        </LightTooltip>
                      ) : (
                        <Button
                          onClick={this.props.Click}
                          className={classes.button}
                        >
                          <div className={classes.icon}>{page.icon}</div>
                          {page.title}

                          {this.state.itemSelected == index ? (
                            <ExpandLess className={classes.expandIcon} />
                          ) : (
                            <ExpandMore className={classes.expandIcon} />
                          )}
                        </Button>
                      )}
                    </ListItem>
                    {this.props.sidebar && this.state.itemSelected == index && (
                      <Collapse
                        component="li"
                        in={this.state.itemSelected == index}
                        timeout="auto"
                        unmountOnExit={true}
                      >
                        <List>
                          {page.children.map((child) => {
                            return (
                              <ListItem
                                className={classes.item}
                                disableGutters
                                key={child.title}
                                onClick={this.handleClick.bind(
                                  this,
                                  child.title
                                )}
                              >
                                {child.external ? (
                                  <Button
                                    activeClassName={classes.active}
                                    className={classes.buttonChild}
                                    component="a"
                                    href={child.href}
                                    target="_blank"
                                  >
                                    {child.title}
                                  </Button>
                                ) : (
                                  <Button
                                    activeClassName={classes.active}
                                    className={classes.buttonChild}
                                    component={CustomRouterLink}
                                    to={child.href}
                                  >
                                    {child.title}
                                  </Button>
                                )}
                              </ListItem>
                            );
                          })}
                        </List>
                      </Collapse>
                    )}
                  </div>
                ) : (
                  <ListItem
                    className={classes.item}
                    disableGutters
                    key={page.title}
                    onClick={this.handleClick.bind(this, page.title)}
                  >
                    <Button
                      activeClassName={classes.active}
                      className={classes.button}
                      component={CustomRouterLink}
                      to={page.href}
                    >
                      <div className={classes.icon}>{page.icon}</div>
                      {page.title}
                    </Button>
                  </ListItem>
                )}
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

SidebarNav.propTypes = {
  // className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default withStyles(styles)(SidebarNav);
