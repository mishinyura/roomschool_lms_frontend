export const API_ENDPOINTS = {
  AUTH: {
    GET: '/auth/',
    CHECK: '/auth/check/',
    REFRESH: '/auth/refresh/',
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    LOGOUT: '/auth/logout/'
  },
  PROFILE: {
    GET: '/profile',
    PASSWORD_UPDATE: '/profile/password/',
    USERNAME_UPDATE: '/profile/username/',
    AVATAR_UPDATE: '/profile/avatar/',
  },
  STUDY: {
    LIST: '/study/',
    GET_BY_ID: (program, module, topic, lesson) => `/player/${program}/${module}/${topic}/${lesson}/`
  },
  TASKS: {
    LIST: '/tasks',
    GET_BY_ID: (id) => `/tasks/${id}/`,
    UPDATE: (id) => `/tasks/${id}/`,
    DELETE: (id) => `/tasks/${id}/`,
    SUBMIT_CHECK: (taskId) => `/tasks/${taskId}/check/`,
  },
  WEBINARS: {
    LIST: '/webinars/',
    JOIN: (slug) => `/webinars/${slug}/join/`,
  },
};