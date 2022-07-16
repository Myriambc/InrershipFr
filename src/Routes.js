import React, { Fragment, lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MinimalLayout from "./layouts/Minimal";
import MainLayout from "./layouts/Main";
import LoadingScreen from "./components/LoadingScreen";
import AuthGuard from "./components/AuthGuard";
import GuestGuard from "./components/GuestGuard";
import { useStore } from "./contexts/JWTAuthContext";
import { checkPermission } from "./utils/acl/aclRouter";
import { Dashboard } from "./views";
import LoginView from "./views/LoginView";
import { Helmet } from "react-helmet";

export const RenderRoutes = ({ routes }) => {
  const { user, isAuthenticated } = useStore();
  // console.log("user", user);
  // console.log(isAuthenticated);
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
                    <Dashboard />
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
        component: lazy(() => import("./views/Dashboard")),
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
      //levels
      {
        exact: true,
        path: "/contents/levels",
        component: lazy(() => import("./views/Level/LevelList")),
        title: "TA|Contents-levels",
      },
      {
        exact: true,
        path: "/contents/levels/create",
        component: lazy(() => import("./views/Level/LevelCreate")),
        title: "TA|Contents-levels-create",
      },
      {
        exact: true,
        path: "/contents/levels/edit/:id",
        component: lazy(() => import("./views/Level/LevelEdit")),
        title: "TA|Contents-levels-edit",
      },
      {
        exact: true,
        path: "/orders/levels",
        component: lazy(() => import("./views/Orders/Levels/LevelOrder")),
        title: "TA|Contents-levels-orders",
      },

      //languages
      {
        exact: true,
        path: "/contents/languages",
        component: lazy(() => import("./views/Language/LanguageList")),
        title: "TA|Contents-languages",
      },
      {
        exact: true,
        path: "/contents/languages/create",
        component: lazy(() => import("./views/Language/LanguageCreate")),
        title: "TA|Contents-languages-create",
      },
      {
        exact: true,
        path: "/contents/languages/edit/:id",
        component: lazy(() => import("./views/Language/LanguageEdit")),
        title: "TA|Contents-languages-edit",
      },
      // {
      //   exact: true,
      //   path: "/contents/languages/view/:id",
      //   component: lazy(() => import("./views/Language/LanguageShow")),
      //   title: "TA|Contents-languages-edit",
      // },
      // courses
      {
        exact: true,
        path: "/contents/courses",
        component: lazy(() => import("./views/Course/CourseList")),
        title: "TA|Contents-courses",
      },
      {
        exact: true,
        path: "/contents/courses/create",
        component: lazy(() => import("./views/Course/CourseCreate")),
        title: "TA|Contents-courses-create",
      },
      {
        exact: true,
        path: "/contents/courses/edit/:id",
        component: lazy(() => import("./views/Course/CourseEdit")),
        title: "TA|Contents-courses-edit",
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
      {
        exact: true,
        path: "/orders/lessons",
        component: lazy(() => import("./views/Orders/Lesson/LessonOrder")),
        title: "TA|Contents-lessons-orders",
      },
      //exercices
      {
        exact: true,
        path: "/contents/exercises",
        component: lazy(() => import("./views/Exercise/ExerciseList")),
        title: "TA|Contents-exercises",
      },
      {
        exact: true,
        path: "/contents/exercises/create",
        component: lazy(() => import("./views/Exercise/ExerciseCreate")),
        title: "TA|Contents-exercises-create",
      },
      {
        exact: true,
        path: "/contents/exercises/edit/:id",
        component: lazy(() => import("./views/Exercise/ExerciseEdit")),
        title: "TA|Contents-exercises-edit",
      },
      // {
      //   exact: true,
      //   path: "/contents/exercises/view/:id",
      //   component: lazy(() => import("./views/Lesson/LessonShow")),
      //   title: "TA|Contents-exercices-view",
      // },
      {
        exact: true,
        path: "/orders/exercises",
        component: lazy(() => import("./views/Orders/Exercises/ExerciseOrder")),
        title: "TA|Contents-exercises-orders",
      },
      //questions
      {
        exact: true,
        path: "/contents/questions",
        component: lazy(() => import("./views/Question/QuestionList")),
        title: "TA|Contents-questions",
      },
      {
        exact: true,
        path: "/contents/questions/create",
        component: lazy(() => import("./views/Question/QuestionCreate")),
        title: "TA|Contents-questions-create",
      },
      {
        exact: true,
        path: "/contents/questions/edit/:id",
        component: lazy(() => import("./views/Question/QuestionEdit")),
        title: "TA|Contents-questions-edit",
      },
      // {
      //   exact: true,
      //   path: "/contents/questions/view/:id",
      //   component: lazy(() => import("./views/Question/QuestionShow")),
      //   title: "TA|Contents-questions-view",
      // },
      {
        exact: true,
        path: "/orders/questions",
        component: lazy(() => import("./views/Orders/Questions/QuestionOrder")),
        title: "TA|Contents-questions-orders",
      },
      //exercice type
      {
        exact: true,
        path: "/contents/exercises-types",
        component: lazy(() => import("./views/Exercise-type/ExerciseTypeList")),
        title: "TA|Contents-exercises-types",
      },
      {
        exact: true,
        path: "/contents/exercises-types/create",
        component: lazy(() =>
          import("./views/Exercise-type/ExerciseTypeCreate")
        ),
        title: "TA|Contents-exercises-types-create",
      },
      {
        exact: true,
        path: "/contents/exercises-types/edit/:id",
        component: lazy(() => import("./views/Exercise-type/ExerciseTypeEdit")),
        title: "TA|Contents-exercises-types-edit",
      },
      //dashboard
      {
        exact: true,
        path: "/dashboard",
        component: () => <Redirect to="/" />,
        title: "TA|Dashboard",
      },
    ],
  },
  {
    path: "*",
    layout: MinimalLayout,
    routes: [
      // {
      //   exact: true,
      //   path: '/',
      //   component: HomeView
      // },
      {
        component: () => <Redirect to="/404" />,
        title: "TA|Not found",
      },
    ],
  },
];

export default routes;
