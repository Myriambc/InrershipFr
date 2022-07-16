import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import Label from "../../../components/Label";

const useStyles = makeStyles(() => ({
    root: {},
}));

const SubscriptionsInfo = ({className, subscriptions, ...rest}) => {
    const classes = useStyles();

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >

            <Box minWidth={1150}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Division</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Responsible</TableCell>
                            <TableCell>End date</TableCell>
                            <TableCell>Createad At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { subscriptions?.length ? (subscriptions.map((subscription) => (
                                <TableRow key={subscription.id}>
                                    <TableCell>
                                        {subscription.id}
                                    </TableCell>
                                    <TableCell>
                                        {subscription.group?.name}
                                    </TableCell>
                                    <TableCell style={{display: 'flex'}}>
                                        {subscription.division.name}
                                    </TableCell>
                                    <TableCell>
                                        <Label
                                            color={subscription.active == '1' ? 'success' : 'error'}>
                                            {subscription.active == '1' ? "TRUE" : "FALSE"}
                                        </Label>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell>
                                    He does not have any subscription
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    );
};

SubscriptionsInfo.propTypes = {
    className: PropTypes.string,
    subscriptions: PropTypes.object.isRequired,
};

export default SubscriptionsInfo;
