import React from "react";
import { checkAdminName, formatAdminRoleName, isSupAdmin } from "./aclPages";

export const checkPermission = (route, roles, groups) => {
  // console.log(route, roles, groups);
  if (route === "/") {
    return true;
  }

  let groupSupAdmin = false;
  groups.map((group) => {
    if (isSupAdmin(group.roles)) {
      groupSupAdmin = true;
    }
  });
  if (isSupAdmin(roles) || groupSupAdmin) {
    return true;
  }
  if (route === "/users/business" && (isSupAdmin(roles) || groupSupAdmin)) {
    return true;
  }
  if (
    route.includes("/contents/languages")
    //  &&
    // (isSupAdmin(roles) ||
    //   groupSupAdmin ||
    //   checkAdminName(groups, "confirmed_developer") ||
    //   checkAdminName(groups, "developer"))
  ) {
    return true;
  }
  if (
    route === "/developer/logs" &&
    (isSupAdmin(roles) ||
      groupSupAdmin ||
      checkAdminName(groups, "confirmed_developer") ||
      checkAdminName(groups, "developer"))
  ) {
    return true;
  }
  if (
    route.includes("/marketing/finance-codes") &&
    (isSupAdmin(roles) ||
      groupSupAdmin ||
      checkAdminName(groups, "confirmed_developer") ||
      checkAdminName(groups, "responsable_finance"))
  ) {
    return true;
  }
  /* if(route.includes('/archives') &&  (isSupAdmin(roles) || groupSupAdmin || checkAdminName(groups, 'confirmed_developer'))) {
    return true;
  }*/
  let valid = false;
  for (let i = 0; i < roles.length; i++) {
    if (route.replace("-", "").includes("/users/students")) {
      route = route.replace("-", "").replaceAll("students", "users");
    }
    if (route.replace("-", "").includes("/users/teachers")) {
      route = route.replace("-", "").replaceAll("teachers", "users");
    }
    if (route.replace("-", "").includes("/contents/magazines")) {
      route = route.replace("-", "").replaceAll("magazines", "content-files");
    }
    if (route.replace("-", "").includes("/marketing/calleduser/yesteday")) {
      route = route.replace("-", "").replaceAll("/yesteday", "");
    }
    if (route.replace("-", "").includes("/marketing/calleduser/today")) {
      route = route.replace("-", "").replaceAll("/today", "");
    }
    if (route.replace("-", "").includes("/settings/roles")) {
      route = route.replace("-", "").replaceAll("roles", "admin-groups");
    }
    if (route.replace("-", "").includes("/contents/qcm")) {
      route = route.replace("-", "").replaceAll("qcm", "contents");
    }
    if (
      formatAdminRoleName(roles[i].toUpperCase(), true) ===
      formatRouteToRole(route.replaceAll("-", ""))
    ) {
      valid = true;
      break;
    }
    for (let j = 0; j < groups[i]?.roles?.length; j++) {
      if (route.replace("-", "").includes("/users/students")) {
        route = route.replace("-", "").replaceAll("students", "users");
      }
      if (route.replace("-", "").includes("/users/teachers")) {
        route = route.replace("-", "").replaceAll("teachers", "users");
      }
      if (route.replace("-", "").includes("/contents/magazines")) {
        route = route.replace("-", "").replaceAll("magazines", "content-files");
      }
      if (route.replace("-", "").includes("/marketing/calleduser/yesteday")) {
        route = route.replace("-", "").replaceAll("/yesteday", "");
      }
      if (route.replace("-", "").includes("/marketing/calleduser/today")) {
        route = route.replace("-", "").replaceAll("/today", "");
      }
      if (
        formatAdminRoleName(groups[i].roles[j].toUpperCase(), true) ===
        formatRouteToRole(route.replaceAll("-", ""))
      ) {
        valid = true;
        break;
      }
    }
  }

  return valid;
};
const replaceUrl = (route) => {
  if (route.replace("-", "").includes("/users/students")) {
    return route.replace("-", "").replaceAll("students", "users");
  }
  if (route.replace("-", "").includes("/users/teachers")) {
    return route.replace("-", "").replaceAll("teachers", "users");
  }
};
const formatRouteToRole = (url) => {
  let first = url.indexOf("/", 1);
  let second = url.indexOf("/", first + 1);
  let page;
  if (second === -1) {
    page = url.substring(first + 1, url.length);
    return `${page}_list`.toUpperCase();
  } else {
    page = url.substring(first + 1, second);
    let last = url.indexOf("/", second + 1);
    let method;
    if (last === -1) {
      method = url.substring(second + 1, url.length);
    } else {
      method = url.substring(second + 1, last);
    }

    return `${page}_${method}`.toUpperCase();
  }
};
