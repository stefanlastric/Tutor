export const isStudent = () => localStorage.getItem('role') === 'Student';
export const isAdmin = () => localStorage.getItem('role') === 'Admin';
export const isTeacher = () => localStorage.getItem('role') === 'Teacher';

export const checkIsStudent = (role) => role.name === 'Student';
export const checkIsAdmin = (role) => role.name === 'Admin';
export const checkIsTeacher = (role) => role.name === 'Teacher';

export const setLocalStorageRole = (role) => {
  switch (role.name) {
    case 'Student':
      localStorage.setItem('role', 'Student');
      return;
    case 'Admin':
      localStorage.setItem('role', 'Admin');
      return;
    case 'Teacher':
      localStorage.setItem('role', 'Teacher');
      return;
    default:
      return;
  }
};
