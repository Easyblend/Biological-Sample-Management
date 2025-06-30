# 🚀 SporeBio Backend

Welcome to the **SporeBio Backend**! This service powers the core logic and data management for the SporeBio platform, leveraging modern Python frameworks and best practices **( Yes description was enhanced by ChatGPT)** .

---

## 🛠️ Tech Stack

- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) — blazing fast, easy-to-use Python web API framework.
- **ORM:** [SQLModel](https://sqlmodel.tiangolo.com/) — combines SQLAlchemy and Pydantic for seamless database interactions.
- **Database:** SQLite — lightweight, file-based storage for local development.

---

## 🗄️ Database Models

### **BioSample**
| Field         | Description                              |
|---------------|------------------------------------------|
| `sample_type` | Type of biological sample                |
| `location`    | Location where the sample was collected  |
| `operator`    | Person who collected the sample          |
| `created_at`  | Timestamp of creation                    |

### **Comment**
Stores comments related to samples or other entities.

---

## 🧩 Dockerized Services

| Service        | Description             | Port  |
|----------------|-------------------------|-------|
| `frontend`     | React + Vite frontend   | 5173  |
| `backend`      | backend         | 8000  |

> **Note:** Ensure ports **5173** and **8000** are available before running the stack.

---

## 🌐 API Access

- **Base URL:** [`http://localhost:8000`](http://localhost:8000)
- Implements **RESTful endpoints** for managing `BioSample` and `Comment` resources.

---

## 📝 Notes & Best Practices

- The `version` attribute has been removed from `docker-compose.yml` to avoid deprecation warnings.
- Backend uses **Pydantic v2** config keys (`orm_mode` → `from_attributes`).
- For a smooth experience, ensure all dependencies are installed and Docker is running.

---

## 💡 Get Started

1. Clone the repository.
2. Run `docker-compose up` to start all services.
3. Access the API docs at [`/docs`](http://localhost:8000/docs).

---

Happy coding! 🎉