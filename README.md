# SporeBio - Biological Sample Management App

SporeBio is a full-stack web application designed to manage biological samples efficiently.  
The project includes a React + TypeScript frontend built with Vite and a Python FastAPI backend with SQLModel for database interactions.  

---

## Features

- React frontend with Vite for fast development and hot reload  
- FastAPI backend for robust and fast REST API services  
- SQLAlchemy ORM for database modeling and queries  
- Dockerized services for easy setup and consistent environments  
- Live reload in development mode for both frontend and backend  

---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed  
    - Alternatively, you can use [Podman](https://podman.io/) as a drop-in replacement for Docker.  
- Basic knowledge of Docker or Podman commands and terminal  

---

### Setup and Run

1. Clone the repository:

```bash
git clone https://github.com/Easyblend/Biological-Sample-Management.git
cd ./Biological-Sample-Management
```


2. Build and start the Docker containers

```bash 
docker-compose up --build
```


3. Access the app in your browser:

- Frontend (React + Vite): http://localhost:5173

- Backend (FastAPI): http://localhost:8000

- FastAPI automatic API docs: http://localhost:8000/docs


## Docker Services Overview

| Service            | Description                   | Port(s) |
|--------------------|-------------------------------|---------|
| `frontend`         | React + Vite frontend          | 5173    |
| `backend`      | FastAPI backend                | 8000    |


> **Note:** Backend services run internally on port 8000. The frontend communicates with the backend via the Docker network.
