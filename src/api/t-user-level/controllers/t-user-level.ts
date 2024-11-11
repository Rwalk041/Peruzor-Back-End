/**
 * t-user-level controller
 */

import { factories } from "@strapi/strapi";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::t-user-level.t-user-level",
  ({ strapi }) => ({
    async createUserWithLevels(ctx) {
      try {
        ctx.body = "ok i am in";
        const { userId } = ctx.request.body;

        if (!userId) {
          return ctx.badRequest("User ID is required.");
        }

        // Step 1: Fetch all levels
        const levels = await strapi.entityService.findMany(
          "api::t-level.t-level"
        );

        // Step 2: Create t-user-level entries for each level with the provided user ID
        const userLevelEntries = await Promise.all(
          levels.map((level) =>
            strapi.entityService.create("api::t-user-level.t-user-level", {
              data: {
                isActive: false,
                // Referencing the related level and user IDs
                level_name: level.id, // This will reference the related level
                username: userId, // This will reference the related user
              },
            })
          )
        );

        // Step 3: Return the created entries
        return ctx.send({ userLevelEntries });
      } catch (error) {
        ctx.body = "error = " + error;
        console.error("Error creating user levels:", error);
        return ctx.internalServerError("Failed to create user levels.");
      }
    },
    async getUserByUsernameOrEmail(ctx) {
      try {
        const identifier = ctx.request.body.identifier; // Single field in request body

        if (!identifier) {
          return ctx.badRequest(
            "An identifier (username or email) is required."
          );
        }

        // Determine if the identifier is an email or username
        const isEmail = identifier.includes("@");

        // Set up filter based on whether it's an email or username
        const filters = isEmail
          ? { email: identifier }
          : { username: identifier };

        // Fetch user levels with the specified filter
        const userLevelEntries = await strapi.entityService.findMany(
          "api::t-user-level.t-user-level",
          {
            filters: {
              username: filters, // Apply the correct filter based on identifier type
            },
            populate: ["level_name"], // Populate related level details if needed
          }
        );

        // Return the fetched user levels
        return ctx.send({ userLevelEntries });
      } catch (error) {
        console.error("Error fetching user levels:", error);
        return ctx.internalServerError("Failed to fetch user levels.");
      }
    },
    async updateUserLevelActiveStatus(ctx) {
      try {
        const { identifier, level_id } = ctx.request.body;

        if (!identifier || !level_id) {
          return ctx.badRequest(
            "Identifier (username or email) and level_id are required."
          );
        }

        // Step 1: Find the user by username or email
        const user = await strapi
          .query("plugin::users-permissions.user")
          .findOne({
            where: {
              $or: [{ username: identifier }, { email: identifier }],
            },
          });

        if (!user) {
          return ctx.notFound("User not found.");
        }

        // Step 2: Find the `t-user-level` entry based on `level_id` and `user.id`
        const userLevelEntry = await strapi
          .query("api::t-user-level.t-user-level")
          .findOne({
            where: {
              level_name: level_id,
              username: user.id,
            },
          });

        if (!userLevelEntry) {
          return ctx.notFound("User level entry not found.");
        }

        // Step 3: Update the `isActive` attribute to `true`
        const updatedEntry = await strapi.entityService.update(
          "api::t-user-level.t-user-level",
          userLevelEntry.id,
          {
            data: {
              isActive: true,
            },
          }
        );

        // Step 4: Return the updated entry
        return ctx.send({ updatedEntry });
      } catch (error) {
        console.error("Error updating user level:", error);
        return ctx.internalServerError("Failed to update user level.");
      }
    },
  })
);
