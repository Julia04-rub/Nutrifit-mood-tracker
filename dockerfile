# Use the official NGINX image as the base
FROM nginx:alpine

# Copy everything in your project into the default web directory of NGINX
COPY . /usr/share/nginx/html