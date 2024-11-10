module.exports = {
  routes: [
    {
      method: "POST",
      path: "/t-user-levels/create-user-levels",
      handler: "t-user-level.createUserWithLevels",
      config: {
        auth: false, // or true if authentication is required
      },
    },
    {
      method: "POST",
      path: "/t-user-levels/create-user-levels",
      handler: "t-user-level.getUserByUsernameOrEmail",
      config: {
        auth: false, // or true if authentication is required
      },
    },
  ],
};
