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
        title: "VTL|Admins-create",
      },
      {
        exact: true,
        path: "/admins/edit/:id",
        component: lazy(() => import("./views/User/UserEdit")),
        title: "VTL|Students-edit",
      },
      {
        exact: true,
        path: "/admins/view/:id",
        component: lazy(() => import("./views/User/UserShow")),
        title: "VTL|Students-view",
      },
      //saisons
      {
        exact: true,
        path: "/contents/saisons",
        component: lazy(() => import("./views/Saison/LessonList")),
        title: "VTL|Contents-saisons",
      },
      {
        exact: true,
        path: "/contents/saisons/create",
        component: lazy(() => import("./views/Saison/LessonCreate")),
        title: "VTL|Contents-lessons-create",
      },
      // {
      //   exact: true,
      //   path: "/contents/lessons/edit/:id",
      //   component: lazy(() => import("./views/Saison/LessonEdit")),
      //   title: "VTL|Contents-lessons-edit",
      // },
      // {
      //   exact: true,
      //   path: "/contents/lessons/view/:id",
      //   component: lazy(() => import("./views/Saison/LessonShow")),
      //   title: "VTL|Contents-lessons-view",
      // },
      //phases
      {
        exact: true,
        path: "/contents/phases",
        component: lazy(() => import("./views/Phase/PhaseList")),
        title: "VTL|Contents-phases",
      },
      {
        exact: true,
        path: "/contents/phases/create",
        component: lazy(() => import("./views/Phase/PhaseCreate")),
        title: "VTL|Contents-phases-create",
      },
      {
        exact: true,
        path: "/contents/familles",
        component: lazy(() => import("./views/Famille/FamilleList")),
        title: "VTL|Contents-phases",
      },
      {
        exact: true,
        path: "/contents/familles/create",
        component: lazy(() => import("./views/Famille/FamilleCreate")),
        title: "VTL|Contents-phases-create",
      },
      //ligneProduit
      {
        exact: true,
        path: "/contents/lignes-produit",
        component: lazy(() => import("./views/LigneProduit/LigneProduitList")),
        title: "VTL|Contents-ligneProduit",
      },
      {
        exact: true,
        path: "/contents/lignes-produit/create",
        component: lazy(() =>
          import("./views/LigneProduit/LigneProduitCreate")
        ),
        title: "VTL|Contents-phases-lignes-produit",
      },
      //modele
      {
        exact: true,
        path: "/contents/modeles",
        component: lazy(() => import("./views/Modele/ModeleList")),
        title: "VTL|Contents-Modeles",
      },
      {
        exact: true,
        path: "/contents/modeles/create",
        component: lazy(() => import("./views/Modele/ModeleCreate")),
        title: "VTL| Contents-Modeles",
      },
      // client
      {
        exact: true,
        path: "/contents/clients",
        component: lazy(() => import("./views/Client/ClientList")),
        title: "VTL|Contents-Modele",
      },
      {
        exact: true,
        path: "/contents/clients/create",
        component: lazy(() => import("./views/Client/ClientCreate")),
        title: "VTL|Contents-Modele",
      },
    ],
  },
  {
    path: "*",
    layout: MinimalLayout,
    routes: [
      {
        component: () => <Redirect to="/404" />,
        title: "VTL|Not found",
      },
    ],
  },
];

export default routes;
