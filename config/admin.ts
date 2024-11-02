export default ({ env }) => ({
  auth: {
    secret: env(
      "ADMIN_JWT_SECRET",
      "c709ab18f3054b1696689e8239d0dc929a02efd29651803ea09b2f6037d9185f"
    ),
  },
  apiToken: {
    salt: env(
      "API_TOKEN_SALT",
      "bcf52718753536a1feaca004089def966c89e4c997deae11129012cf02f9802f"
    ),
  },

  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
});
