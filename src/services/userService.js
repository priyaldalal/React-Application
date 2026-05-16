import { mockUsers } from '../data/mockData';

const STORAGE_KEY = 'app_users';

export const userService = {
  getUsers: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUsers));
      return mockUsers;
    }
    return JSON.parse(stored);
  },

  saveUsers: (users) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },

  addUser: (user) => {
    const users = userService.getUsers();
    const newUser = { ...user, id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1 };
    const updated = [newUser, ...users];
    userService.saveUsers(updated);
    return newUser;
  },

  updateUser: (id, userData) => {
    const users = userService.getUsers();
    const updated = users.map(u => u.id === id ? { ...u, ...userData } : u);
    userService.saveUsers(updated);
    return updated.find(u => u.id === id);
  },

  deleteUser: (id) => {
    const users = userService.getUsers();
    const updated = users.filter(u => u.id !== id);
    userService.saveUsers(updated);
  },

  getUserById: (id) => {
    const users = userService.getUsers();
    return users.find(u => u.id === parseInt(id));
  }
};
