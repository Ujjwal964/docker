# DOCKER 🐳

These are my **hands-on learning notes** while learning Docker.

---

# DOCKER Part - 1

## 1. Problem Statement

Let’s say your device has specific versions of Node.js, Postgres, SQL, Java, etc., and you are running macOS.  
Now in a project, when a new person comes, they also need to set all these configurations in their system manually. No one remembers everything, and some software is not supported in macOS. So replicating the environment becomes tough across different systems.

👉 This is the problem Docker solves by reducing extra effort.  
It has the concept of **containers**, and inside these containers we do all our configurations like which tool, which OS, etc.

---

## 2. Advantages

- If you are on Linux, Windows, etc., you can run the container anywhere without hassle.
- Containers are very lightweight.
- They can be easily built, deployed, destroyed, and shared.

---

## 3. Installation

Download Docker Desktop from Chrome.  
It includes both Docker CLI and Docker Desktop GUI.

Install it and open it. You will see Docker running in the top bar and in the Desktop app.

Open it and you will see no containers, no images, no volumes — and that’s good. Now we’ll learn how to create and use them.

---

## 4. Working

Let’s try to run a random OS like Ubuntu inside macOS from terminal.

Check if Docker is running:
```bash
docker -v
```

Run Ubuntu container:
```bash
docker run -it ubuntu
```

- `-it` means interactive
- `ubuntu` is the image name

Initially, it may say no image Ubuntu. Don’t worry, it will download it automatically.

In GUI, refresh and see a container of Ubuntu.

It gives a default name to the container.

`-it` means do not detach from Docker; we come inside Docker.

Now we are inside the container. If we run `ls` or `node`, it will say not found because we are inside the container. Containers are isolated and cannot access our machine storage or config unless we set them.

Docker first checks if the image is available locally. If not, it downloads it from hub.docker.com.

We can do anything inside the container and it won’t affect our local machine.

Images are like OS and they run on containers, just like macOS runs on MacBook.

Two containers are isolated and cannot communicate until we allow them.

In real world, we make custom images with our project configuration and share them with the team.

---

## 5. Docker Container Commands

```bash
docker container ls        # running containers
docker container ls -a     # all containers
docker start <containername>
docker stop <containername>
docker exec <containername> ls
docker exec -it <containername> bash
```

Difference:
- `docker run -it <image>` → creates a NEW container
- `docker exec -it <containername> bash` → opens an EXISTING container

---

## 6. How Big Companies Use Docker

They give you an image and just tell you to run:
```bash
docker run <theirimagename>
```

---

## 7. Port Mapping 🌐

Let’s say your Node.js app runs on port 8000 inside the container. Containers are isolated, so we map ports.

```bash
docker run -it -p 8000:8000 <imagename>
```

Right side = container port  
Left side = localhost port

You can map different ports:
```bash
docker run -it -p 1025:8000 <imagename>
```

Multiple ports:
```bash
docker run -it -p 1000:8025 -p 8000:1025 mailbag/mailhog
```

Pass environment variables:
```bash
docker run -it -e key=value -p 1000:1000 <imagename>
```

---

## 8. Dockerizing Node + Express App 🚀

1. Create folder  
2. `npm init`
3. `npm i express`
4. Create `main.js`
5. Create file named **Dockerfile** (no extension)

Dockerfile contains:
- FROM
- RUN
- COPY
- ENTRYPOINT

Build image:
```bash
docker build -t docker-practice .
```

`.` means Dockerfile is in this folder.

Run:
```bash
docker run -it -p 8000:8000 docker-practice
```

Pass env variable for port:
```bash
docker run -it -e PORT=4000 -p 4000:4000 docker-practice
```

---

## 9. Layer Caching ⚡

When rebuilding:
- Unchanged lines use cache
- Changed lines rebuild

Keep heavy installs (like Node) at top of Dockerfile.

---

## 10. Publishing Image to Docker Hub 🌍

1. Create account on hub.docker.com  
2. Create repo  
3. Build image:

```bash
docker build -t ujjwalbansall/docker-practice .
```

4. Push image:

```bash
docker push ujjwalbansall/docker-practice
```

Login if needed:
```bash
docker login
```

---

# Docker Compose 🧩

Used to run multiple containers together (Node, Postgres, Redis).

Create file:
```
docker-compose.yml
```

Commands:
```bash
docker compose up
docker compose down
docker compose up -d
```

---

# Docker Networking 🌐

Ping works because of networking.

Drivers:
- bridge (default)
- host
- none

Check networks:
```bash
docker network ls
docker network inspect bridge
```

Create custom network:
```bash
docker network create -d bridge <networkname>
```

Run container on custom network:
```bash
docker run -it --network=customnet busybox
```

If two containers are on same network, they can ping each other.

---

# Volume Mounting 💾

Containers lose data when destroyed.

Use volume mapping:
```bash
docker run -it -v <localpath>:/home/test busybox
```

Now data inside container is also saved locally.

Even if container is deleted, data stays safe.

---

# Efficient Caching in Layers

Use `.dockerignore` (like .gitignore):

```
node_modules
```

Set working directory:
```dockerfile
WORKDIR /app
```

---

# Docker Multi Stage Builds 🏗️

Multiple `FROM` in one Dockerfile:
- Builder stage
- Runner stage

Reduces image size.

---

# Docker Image Optimization 📦

Best practices:
1. Use alpine/slim images
2. Efficient layer caching
3. Multi-stage builds

---

# KUBERNETES ☸️

1. Made by Google  
2. Inspired from Google’s in-house tool Borg  
3. Used for Container Orchestration  
4. Manages desired container count vs current container count  
5. Architecture includes:
   - Control Plane  
   - Worker Node  
   - Kubelet  

---

**END OF MY DOCKER & KUBERNETES NOTES 🚀**
