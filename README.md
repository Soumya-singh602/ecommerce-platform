# 🛒 Ecommerce Platform  
## Full-Stack Microservices E-Commerce Application

A production-style **full-stack ecommerce platform** built using **Django Microservices Architecture, React.js, Docker, Nginx, JWT Authentication, PostgreSQL, MySQL, Redis, and WebSockets**.

The project follows a scalable distributed architecture where each business domain is developed as an independent service with its own database.

The system includes:

- Customer Web Application
- Admin Dashboard
- REST API Gateway
- Independent Backend Microservices
- Real-Time Communication System


---

# 🚀 Project Highlights

⭐ Microservices-based backend architecture  
⭐ Independent databases per service  
⭐ JWT based authentication system  
⭐ API Gateway using Nginx  
⭐ Dockerized complete application  
⭐ Real-time chat using WebSockets  
⭐ Service-to-service communication  
⭐ Product search, filtering, sorting and pagination  
⭐ Admin product and order management  
⭐ Scalable architecture design  


---

# 🏗️ System Architecture


```
                         Client Users

              ┌─────────────────────────┐
              │                         │
        Customer UI                 Admin UI
        React.js                    React.js
              │                         │
              └───────────┬─────────────┘
                          │

                    Nginx API Gateway

                          │

 ┌──────────────┬──────────────┬──────────────┬──────────────┐
 │              │              │              │
User Service Product Service Order Service Chat Service
 │              │              │              │
MySQL       PostgreSQL       MySQL          MySQL

                          │

                       Redis
                (WebSocket Channel Layer)

```


---

# 🎯 Features


## 👤 Customer Application

- User Registration
- Secure Login
- JWT Authentication
- Browse Products
- Product Search
- Product Sorting
- Price Filtering
- Pagination
- Product Details
- Shopping Cart
- Checkout
- Order Placement
- Order History
- Real-Time Chat With Admin


---

## 🛠️ Admin Dashboard

- Admin Authentication
- Product Management
    - Create Product
    - Update Product
    - Delete Product

- Order Management
    - View Orders
    - Update Order Status

- Customer Communication
    - Real-Time Chat Support


---

# 🔥 Backend Microservices


## User Service

Responsible for identity and authentication management.

### Responsibilities

- User Registration
- Login System
- JWT Access Token
- JWT Refresh Token
- Token Verification
- User Profile Management
- Password Management


Database:

```
MySQL
```


---

## Product Service

Handles complete product lifecycle.


### Responsibilities

- Product Creation
- Product Update
- Product Deletion
- Product Listing
- Product Search
- Sorting
- Filtering
- Pagination


Database:

```
PostgreSQL
```


---

## Order Service

Manages customer orders.


### Responsibilities

- Create Orders
- Order Details
- Order History
- Cancel Orders
- Update Order Status
- Pagination
- Filtering
- Statistics


Communication:

```
REST API Communication
```


Database:

```
MySQL
```


---

## Chat Service

Provides real-time communication.


Implemented using:

- Django Channels
- WebSockets
- Redis


Features:

- One-to-One Messaging
- Private Chat Rooms
- JWT Protected WebSocket
- Message Storage
- Chat History
- Delivery Status
- Read Status
- Unread Count


Database:

```
MySQL
```


---

# 🔐 Authentication & Security


Authentication flow:


```
User Login

     ↓

JWT Access Token Generated

     ↓

Frontend Stores Token

     ↓

Request Sent Through Nginx

     ↓

Token Verification

     ↓

Service Access Granted

```


Protected APIs require:


```http
Authorization: Bearer <JWT_TOKEN>
```


---

# 🌐 API Gateway Design


Nginx works as the single entry point.


| Endpoint | Service |
|-|-|
| /api/users | User Service |
| /api/products | Product Service |
| /api/orders | Order Service |
| /api/chat | Chat Service |
| /ws/chat | WebSocket Service |


---

# 🐳 Docker Architecture


The complete application runs using Docker Compose.


Containers:

```
Frontend Containers

├── customer-ui
└── admin-ui


Gateway

└── nginx


Backend Services

├── user-service
├── product-service
├── order-service
└── chat-service


Infrastructure

├── mysql containers
├── postgres container
└── redis container

```


---

# 🧰 Technology Stack


## Backend

- Python
- Django
- Django REST Framework
- Django Channels
- JWT Authentication
- HTTPX


## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios


## Database

- MySQL
- PostgreSQL


## Infrastructure

- Docker
- Docker Compose
- Nginx
- Redis
- Git
- GitHub


---

# 📂 Project Structure


```
ecommerce-platform/

│
├── frontend/
│   ├── customer-ui/
│   └── admin-ui/
│
├── user-service/
│
├── product-service/
│
├── order-service/
│
├── chat-service/
│
├── nginx/
│
├── docker-compose.yml
│
└── README.md

```


---

# ⚙️ Running Locally


Clone repository:

```bash
git clone <repository-url>
```


Build containers:

```bash
docker compose build
```


Start application:

```bash
docker compose up -d
```


Run migrations:

```bash
docker exec -it user-service python manage.py migrate
```


Application:


Customer:

```
http://localhost:5173
```


Admin:

```
http://localhost:5174
```


API Gateway:

```
http://localhost:8080
```


---

# 📈 Engineering Concepts Implemented


✔ Microservices Architecture  
✔ Database Isolation  
✔ API Gateway Pattern  
✔ Authentication Service  
✔ Service Communication  
✔ Containerization  
✔ Reverse Proxy  
✔ WebSocket Communication  
✔ Distributed System Design  
✔ REST API Design  
✔ Frontend-Backend Integration  


---

# 🔮 Future Improvements


- Payment Service
- Inventory Service
- Notification Service
- Email Service
- Redis Cache Layer
- RabbitMQ / Kafka Event Processing
- CI/CD Pipeline
- Kubernetes Deployment
- Monitoring & Logging


---

# 👩‍💻 Author

## Soumya Singh

