# NutriMood Tracker  Deployment Guide

This is a Dockerized web application that allows users to check on their health conditions by logging meals and checking the amount of fats they contain, proteins, and calories, and also track moods, and get personalized workout recommendations based on their input. NutriMood Tracker uses an external Nutrition API and can be deployed on two web servers behind an HAProxy load balancer.

## How to run it locally 
1. `save the index.html,style.css, and script.js files in the same folder on your local computer`
2. `Open the index.html file in any web browser (Chrome, Firefox, Safari, Edge, etc.).`


## Docker Image Info

**Docker Hub Repo:** [Docker Hub](https://hub.docker.com/repository/docker/julia578/nutrimood_tracker)
- **Image Name:** `nutrimood_tracker`
- **Tags:** `latest`

## Build Instructions

Build and push the image locally:

 ```bash
docker build -t nutrimood_tracker:latest .
docker tag nutrimood_tracker:latest julia578/nutrimood_tracker:latest
docker push julia578/nutrimood_tracker:latest
```
## Run Instructions (Web01 / Web02)

Run this on each web server:
```
docker pull julia578/nutrimood_tracker:latest
```

## Load Balancer Configuration (HAProxy on lb-01)

 haproxy.cfg:
```
frontend http-in
    bind *:80
    default_backend servers

backend servers
    balance roundrobin
    server web01 172.20.0.11:80 check
    server web02 172.20.0.12:80 check
    http-response set-header X-Served-By %[srv_name]
```

## Restart HAProxy:

```bash
sudo service restart haproxy
```

## Testing Load Balancer (Round-Robin)

Run this command repeatedly:

```bash
curl -I http://localhost:80
```

***You should see alternating content responses if Web01 and Web02 have minor HTML differences (e.g., unique headings).***

### Project Structure

plaintext
```
NutriMood_Tracker/

├── index.html       # Main UI
├── styles.css       # Styling
├── script.js        # API logic
├── Dockerfile       # Build config
.gitignore       (optional)(it hides the files expose to github)
```


# screenshots

# Demo video 




