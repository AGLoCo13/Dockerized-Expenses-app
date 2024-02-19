# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app/backend

# Copy package.json and package-lock.json to work directory
COPY backend/package*.json ./

# Install any needed packages specified in package.json
RUN npm install
RUN npm install mongoose

# Bundle the source code inside the Docker image
COPY backend/ .

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define the command to run your app
CMD ["npm", "start", "server.js"]