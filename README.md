# 🛍️ NEXORA
## Full-Stack Microservices E-Commerce Application

A production-style **full-stack ecommerce platform** built using
**Django Microservices Architecture, React.js, Nginx, JWT Authentication,
PostgreSQL, MySQL, Redis, WebSockets, and Stripe**.

The project follows a scalable distributed architecture where each business
domain is developed as an independent service with its own database.

The system includes:

- Customer Web Application
- Admin Dashboard
- REST API Gateway
- Independent Backend Microservices
- Real-Time Communication System
- Payment Integration
- Wishlist System
- Product Sharing
- Customer Reviews & Ratings


---

# 🚀 Project Highlights

⭐ Microservices-based backend architecture  
⭐ Independent databases per service  
⭐ JWT based authentication system  
⭐ API Gateway using Nginx  
⭐ Real-time chat using WebSockets  
⭐ Service-to-service communication  
⭐ Product search, filtering, sorting and pagination  
⭐ Shopping cart and checkout  
⭐ Wishlist functionality  
⭐ Product sharing through shared links  
⭐ Customer reviews and ratings  
⭐ Stripe payment integration  
⭐ Saved payment cards  
⭐ Admin product and order management  
⭐ Category and banner management  
⭐ Scalable architecture design  


---

# ☁️ Deployment Journey

The project was initially deployed using multiple free-tier cloud
platforms.

### Services Used

- Render
- Vercel
- Railway
- Neon

The frontend applications were deployed using **Vercel**, while backend
microservices were deployed using **Render**.

Databases were hosted using **Railway** and **Neon**.

The application successfully ran in the cloud environment and was
tested after deployment.

However, the backend services were later **suspended because of
free-plan resource limitations**.

After the suspension, the project was moved back to the local
development environment for continued:

- Feature development
- API testing
- Payment testing
- WebSocket testing
- Microservice testing
- Nginx testing

The project is currently being prepared for a more stable production
deployment architecture.


---

# 🏗️ System Architecture

```text
                         NEXORA

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
                              │
                           Stripe
                              │
                           Payment

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
- Wishlist
- Checkout
- Stripe Payment
- Saved Payment Cards
- Order Placement
- Order History
- Order Cancellation
- Customer Reviews
- Product Ratings
- Product Sharing
- Shared Product Links
- Real-Time Chat With Admin


---

## 🛠️ Admin Dashboard

- Admin Authentication

### Product Management

- Create Product
- Update Product
- Delete Product
- Product Images
- Stock Management

### Category Management

- Category Management
- Category Images

### Banner Management

- Create Banner
- Update Banner
- Delete Banner
- Activate / Deactivate Banner

### Order Management

- View Orders
- View Order Details
- Update Order Status
- Cancel Order

### Customer Communication

- Real-Time Chat Support
- Customer Messages
- Chat History


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
- User Role Management

Database:

```text
MySQL
```


---

## Product Service

Handles complete product and catalog management.

### Responsibilities

- Product Creation
- Product Update
- Product Deletion
- Product Listing
- Product Details
- Product Search
- Sorting
- Filtering
- Pagination
- Category Management
- Category Images
- Banner Management
- Product Images
- Customer Reviews
- Product Ratings

Database:

```text
PostgreSQL
```


---

## Order Service

Manages customer orders and payment processing.

### Responsibilities

- Create Orders
- Order Details
- Order History
- Cancel Orders
- Update Order Status
- Pagination
- Filtering
- Order Statistics
- Checkout
- Payment Intent Creation
- Stripe Payment Integration
- Stripe Webhooks
- Saved Payment Cards
- Payment Status Management

Communication:

```text
REST API Communication
```

Database:

```text
MySQL
```


---

## Chat Service

Provides real-time customer and administrator communication.

Implemented using:

- Django Channels
- WebSockets
- Daphne
- Redis

### Features

- One-to-One Messaging
- Private Chat Rooms
- JWT Protected WebSocket
- Message Storage
- Chat History
- Delivery Status
- Read Status
- Unread Count
- Customer Support Chat

Database:

```text
MySQL
```


---

# 💳 Payment System

NEXORA uses **Stripe** for online payment processing.

Payment flow:

```text
Customer
    ↓
Checkout
    ↓
Create Payment Intent
    ↓
Stripe
    ↓
Payment Confirmation
    ↓
Stripe Webhook
    ↓
Payment Status
    ↓
Order Status
```

Payment features include:

- Stripe Payment Intents
- Card Payments
- Payment Status
- Stripe Webhooks
- Saved Payment Cards
- Payment History


---

# ❤️ Wishlist

Customers can save products for later.

Features include:

- Add product to wishlist
- Remove product from wishlist
- View wishlist
- Open product directly from wishlist


---

# 🔗 Product Sharing

Customers can share individual products using a dedicated product link.

Example:

```text
/product/<product_id>
```

Shared links allow users to directly open a specific product page.


---

# ⭐ Customer Reviews & Ratings

Customers can submit reviews for products.

Each review contains:

- Product
- User
- Rating
- Comment
- Created Date
- Updated Date

Ratings are supported from:

```text
1 ⭐ → 5 ⭐
```

A unique product-user review constraint prevents duplicate reviews
for the same product by the same customer.


---

# 🔐 Authentication & Security

Authentication flow:

```text
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
|---|---|
| `/api/users` | User Service |
| `/api/products` | Product Service |
| `/api/orders` | Order Service |
| `/api/payments` | Order Service |
| `/api/chat` | Chat Service |
| `/ws/chat` | Chat Service |
| `/media` | Product Service |


---

# 🐳 Docker

Docker was used during the earlier development and deployment setup
to containerize the application and simplify service management.

The project architecture includes:

```text
Frontend

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

├── MySQL
├── PostgreSQL
└── Redis
```

The current development and testing environment is also being run
locally without depending on Docker.


---

# 🧰 Technology Stack


## Backend

- Python
- Django
- Django REST Framework
- Django Channels
- Daphne
- JWT Authentication
- HTTPX
- Requests


## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide React


## Database

- MySQL
- PostgreSQL


## Real-Time Communication

- WebSockets
- Django Channels
- Redis
- Daphne


## Payments

- Stripe


## Infrastructure

- Nginx
- Docker
- Git
- GitHub


## Cloud Platforms Used

- Render
- Vercel
- Railway
- Neon


---

# 📂 Project Structure

```text
nexora/

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

Navigate into project:

```bash
cd ecommerce-platform
```


## User Service

```bash
cd user-service
source venv/bin/activate
python manage.py runserver 8001
```


## Product Service

```bash
cd product-service
source venv/bin/activate
python manage.py runserver 8002
```


## Order Service

```bash
cd order-service
source venv/bin/activate
python manage.py runserver 8003
```


## Chat Service

Chat Service uses Daphne:

```bash
cd chat-service
source venv/bin/activate

daphne -b 127.0.0.1 -p 8004 config.asgi:application
```


## Customer UI

```bash
cd frontend/customer-ui
npm install
npm run dev
```


## Admin UI

```bash
cd frontend/admin-ui
npm install
npm run dev
```


---

# 🌐 Local Application

Customer:

```text
http://localhost:5173
```

Admin:

```text
http://localhost:5174
```

Nginx API Gateway:

```text
http://localhost
```


---

# 📈 Engineering Concepts Implemented

✔ Microservices Architecture  
✔ Database Isolation  
✔ API Gateway Pattern  
✔ Authentication Service  
✔ JWT Authentication  
✔ Role-Based Access Control  
✔ Service-to-Service Communication  
✔ Containerization  
✔ Reverse Proxy  
✔ WebSocket Communication  
✔ Redis Channel Layer  
✔ Distributed System Design  
✔ REST API Design  
✔ Frontend-Backend Integration  
✔ Payment Gateway Integration  
✔ Stripe Webhooks  
✔ Wishlist System  
✔ Product Sharing  
✔ Review & Rating System  
✔ Order Management  


---

# 🔮 Future Improvements

- AWS Production Deployment
- AWS Application Load Balancer
- Multiple EC2 Instances
- Nginx Load Balancing
- AWS RDS
- AWS S3 for Media Storage
- Redis Managed Service
- Notification Service
- Email Service
- RabbitMQ / Kafka Event Processing
- CI/CD Pipeline
- Automated Testing
- Monitoring & Logging
- Kubernetes Deployment


---

# 👩‍💻 Author

## Soumya Singh

### NEXORA

**Shop Smart. Live Better.**