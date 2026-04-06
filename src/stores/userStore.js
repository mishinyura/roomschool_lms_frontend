import defineStore from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
    user: null,
    activeRole: null,
  }),

  getters: {
    availableRoles: (state) => state.user?.roles || [],

    currentContextData: (state) => {
      if (state.activeRole === 'teacher') return state.user.teacherProfile;
      if (state.activeRole === 'parent') return state.user.parentProfile;
      if (state.activeRole === 'student') return state.user.studentProfile;
      return null;
    },
    
    commonData: (state) => state.user?.identity
  },

  actions: {
    async fetchProfile() {
      const res = await api.get('/profile/me');
      this.user = res.data;
      // По умолчанию ставим первую роль из списка активной
      if (!this.activeRole) this.activeRole = this.user.roles[0];
    },
    
    switchRole(role) {
      if (this.user.roles.includes(role)) {
        this.activeRole = role;
      }
    }
  }
})