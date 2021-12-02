const PasswordUtils = {
  check(password: string) {
    return password.length >= 8;
  },
};

export default PasswordUtils;
