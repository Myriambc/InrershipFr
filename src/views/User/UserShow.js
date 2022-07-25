import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Divider,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import Page from "../../components/Page";
import UserInfo from "./UserView/Index";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import SimpleToolbar from "../../components/Toolbar/SimpleToolbar";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slices/users";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const UserShow = (props) => {
  const dispatch = useDispatch();

  const { Link, pageLink, title, ...rest } = props;
  const { user, loading } = useSelector((state) => state.users);

  const { id } = useParams();
  const classes = useStyles();
  const [studentLevels, setStudentLevels] = useState([]);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [currentTab, setCurrentTab] = useState("details");
  const [userSubscriptions, getSubscriptions] = useState([]);

  const tabs = [
    { value: "details", label: "Basics" },
    { value: "subscriptions", label: "Subscriptions" },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  useEffect(() => {
    switch (currentTab) {
      case "details":
        break;
      case "subscriptions":
        break;
    }
  }, [currentTab, id]);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch]);

  if (loading === "loading") return <Loading />;

  return (
    <div>
      <SimpleToolbar Link={Link} pageLink={"/admins"} title={"User Details"} />
      <Page className={classes.root} title="User Details">
        <Container maxWidth={false}>
          <Box mt={4}>
            <Tabs
              onChange={handleTabsChange}
              scrollButtons="auto"
              value={currentTab}
              variant="scrollable"
              textColor="secondary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box mt={3}>
            {currentTab === "details" && (
              <UserInfo
                user={user}
                levels={studentLevels}
                pointsHistory={pointsHistory}
              />
            )}
          </Box>
        </Container>
      </Page>
    </div>
  );
};
export default UserShow;
