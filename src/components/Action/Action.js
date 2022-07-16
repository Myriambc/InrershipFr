import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Delete from "../Action/Delete";

const Action = (props) => {
  const {
    itemId,
    deleteItem,
    otherFunction,
    tableService,
    pageLink,
    unblock,
    noShow,
    noDelete,
    noEdit,
    replace,
    initializeData,
    offerAction,
    rowsPerPage,
    ...rest
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openCache, setCache] = React.useState(false);
  const [openFree, setFree] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setOpenDelete(!openDelete);
  };

  const handleCache = () => {
    setCache(!openCache);
  };
  const handleFreeOffer = () => {
    setFree(!openFree);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        <MenuItem component={Link} to={`${pageLink}/view/${itemId}`}>
          Show
        </MenuItem>

        <MenuItem component={Link} to={`${pageLink}/edit/${itemId}`}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <Delete
        open={openDelete}
        deblock={unblock}
        handleDelete={handleDelete}
        handleClose={handleClose}
        itemId={itemId}
        deleteItem={deleteItem}
        otherFunction={otherFunction}
        replace={replace}
        service={tableService}
        pageLink={pageLink}
        replac={replace}
        rowsPerPage={rowsPerPage}
        initializeData={initializeData}
      />
    </div>
  );
};

Action.propTypes = {
  className: PropTypes.string,
  // itemId: PropTypes.number,
  noShow: PropTypes.bool,
};

export default Action;
