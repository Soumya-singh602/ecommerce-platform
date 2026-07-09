# Ecommerce Platform - Django Microservices

## Overview

This project is a Django-based Ecommerce Platform developed using a Microservices Architecture. Each service is independently developed and has its own database. Authentication is handled using JWT, and Nginx is used as an API Gateway to provide a single entry point for all services.

---

## Architecture

* User Service
* Product Service
* Order Service
* Nginx API Gateway

---

## Tech Stack

* Python 3
* Django
* Django REST Framework
* JWT Authentication
* MySQL
* PostgreSQL
* Nginx

---

## Database

| Service         | Database   |
| --------------- | ---------- |
| User Service    | MySQL      |
| Product Service | PostgreSQL |
| Order Service   | MySQL      |

---

## Features

### User Service

* User Registration
* User Login
* JWT Authentication
* Token Verification API
* User List
* User Detail
* Delete User

### Product Service

* Create Product
* Product List
* Product Detail
* Update Product
* Delete Product
* Product Search (`?search=keyword`)
* JWT Protected APIs

### Order Service

* Place Order
* Order List (Logged-in User)
* Order Detail
* Cancel Order
* Update Order Status
* JWT Protected APIs

---

## API Gateway

Nginx is configured as an API Gateway to route all requests through a single base URL.

### Routes

* `/users/`
* `/products/`
* `/orders/`

---

## Authentication

Protected APIs require a valid JWT Access Token.

Example:

```http
Authorization: Bearer <access_token>
```

---

## Standard API Response

### Success Response

```json
{
    "status": "success",
    "message": "Request completed successfully",
    "data": {}
}
```

### Error Response

```json
{
    "status": "failed",
    "message": "Validation failed",
    "data": {}
}
```

---

## How to Run

1. Clone the repository.
2. Configure MySQL and PostgreSQL databases.
3. Install project dependencies.
4. Run migrations for all three services.
5. Start:

   * User Service
   * Product Service
   * Order Service
6. Start Nginx.
7. Test APIs using Postman.

---

## Future Improvements

* Product Price Filtering
* Product Sorting
* Pagination
* Docker Deployment
* RabbitMQ/Kafka Integration
* Payment Service
* Inventory Service

---

## Author

**Soumya Singh**
