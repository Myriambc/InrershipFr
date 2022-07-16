// import React from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import {
//   Card,
//   CardHeader,
//   Divider,
//   makeStyles,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   Typography,
// } from "@material-ui/core";
// import PersonIcon from "@material-ui/icons/PersonOutline";
// import Label from "../../../components/Label";
// import { api_get } from "../../../utils/Api";

// const useStyles = makeStyles((theme) => ({
//   root: {},
//   fontWeightMedium: {
//     fontWeight: theme.typography.fontWeightMedium,
//   },
// }));

// const BasicsInfo = ({ user, className, ...rest }) => {
//   const classes = useStyles();
//   const StudentUrl = process.env.REACT_APP_FRONT_STUDENT_URL;
//   const switchStudent = (event, id) => {
//     // api_get(`users/login-as/${id}`).then((data) => {
//     //window.open(data.redirect_url);
//     // window.open(
//     //   `${StudentUrl}/switch?token=${data.payload?.token}&userId=${data.payload?.userId}&adminId=${data.payload?.adminId}`
//     // );
//     //window.location.replace=`${StudentUrl}/switch/${data.payload?.token}`;
//     // });
//   };

//   const fullName = (firstName, lastName) => {
//     return `${firstName} ${lastName}`;
//   };
//   return (
//     <Card className={clsx(classes.root, className)} {...rest}>
//       <CardHeader title="User info" />
//       <Divider />
//       <Table>
//         <TableBody>
//           <TableRow>
//             <TableCell className={classes.fontWeightMedium}>ID</TableCell>
//             <TableCell>
//               <Typography variant="body2" color="textSecondary">
//                 {user?._id}
//               </Typography>
//             </TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className={classes.fontWeightMedium}>Email</TableCell>
//             <TableCell>
//               <Typography variant="body2" color="textSecondary">
//                 {user?.email ?? "NULL"}
//               </Typography>
//             </TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className={classes.fontWeightMedium}>Phone</TableCell>
//             <TableCell>
//               <Typography variant="body2" color="textSecondary">
//                 {user?.phone ?? "NULL"}
//               </Typography>
//             </TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className={classes.fontWeightMedium}>
//               Verif Code
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" color="textSecondary">
//                 {user?.verifCode ?? "NULL"}
//               </Typography>
//             </TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className={classes.fontWeightMedium}>
//               Verif Code Expires
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" color="textSecondary">
//                 {user?.verifCodeExpires ?? "NULL"}
//               </Typography>
//             </TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className={classes.fontWeightMedium}>
//               Full Name
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" color="textSecondary">
//                 {user?.fullName}
//               </Typography>
//             </TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className={classes.fontWeightMedium}>
//               Created Date
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" color="textSecondary">
//                 {user?.createdAt}
//               </Typography>
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </Card>
//   );
// };

// BasicsInfo.propTypes = {
//   className: PropTypes.string,
//   customer: PropTypes.object.isRequired,
// };

// export default BasicsInfo;
