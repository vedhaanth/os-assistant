import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../constants/config';

const USERS_KEY = 'jaggy_users';
const CURRENT_USER_KEY = 'jaggy_current_user';

const getStoredUsers = () => {
  const usersJson = localStorage.getItem(USERS_KEY);
  let users = usersJson ? JSON.parse(usersJson) : [];
  
  // Always ensure the current defined ADMIN_EMAIL exists in the users list
  const adminExists = users.find(u => u.email === ADMIN_EMAIL);
  if (!adminExists) {
    const adminUser = {
      uid: 'admin-001',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      displayName: 'Jaggy Administrator (Vedhaanth)',
      creationTime: new Date().toISOString()
    };
    users.push(adminUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } else if (adminExists.password !== ADMIN_PASSWORD) {
    // Also update password if it changed in config
    adminExists.password = ADMIN_PASSWORD;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  
  return users;
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const observers = [];

export const mockAuth = {
  // Sign in
  signIn: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const users = getStoredUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const sessionUser = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName 
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    observers.forEach(callback => callback(sessionUser));
    return sessionUser;
  },

  // Sign up
  signUp: async (email, password, fullName) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const users = getStoredUsers();
    
    if (users.find(u => u.email === email)) {
      throw new Error('Email already in use');
    }
    
    const newUser = {
      uid: Math.random().toString(36).substring(2, 15),
      email,
      password,
      displayName: fullName || email.split('@')[0],
      creationTime: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    const sessionUser = { 
      uid: newUser.uid, 
      email: newUser.email, 
      displayName: newUser.displayName 
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    observers.forEach(callback => callback(sessionUser));
    return sessionUser;
  },

  // Logout
  logout: async () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    observers.forEach(callback => callback(null));
    return true;
  },

  // Current User (Session persistence)
  onAuthStateChanged: (callback) => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    callback(user ? JSON.parse(user) : null);
    observers.push(callback);
    
    return () => {
      const index = observers.indexOf(callback);
      if (index !== -1) observers.splice(index, 1);
    };
  },

  // Forgot Password
  sendPasswordReset: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = getStoredUsers();
    if (!users.find(u => u.email === email)) {
      throw new Error('User not found');
    }
    return true;
  }
};
