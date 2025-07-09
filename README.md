# Basundhara Organic Farm

Seamless shopping for fresh farm products — from cart to doorstep..Built with React frontend, Express/Node backend, MongoDB database.

---

## Demo Link

[Live Demo](https://webapp-farm-frontend.vercel.app/)

---

## Quick Start

```
git clone https://github.com/4K45H11/webapp-farm-frontend.git
cd webapp-farm-frontend
npm install
npm run dev

```

## Technologies
- React JS
- React Router
- Context API
- Node JS
- Express
- MongoDB

---

## Demo Video
Watch a walkthrough of the major features of this app:

[Video](https://www.loom.com/share/ff02dd44a6474796b7a55236c17b68ee?sid=4c093943-627d-4a93-a55d-171df7961dbd)

---

## Features
**Home**
- Display of product categories
- Search bar (search by category or product name)

**Product List**
- Display of all Products(with add to cart or wishlist button)
- filters by Category (milk, fruits...)
- filters by Rating
- sort by price (both ascending and descending)

**Product Details**
- Details of a product (name, price, rating, category, description, harvesting date...)
- similar products list

**Cart Section**
- Display of all items added to cart
- A proper billing section with total payable amount.

**User Information and Address Page**
- A form to take details of user
- Address section to select delete or add new address

**Order Review Page**
- A detailed summary of ordered items and price
- place order button

**Admin Page**
- List of users
- Respective order history

---

## API Reference

### **POST address/new**<br>
Adds new Address <br>
Sample Response: <br>
```
{_id,address, pin, owner}
```

### **GET address/all**<br>
Read all Address <br>
Sample Response: <br>
```
[{_id,address, pin, owner},...]
```

### **GET address/:owner**<br>
Read all Address of a user <br>
Sample Response: <br>
```
[{_id,address, pin, owner},...]
```

### **DELETE address/:addId**<br>
Read all Address <br>
Sample Response: <br>
```
{_id,address, pin, owner}
```

### **POST order/new**<br>
Add new order <br>
Sample Response: <br>
```
{_id,address, items, orderId, orderDate, user}
```

### **POST order/:userId**<br>
Get order by user <br>
Sample Response: <br>
```
[{_id,address, items, orderId, orderDate, user}]
```
### **GET products/all**<br>
Read All Products with details <br>
Sample Response: <br>
```
[{_id, itemId, title, category, rating, inWishlist, inCart, description, harvestingDate, expirationDate, pricePerKg, micronutrients, canBeUsedBy, discountPercentage, imgUrl},....]
```

### **GET products/category/:categoryName**<br>
Read All Products by category <br>
Sample Response: <br>
```
[{_id, itemId, title, category, rating, inWishlist, inCart, description, harvestingDate, expirationDate, pricePerKg, micronutrients, canBeUsedBy, discountPercentage, imgUrl},....]
```

### **GET products/:productId**<br>
Read details  <br>
Sample Response: <br>
```
{_id, itemId, title, category, rating, inWishlist, inCart, description, harvestingDate, expirationDate, pricePerKg, micronutrients, canBeUsedBy, discountPercentage, imgUrl}
```

### **GET name/:productName**<br>
Get product details by its name <br>
Sample Response: <br>
```
{_id, itemId, title, category, rating, inWishlist, inCart, description, harvestingDate, expirationDate, pricePerKg, micronutrients, canBeUsedBy, discountPercentage, imgUrl}
```
### **POST users/new**<br>
Adds new user <br>
Sample Response: <br>
```
{_id,name, email, phone}
```

### **GET users/all**<br>
Get all users <br>
Sample Response: <br>
```
[{_id,name, email, phone}]
```
---

## Contact 
For bugs or feature request please reach out to akscareer1999@gmail.com
