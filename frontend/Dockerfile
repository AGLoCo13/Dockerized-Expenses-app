# Use an official Nginx image as a parent image
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the built frontend files into the container
COPY build/ .

# Expose port 80 to the outside world
EXPOSE 80

# Define the command to run Nginx
CMD ["nginx", "-g", "daemon off;"]