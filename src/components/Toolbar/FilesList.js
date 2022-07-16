import React, {useState, useCallback, useEffect} from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    makeStyles,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import SnackBar from "../SnackBar";
import {api_delete} from "../../utils/Api";

const useStyles = makeStyles((theme) => ({
    root: {},
    dropZone: {
        border: `1px dashed ${theme.palette.divider}`,
        padding: theme.spacing(6),
        outline: "none",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "center",
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
            opacity: 0.5,
            cursor: "pointer",
        },
    },
    dragActive: {
        backgroundColor: theme.palette.action.active,
        opacity: 0.5,
    },
    image: {
        width: 130,
    },
    info: {
        marginTop: theme.spacing(1),
    },
    list: {
        maxHeight: 320,
    },
    actions: {
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "flex-end",
        "& > * + *": {
            marginLeft: theme.spacing(2),
        },
    },
}));

const FilesList = (props) => {
    const {className, attachments, getElementDatas, isMagazine, magazineId} = props;
    const classes = useStyles();
    const [message, setAlertMessage] = useState('');
    const [severity, setAlertSeverity] = useState('success');
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [fileToDelete, setFile] = React.useState(null);

    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
    }

    const handleClick = (file) => {
        //open delete popups
        setFile(file);
        setOpenModal(true);
    };
    const handleModalClose = () => {
        setOpenModal(!openModal);
    };
    const deletecontentFile=(file)=>{
        const id = magazineId ? magazineId : file?.id
        api_delete(`content-file/${id}`).then((data)=>{
            if(data.code != 200){
                setOpen(true);
                setAlertSeverity('warning')
                setAlertMessage(data.message)
            }
            else{
                setOpen(true);
                setAlertSeverity('success')
                setAlertMessage('File deleted')
                getElementDatas()
                setOpenModal(false)
            }
        });

    }

    const deleteFile=(file)=>{
        if((attachments && attachments[0]?.files && attachments[0]?.files?.length > 1)){
            api_delete(`file/${file.id}`).then((data)=>{
                if(data.code != 200){
                    setOpen(true);
                    setAlertSeverity('warning')
                    setAlertMessage(data.message)
                    setOpenModal(false)
                }
                else{
                    setOpen(true);
                    setAlertSeverity('success')
                    setAlertMessage('File deleted')
                    getElementDatas()
                    setOpenModal(false)

                }
            });
        }else{
            const id = magazineId ? magazineId : attachments[0].id
            api_delete(`content-file/${id}`).then((data)=>{
                if(data.code != 200){
                    setOpen(true);
                    setAlertSeverity('warning')
                    setAlertMessage(data.message)
                }
                else{
                    setOpen(true);
                    setAlertSeverity('success')
                    setAlertMessage('File deleted')
                    getElementDatas()
                }
            });
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {attachments && attachments?.length > 0 && !isMagazine && (

                <Box mt={2} mb={1}>
                    <Typography variant="subtitle2" color="textSecondary">
                        Attachments
                    </Typography>
                    <>
                        <PerfectScrollbar options={{ suppressScrollX: true }}>
                            <List className={classes.list}>
                                {Object.values(attachments).map((file, i) =>  (
                                    <ListItem divider={i < attachments?.length - 1} key={i}>
                                        <ListItemLink href={file?.file?.url}>
                                            <ListItemIcon>
                                                <FileCopyIcon/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={file?.file?.name}
                                                style={{overflowWrap: 'break-word'}}
                                                primaryTypographyProps={{variant: "h5"}}
                                            />
                                        </ListItemLink>
                                        <div>
                                            <IconButton
                                                aria-label="more"
                                                aria-controls="long-menu"
                                                aria-haspopup="true"
                                                onClick={()=> handleClick(file)}
                                            >
                                                <HighlightOffIcon/>
                                            </IconButton>
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </PerfectScrollbar>
                    </>
                </Box>
            )}
           {isMagazine  && attachments && attachments[0] && (attachments[0].file.url && attachments[0].file.url.includes('.pdf') || (attachments[0]?.file?.name && attachments[0]?.file?.name.includes('.pdf'))|| attachments[0]?.file?.name)  && (

                <Box mt={2} mb={1}>
                    <Typography variant="subtitle2" color="textSecondary">
                        Attachments
                    </Typography>
                    <>
                        <PerfectScrollbar options={{ suppressScrollX: true }}>
                            <List className={classes.list}>
                                    <ListItem>
                                        <ListItemLink href={attachments[0]?.file?.url}>
                                            <ListItemIcon>
                                                <FileCopyIcon/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={attachments[0]?.file?.name}
                                                style={{overflowWrap: 'break-word'}}
                                                primaryTypographyProps={{variant: "h5"}}
                                            />
                                        </ListItemLink>
                                        <div>
                                            <IconButton
                                                aria-label="more"
                                                aria-controls="long-menu"
                                                aria-haspopup="true"
                                                onClick={()=> handleClick(attachments[0])}
                                            >
                                                <HighlightOffIcon/>
                                            </IconButton>
                                        </div>
                                    </ListItem>
                            </List>
                        </PerfectScrollbar>
                    </>
                </Box>
            )}
            <Dialog
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete File Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this file ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=> deletecontentFile(fileToDelete)} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <SnackBar
                open={open}
                message={message}
                severity={severity}
                handleClose={handleClose}
            />
        </>
    );
};

FilesList.propTypes = {
    className: PropTypes.string,
    setValues: PropTypes.func,
    values: PropTypes.object,
    onFileChange: PropTypes.func,
};

export default FilesList;
