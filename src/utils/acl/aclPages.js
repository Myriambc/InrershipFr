export const aclPages = (pages, roles, groups) => {
  let groupSupAdmin = true;
  /*groups.map(group => {
    if (isSupAdmin(group.roles)) {
      groupSupAdmin = true;
    }
  });*/

  if (groupSupAdmin || isSupAdmin(roles)) {
    return pages;
  }
  let result = [];
  pages.forEach(function(page) {
    let temp = [],
      object = { title: page.title, icon: page.icon },
      found = false;
    if (Array.isArray(page.children)) {
      temp = page.children.filter((childrenPage) =>
        checkPermissionPage(formatTilePage(childrenPage.title), roles, groups)
      );
      if (temp.length) {
        object.children = temp;
        found = true;
      }
    }
    if (found) {
      result.push(object);
    }
  });
  return result;
};

const checkPermissionPage = (roleName, roles, groups) => {
  let exist = false;
  if (roleName === "*") {
    return true;
  }
  roles.map((role) => {
    if (checkRoleName(role, roleName)) {
      exist = true;
    }
  });
  groups.map((group) => {
    group.roles.map((role) => {
      if (checkRoleName(role, roleName)) {
        exist = true;
        return;
      }
    });
  });
  return exist;
};

const checkRoleName = (role, roleName) => {
  return roleName === formatAdminRoleName(role, true);
};

export const formatAdminRoleName = (roleName, withAction = false) => {
  roleName = roleName.replace("ROLE_", "");
  if (withAction) {
    return roleName;
  }
  return roleName.slice(0, roleName.indexOf("_"));
};

const formatTilePage = (title) => {
  return (
    title
      .replace(/\s/g, "")
      .replace("-", "")
      .toUpperCase() + "_VIEW"
  );
};

export const isSupAdmin = (roles) => {
  return roles.includes("ROLE_SUPER_ADMIN");
};

export const checkAdminName = (groups, name) => {
  let isAdmin = false;
  groups.map((group) => {
    if (group?.name === name) {
      isAdmin = true;
    }
  });
  return isAdmin;
};
