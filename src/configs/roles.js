const createNavItem = (name, label, className) => ({
  name,
  label,
  class: className,
});

export const ROLE_DEFINITIONS = {
  student: {
    name: "student",
    display: "Ученик",
    defaultRoute: "study",
    navigation: [
      createNavItem("study", "Обучение", "sidebar__link_study"),
      createNavItem("webinars", "Вебинары", "sidebar__link_webinars"),
      createNavItem("tasks", "Задания", "sidebar__link_tasks"),
      createNavItem("messages", "Сообщения", "sidebar__link_messages"),
      createNavItem("profile", "Профиль", "sidebar__link_profile"),
    ],
    extraRoutes: ["player"],
  },
  parent: {
    name: "parent",
    display: "Родитель",
    defaultRoute: "profile",
    navigation: [
      createNavItem("messages", "Сообщения", "sidebar__link_messages"),
      createNavItem("profile", "Профиль", "sidebar__link_profile"),
    ],
    extraRoutes: [],
  },
  teacher: {
    name: "teacher",
    display: "Учитель",
    defaultRoute: "webinars",
    navigation: [
      createNavItem("webinars", "Вебинары", "sidebar__link_webinars"),
      createNavItem("checks", "Проверка", "sidebar__link_checks"),
      createNavItem("messages", "Сообщения", "sidebar__link_messages"),
      createNavItem("profile", "Профиль", "sidebar__link_profile"),
    ],
    extraRoutes: ["player", "taskcheck"],
  },
};

export const ROUTE_ACCESS_MAP = Object.entries(ROLE_DEFINITIONS).reduce(
  (acc, [role, definition]) => {
    const accessibleRoutes = new Set([
      ...(definition.navigation?.map((item) => item.name) ?? []),
      ...(definition.extraRoutes ?? []),
    ]);

    accessibleRoutes.forEach((routeName) => {
      if (!acc[routeName]) {
        acc[routeName] = [];
      }
      acc[routeName].push(role);
    });

    return acc;
  },
  {}
);

console.log('R0', ROUTE_ACCESS_MAP)

export const getNavigationForRole = (roleName) =>
  ROLE_DEFINITIONS[roleName]?.navigation ?? [];

export const getDisplayNameForRole = (roleName) =>
  ROLE_DEFINITIONS[roleName]?.display ?? roleName;

export const getDefaultRouteForRole = (roleName) =>
  ROLE_DEFINITIONS[roleName]?.defaultRoute ?? null;
