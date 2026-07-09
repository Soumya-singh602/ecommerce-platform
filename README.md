# Ecommerce Platform - Django Microservices

## Overview

This project is a Django-based Ecommerce Platform built using a Microservices Architecture. Each service is independently developed with its own database, enabling scalability and maintainability. Authentication is implemented using JWT, while Nginx acts as an API Gateway to provide a single entry point for all microservices.

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
* Git & GitHub

---

## Database

| Service         | Database   |
| --------------- | ---------- |
| User Service    | MySQL      |
| Product Service | MySQL      |
| Order Service   | PostgreSQL |

---

## Features

### User Service

* User Registration
* User Login
* JWT Authentication
* Refresh Token
* Token Verification API
* User List
* User Detail
* User Profile
* Update Profile
* Change Password
* Delete User

### Product Service

* Create Product
* Product List
* Product Detail
* Update Product
* Delete Product
* Product Search (`?search=keyword`)
* Price Filtering (`?min_price=&max_price=`)
* Product Sorting (`?sort=price` / `?sort=-price`)
* Product Pagination (`?page=1`)
* JWT Protected APIs

### Order Service

* Place Order
* Order List (Logged-in User)
* Order Detail
* Cancel Order
* Update Order Status
* Order Status Filtering (`?status=Pending`)
* Order Sorting
* Order Pagination
* Order Statistics
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
5. Start the User Service.
6. Start the Product Service.
7. Start the Order Service.
8. Start Nginx.
9. Test the APIs using Postman.

---

## Future Improvements

* Docker & Docker Compose
* Redis Caching
* RabbitMQ / Kafka Integration
* Payment Service
* Inventory Service
* CI/CD Pipeline

---

## Author

**Soumya Singh**
