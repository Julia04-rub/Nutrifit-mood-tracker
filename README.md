 # NutriMood Tracker  Deployment Guide

This is a Dockerized web application that allows users to check on their health conditions by logging meals and checking the amount of fats they contain, proteins, and calories, and also track moods, and get personalized workout recommendations based on their input. NutriMood Tracker uses an external Nutrition API and can be deployed on two web servers behind an HAProxy load balancer.

# How to run it locally 
1. save the index.html,style.css, and script.js files in the same folder on your local computer
2. Open the index.html file in any web browser (Chrome, Firefox, Safari, Edge, etc.).


# Docker Image Info

Docker Hub Repo: https://hub.docker.com/repository/docker/julia578/nutrimood_tracker
Image Name: nutrimood_tracker
Tags: latest

# Build Instructions

Build and push the image locally:

  bash
docker build -t nutrimood:latest .
docker tag nutrimood:latest juliarubibi/nutrimood:latest
docker push juliarubibi/nutrimood:latest
```
# Run Instructions (Web01 / Web02)

Run this on each web server:

bash
docker run -d -p 8080:80 \
  --name nutrimood \
  -e NUTRI_API_KEY=your_actual_api_key \
  juliarubibi/nutrimood:latest
```

# Load Balancer Configuration (HAProxy on lb-01)

# haproxy.cfg:

frontend http-in
    bind *:80
    default_backend servers

backend servers
    balance roundrobin
    server web01 172.20.0.11:80 check
    server web02 172.20.0.12:80 check
    http-response set-header X-Served-By %[srv_name]
```

# Reload HAProxy:

bash
sudo systemctl reload haproxy
# or with Docker
docker exec -it <haproxy_container_name> service haproxy reload


# Testing Load Balancer (Round-Robin)

Run this command repeatedly:

bash
curl http://<lb01-ip>/


You should see alternating content responses if Web01 and Web02 have minor HTML differences (e.g., unique headings).


# Handling Secrets (Recommended)

Avoid hardcoding API keys. Use one of the methods below:

# Option 1: Environment Variables

bash
docker run -e NUTRI_API_KEY=your_key ...


# Option 2: External JavaScript File

bash
echo "const API_KEY = 'your_key';" > apikey.js
docker run -v $(pwd)/apikey.js:/usr/share/nginx/html/apikey.js ...
```

Include `apikey.js` in your HTML before `script.js`.


# Project Structure

plaintext

NutriMood_Tracker/

├── index.html       # Main UI
├── styles.css       # Styling
├── script.js        # API logic
├── Dockerfile       # Build config
.gitignore       (optional)(it hides the files that you don't want to expose to github)
```


# screenshots

# Demo video 




