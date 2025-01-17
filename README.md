
```markdown
# Product Scanner API Documentation

## Overview

The **Product Scanner API** allows users(admin) to:
- Register 
- Log in to obtain an authentication token.
- Add a product to the system by an admin or loggedin user.
- Scan products using a Barcode or Qrcode.

This guide provides details on basic usage, endpoints, and sample code snippets for implementation.

---
## Register
### **POST** `/api/v1/auth/Register`
**Request Body:**
```json
{
  "username": "Shukurahlillah",
  "email":"Shukurahlillah@gmail.com",
  "password": "12345678"
}
```
## Login and Authentication

### **POST** `/api/v1/auth/login`

Authenticate a user and retrieve an access token.

**Request Body:**
```json
{
  "username": "Shukurahlillah",
  "password": "12345678"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "_id": "67895391f06347eaef01f404",
    "email": "Shukurahlll",
    "username": "Shukurahlillah",
    "token": "your_jwt_token"
  }
}
```

### Example Code:
```javascript
const formData = {
   username: "Shukurahlillah",
   password: "12345678"
};

const fetchData = async () => {
   try {
       const resp = await fetch('https://product-scanner-cqro.onrender.com/api/v1/auth/login', {
           method: "POST",
           headers: {
               'content-Type': 'application/json',
           },
           body: JSON.stringify(formData)
       });
       const data = await resp.json();
       console.log(data);
       return data.user.token;
   } catch (error) {
       console.log('Server error:', error);
   }
};

fetchData();
```

---

## Add Product

### **POST** `/api/v1/products/add_product`

Add a product to the database.

**Request Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```

**Request Body:**
```json
{
  "name": "sugar",
  "Qrcode": "12345678"
}
```

**Response:**
```json
{
  "message": "Product added successfully",
  "product": {
    "name": "sugar",
    "Qrcode": "12345678",
    "createdAt": "2025-01-17T12:34:56.789Z"
  }
}
```

### Example Code:
```javascript
const productData = {
   name: "sugar",//name of the product scanned
   Qrcode: "12345678"//the id returned from the barcode scanner
};

const addProduct = async (token) => {
   try {
       const resp = await fetch('https://product-scanner-cqro.onrender.com/api/v1/products/add_product', {
           method: "POST",
           headers: {
               'content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
           },
           body: JSON.stringify(productData)
       });
       const data = await resp.json();
       console.log(data);
   } catch (error) {
       console.log('Error:', error);
   }
};

addProduct('your_jwt_token');
```

---

## Scan Product

### **POST** `/api/v1/products/scan`

Scan a product using its QR code.

**Request Headers:**
```json
// {
//   "Authorization": "Bearer your_jwt_token"
// }
token is not needed to scan, naybody can just come and scan their product
```

**Request Body:**
```json
{
  "name": "sugar",//name of the product scanned
  "Qrcode": "12345678"// the id returned from the barcode scanner
}
```

**Response:**
```json
{
  "message": "Product scanned successfully",
  "product": {
    "name": "sugar",
    "Qrcode": "12345678",
    "status": "Valid",
  }
}
```

### Example Code:
```javascript
const scanProduct = async (token) => {
   try {
       const resp = await fetch('https://product-scanner-cqro.onrender.com/api/v1/products/scan', {
           method: "POST",
           headers: {
               'content-Type': 'application/json',
               // 'Authorization': `Bearer ${token}`
           },
           body: JSON.stringify(productData)
       });
       const data = await resp.json();
       console.log(data);
   } catch (error) {
       console.log('Error:', error);
   }
};

scanProduct();
```

---
## Other endpoints
- Edit product: **PUT** `/api/v1/products/:productId`
- Delete product: **DELETE** `/api/v1/products/:productId`
- GET ALL product: **PUT** `/api/v1/products/get_products`
- Get a single product: **PUT** `/api/v1/products/:productId`
- Get all users: **PUT** `/api/v1/users`



## Notes

1. Replace `your_jwt_token` with the token obtained from the login endpoint.
2. Handle error cases for network issues or invalid credentials.
3. Ensure secure storage of tokens to prevent unauthorized access.

Feel free to contribute or raise issues for improvements. 🚀
```