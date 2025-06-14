# 🛒 StoreBackend

A simple Node.js + Express.js backend API for managing products in an online store. This project includes core functionalities like fetching, adding, and deleting products, designed to be lightweight and easy to extend for educational or prototyping purposes.

## 🔧 Tech Stack

- **Backend Framework**: Node.js + Express.js
- **Database**: Not connected (in-memory data handling for now)
- **Language**: JavaScript (ES6+)

## 📁 Folder Structure

```
storebackend/
├── controllers/
│   └── product.js         # Logic for handling product operations
├── models/
│   └── product.js         # In-memory product model
├── routes/
│   └── product.js         # Product-related API routes
├── index.js               # Entry point of the application
├── package.json           # Project metadata and dependencies
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/Vijay-tech-cmd/storebackend.git
cd storebackend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Run the Server**

```bash
node index.js
```

The server will start running on `http://localhost:5000`.

---

## 📦 API Endpoints

### Base URL: `http://localhost:5000/products`

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| GET    | `/products`          | Get all products          |
| POST   | `/products`          | Add a new product         |
| DELETE | `/products/:id`      | Delete a product by ID    |

Example product JSON:
```json
{
  "id": "101",
  "title": "Smartphone",
  "price": 299.99
}
```

---

## 💡 Features

- Basic CRUD operations for product management
- Modular project structure
- In-memory product data (no DB dependency)
- Easily extensible for future enhancements (like MongoDB, validation, auth)

---

## 📌 Future Improvements

- Integrate MongoDB or PostgreSQL
- Add data validation with Joi or express-validator
- Add authentication (JWT)
- Implement pagination and filtering
- Write unit and integration tests

---

## 🤝 Contributing

Pull requests are welcome! Feel free to fork this project and submit improvements, bug fixes, or new features.

---

## 🧑‍💻 Author

**Vijay**  
[GitHub](https://github.com/Vijay-tech-cmd)

