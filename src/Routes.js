import React, { Fragment, lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MinimalLayout from "./layouts/Minimal";
import MainLayout from "./layouts/Main";
import LoadingScreen from "./components/LoadingScreen";
import AuthGuard from "./components/AuthGuard";
import GuestGuard from "./components/GuestGuard";
import { useStore } from "./contexts/JWTAuthContext";
import { checkPermission } from "./utils/acl/aclRouter";
// import { Dashboard } from "./views";
import LoginView from "./views/LoginView";
import { Helmet } from "react-helmet";

export const RenderRoutes = ({ routes }) => {
  const { user, isAuthenticated } = useStore();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;
          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Layout>
                  <Helmet>
                    <title>{route.title}</title>
                  </Helmet>
                  {/* {route.routes ? (
                    <RenderRoutes routes={route.routes} />
                  ) : (
                    <Component {...props} />
                  )} */}
                  {route.routes ? (
                    <RenderRoutes routes={route.routes} />
                  ) : user &&
                    checkPermission(route.path, ["ROLE_SUPER_ADMIN"], []) ? (
                    <Component {...props} />
                  ) : !user && !isAuthenticated ? (
                    <LoginView />
                  ) : (
                    <div>not found</div>
                  )}
                </Layout>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
};

const routes = [
  {
    exact: true,
    layout: MinimalLayout,
    path: "/404",
    component: lazy(() => import("./views/NotFound")),
  },
  {
    exact: true,
    layout: MinimalLayout,
    guard: GuestGuard,
    path: "/login",
    component: lazy(() => import("./views/LoginView")),
  },
  {
    path: "/",
    guard: AuthGuard,
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: "/",
        component: lazy(() => import("./views/User/UserList")),
      },
      {
        exact: true,
        path: "/admins",
        component: lazy(() => import("./views/User/UserList")),
        title: "VTL | ADMINS",
      },
      {
        exact: true,
        path: "/admins/create",
        component: lazy(() => import("./views/User/UserCreate")),
        title: "TA|Students-create",
      },
      {
        exact: true,
        path: "/admins/edit/:id",
        component: lazy(() => import("./views/User/UserEdit")),
        title: "TA|Students-edit",
      },
      {
        exact: true,
        path: "/admins/view/:id",
        component: lazy(() => import("./views/User/UserShow")),
        title: "TA|Students-view",
      },
      //lessons
      {
        exact: true,
        path: "/contents/lessons",
        component: lazy(() => import("./views/Lesson/LessonList")),
        title: "TA|Contents-lessons",
      },
      {
        exact: true,
        path: "/contents/lessons/create",
        component: lazy(() => import("./views/Lesson/LessonCreate")),
        title: "TA|Contents-lessons-create",
      },
      {
        exact: true,
        path: "/contents/lessons/edit/:id",
        component: lazy(() => import("./views/Lesson/LessonEdit")),
        title: "TA|Contents-lessons-edit",
      },
      {
        exact: true,
        path: "/contents/lessons/view/:id",
        component: lazy(() => import("./views/Lesson/LessonShow")),
        title: "TA|Contents-lessons-view",
      },
    ],
  },
  {
    path: "*",
    layout: MinimalLayout,
    routes: [
      {
        component: () => <Redirect to="/404" />,
        title: "VTL |Not found",
      },
    ],
  },
];

export default routes;
