# Use the official Node image as the base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Strapi app
RUN npm run build

# Expose the Strapi port
EXPOSE 1337

# Start the application
CMD ["npm", "run", "start"]
