# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to work directory
COPY package*.json yarn.lock ./

# Install Yarn globally
RUN npm install -g yarn

# Install project dependencies
RUN yarn install --frozen-lockfile

# Bundle the source code inside the Docker image
COPY . .

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define the command to run your app
CMD ["yarn", "start"]