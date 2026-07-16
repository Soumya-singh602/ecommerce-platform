# Ecommerce Platform – Django Microservices

## Overview

Ecommerce Platform is a backend application built using **Django Microservices Architecture**. Each service is independently developed, maintains its own database, and communicates with other services through REST APIs. Authentication is implemented using **JWT**, **Nginx** serves as the **API Gateway**, and **Django Channels** with **WebSockets** enables real-time one-to-one chat.

---

# Architecture

```text
                           Client
                              │
                 ┌────────────┴────────────┐
                 │                         │
           HTTP REST APIs            WebSocket
                 │                         │
                 └────────────┬────────────┘
                              │
                     Nginx API Gateway
                              │
      ┌──────────────┬──────────────┬──────────────┬──────────────┐
      │              │              │              │
 User Service   Product Service  Order Service   Chat Service
```

---

# Microservices

## User Service

Responsible for authentication and user management.

### Features

* User Registration
* User Login
* JWT Authentication
* Refresh Token
* Token Verification API
* User Profile
* Update Profile
* Change Password
* User Detail
* User List
* Delete User

**Database:** MySQL

---

## Product Service

Responsible for product management.

### Features

* Create Product
* Update Product
* Delete Product
* Product List
* Product Detail
* Product Search
* Price Filtering
* Product Sorting
* Pagination
* JWT Protected APIs

**Database:** PostgreSQL

---

## Order Service

Responsible for order management.

### Features

* Place Order
* Order List
* Order Detail
* Cancel Order
* Update Order Status
* Order Filtering
* Order Sorting
* Pagination
* Order Statistics
* Service-to-Service Communication
* JWT Protected APIs

**Database:** MySQL

---

## Chat Service

Responsible for real-time messaging between users.

### Features

* JWT Authenticated WebSocket Connection
* One-to-One Chat
* Private Chat Rooms
* Real-Time Messaging
* Chat History API
* Conversation List API
* Message Delivery Status
* Message Read Status
* Unread Message Count
* Database Message Storage

**Database:** MySQL

---

# Technology Stack

* Python 3.12
* Django
* Django REST Framework
* Django Channels
* WebSockets
* MySQL
* PostgreSQL
* JWT Authentication
* HTTPX
* Docker
* Docker Compose
* Nginx (API Gateway)
* Git
* GitHub

---

# API Gateway

Nginx acts as the single entry point for all services.

## REST API Routes

| Route            | Service         |
| ---------------- | --------------- |
| `/api/users/`    | User Service    |
| `/api/products/` | Product Service |
| `/api/orders/`   | Order Service   |
| `/api/chat/`     | Chat Service    |

---

## WebSocket Route

All WebSocket connections are routed through the Nginx API Gateway.

```text
ws://localhost/ws/chat/<admin_id>/<customer_id>/?token=<access_token>
```

Example:

```text
ws://localhost/ws/chat/6/5/?token=<JWT_ACCESS_TOKEN>
```

---

# Authentication

All protected REST APIs require a valid JWT Access Token.

```http
Authorization: Bearer <access_token>
```

WebSocket connections are also authenticated using the same JWT Access Token before establishing the connection.

---

# Database

| Service         | Database   |
| --------------- | ---------- |
| User Service    | MySQL      |
| Product Service | PostgreSQL |
| Order Service   | MySQL      |
| Chat Service    | MySQL      |

---

# Standard API Response

## Success

```json
{
    "status": "success",
    "message": "Request completed successfully",
    "data": {}
}
```

## Error

```json
{
    "status": "failed",
    "message": "Validation failed",
    "data": {}
}
```

---

# Project Structure

```text
ecommerce-platform/
│
├── nginx/
├── user-service/
├── product-service/
├── order-service/
├── chat-service/
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# Running the Project

1. Clone the repository.
2. Configure MySQL and PostgreSQL databases.
3. Build and start all services using Docker Compose.
4. Run database migrations.
5. Access all REST APIs through the Nginx API Gateway.
6. Connect to the Chat Service using the WebSocket endpoint.
7. Test REST APIs and WebSocket communication using Postman.

---

# Current Features

* Microservices Architecture
* JWT Authentication
* Nginx API Gateway
* User Management
* Product Management
* Order Management
* Real-Time One-to-One Chat
* WebSocket Authentication
* Chat History
* Conversation List
* Message Delivery Status
* Message Read Status
* Unread Message Count

---

# Future Enhancements

* Online / Offline Status
* Last Seen
* Typing Indicator
* File Sharing
* Image Sharing
* Group Chat
* Payment Service
* Inventory Service
* Redis Caching
* RabbitMQ / Kafka Integration
* CI/CD Pipeline

---

# Author

**Soumya Singh**
