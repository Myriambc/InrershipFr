// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Divider,
//   makeStyles,
//   Tab,
//   Tabs,
// } from "@material-ui/core";
// import Page from "../../components/Page";
// import { useParams } from "react-router-dom";
// import SimpleToolbar from "../../components/Toolbar/SimpleToolbar";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     minHeight: "100%",
//     paddingTop: theme.spacing(3),
//     paddingBottom: theme.spacing(3),
//   },
// }));

// const LessonShow = (props) => {
//   const { Link, pageLink, title, ...rest } = props;
//   const { id } = useParams();
//   const classes = useStyles();
//   const [chapter, setChapter] = useState([]);
//   const [currentTab, setCurrentTab] = useState("details");

//   const tabs = [{ value: "details", label: "Chapter details" }];

//   const handleTabsChange = (event, value) => {
//     setCurrentTab(value);
//   };

//   useEffect(() => {}, []);
//   if (!Object.keys(chapter).length) {
//     //return (<Loading/>);
//   }
//   return (
//     <div>
//       <SimpleToolbar
//         Link={Link}
//         pageLink={"/contents/lessons"}
//         title={"Lessons"}
//       />
//       <Page className={classes.root} title="Lesson Details">
//         <Container maxWidth={false}>
//           <Box mt={3}>
//             <Tabs
//               onChange={handleTabsChange}
//               scrollButtons="auto"
//               value={currentTab}
//               variant="scrollable"
//               textColor="secondary"
//             >
//               {tabs.map((tab) => (
//                 <Tab key={tab.value} label={tab.label} value={tab.value} />
//               ))}
//             </Tabs>
//           </Box>
//           <Divider />
//           <Box mt={3}>
//             {/* {currentTab === "details" && <ChapterInfo chapter={chapter} />} */}
//           </Box>
//         </Container>
//       </Page>
//     </div>
//   );
// };

// export default LessonShow;
