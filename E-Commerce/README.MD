### SHOP FOR HOME

ShopForHome is a popular Store in the market for shopping the home décor stuff .Due to 
Covid 19 all the offline shopping stopped. So, the store wants to move to the online platforms and wants their 
own web application
- This E-Commerce website named "Shop For Home" fulfills all the User Stories , Admin Stories and Instructions given
- This store contains different categories of home decor stuff
  They are :
   - furniture
   - kitchen
   - electricals

### TECHNOLOGIES USED
- React
- MongoDB
- Node and Expres

### Admin operations
1. Admin is able to login, Logout and Register into the application.
2. Admin is able to perform CRUD on Users.
3. Admin is able to Perform CRUD on the products.
4. Admin is able to get bulk upload option to upload a csv for products details
5. Admin is able to get the stocks.
6. Admin is able to mail if any stock is less than 10.
7. Admin is able to get the sales report of a specific duration.
8. Admin is able to set the discount coupons for the specific set of users


### User operations
1. User is able to login, Logout and Register into the application.
2. user is able to see the products in different categories.
3. user is able to sort the products.
4. user is able to add the products into the shopping cart.
5. user is able to increase or decrease the quantity added in the cart.
6. user is able to add “n” number of products in the cart.
7. user is able to get the Wishlist option where he/she can add those products which they want but don’t want to order now
8. user is able to  get different discount coupons.


### How To Start The Application
1. In the project directory open command prompt
# Commands for installation
  1. cd apigateway 
  2. npm install
  3. cd ..
  4. cd discount
  5. npm install
  6. cd..
  7. cd backend
  8. npm install
  9. cd..
  10. cd frontend
  11. npm install
  12. cd ..
  13. npm install concurrently

# command to run the application
  1. npm run dev


### Steps to be followed while running application
  1. As the database named "project" is empty. so there will be no products shown in the home page of application.

  # ADMIN
  1. Click on the register icon in navbar and do signup as admin by giving valid details

     Ex:
      AdminName        :      admin1
      Email address    :      admin1@gmail.com
      password         :      adminadmin1
      conform password :      adminadmin1

  2. Do signin as admin with valid details.
  3. After uploading a Bulk CSV file named "items"(provided in the project directory) in BUlk Upload section  or by creating a product in Create  Product section of "ADMIN DASHBOARD". The products  will be shown in the home page of application.
  4. Admin can perform all the above Admin operations

  # USER
  1. click on the register icon in navbar and do signup as user by giving valid details.
      
     Ex:
      UserName         :      user1
      Email address    :      user1@gmail.com
      password         :      useruser1
      conform password :      useruser1
  2. Do signin as user with valid details.
  3. User can perform all the above user operations


### PORTS
1. frontend      - 3000
2. backend       - 8010
3. apigateway    - 8020
4. discount      - 8030


### How Mail Works
1. when an user orders an item the stocks will be updated during that time a scan of item quantities will be checked and for every item with stock less than 10, a mail will be sent to owner along with product details , user details  and stock details


### To get access to swagger documentation
1. http://localhost:8010/api-docs
2. http://localhost:8020/api-docs
3. http://localhost:8030/api-docs


------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------


### Admin Operations

# Admin signup
1. http://localhost:8010/api/admin/signup
  method:POST
  BODY:
  {
    "adminId":"1234",
    "adminName":"capstone-5",
    "adminMail":"capstone@gmail.com",
    "password":"12345567"
  }

# Admin signin
2. http://localhost:8010/api/admin/signin
  method:POST
  BODY:
  {
    "adminId":"1234",
    "adminName":"capstone-5",
    "adminMail":"capstone@gmail.com",
    "password":"12345567"
  }
 A token will be generated use this token 

# Get admins
3. http://localhost:8010/api/admin/
   method: GET

# Get users
4. http://localhost:8010/api/admin/getUsers
   method: GET
   In Auth section use Bearer Token

# Adding user by admin
5. http://localhost:8010/api/admin/addUser
  method:POST
  BODY:
  {
    "userId":"9",
    "userName":"user9",
    "userMail":"user9@gmail.com",
    "password":"iamuser9",
    "cartList":[1,2,3],
    "wishList":[1,2,3],
    "coupons":[1,2,3]
  }
  In Auth section use Bearer Token

# Deleting user by admin
6. http://localhost:8010/api/admin/deleteUser/:id
   method:DELETE
   In Auth section use Bearer Token
   (EX:- http://localhost:8010/api/admin/deleteUser/:62d50f224135ea78c848505d)


# Updating user by admin
7. http://localhost:8010/api/admin/updateUser
   method:PUT
   In Auth section use Bearer Token
   BODY:
   {
    "userId":"9",
    "userName":"user9",
    "userMail":"user9@gmail.com",
    "password":"heyiamuser9",
    "cartList":[1,2,3],
    "wishList":[1,2,3],
    "coupons":[1,2,3]
   }

# Adding an item by admin
8. http://localhost:8010/api/admin/product/addItem
   method:POST
   In Auth section use Bearer Token
   BODY:
  {
    "productId":"1",
    "cost":"2000",
    "features":"good",
    "productName":"chair",
    "category":"A1",
    "stock":10,
    "brand":"S1",
    "description":"ok",
    "image":"http://localhost:8010/images/chair_imp.jpg"
  }
 
# Bulk Upload  by admin for posting a csv file 
9. http://localhost:8020/bulkUpload
   method:POST
   use form-data to submit a csv file

# Deleting a product 
10. http://localhost:8010/api/admin/product/delete/:id
    method:DELETE
    In Auth section use Bearer Token
    (EX:-http://localhost:8010/api/admin/product/delete/62d441364135ea78c8484f36)

# Getting items
11. http://localhost:8010/api/admin/product/getItems
    method:GET

# Updating item
12. http://localhost:8010/api/admin/product/update/:id
    method:PUT
    In Auth section use Bearer Token
   BODY:
    {
       "productId": "1",
        "cost": 500,
        "features": "safety Rails",
        "productName": "1bed",
        "category": "furniture",
        "stock": 19,
        "brand": "A1",
        "description": "cushioned matresses",
        "image": "http://localhost:8010/images/bed1.jpeg"
    }
    (Ex:-http://localhost:8010/api/admin/product/update/62d441364135ea78c8484f30) 


# To get certain items
13. http://localhost:8010/api/admin/product/getCertainItems
    method:POST
    In Auth section use Bearer Token
    Body:
    {
    "idArray":["id1","id2]
    }
   (ex:-1
    {
   "idArray": ["62d441364135ea78c8484f30","62d441364135ea78c8484f31"]
    })

# To get orders placed
14. http://localhost:8010/api/admin/order/getOrders
    method:GET
    In Auth section use Bearer Token

# To get sales
15. http://localhost:8010/api/admin/sales/getSales
    method:GET
    In Auth section use Bearer Token

# To update discount
16. http://localhost:8030/updateUserCoupon/:userId
    method:PUT
    Body:
    {
        "coupon":"abcdef",
        "discount":20
    }

--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------

### User operations 

# User signup
1. http://localhost:8010/api/user/signup
   method:POST
   BODY:
  {
     
    "userId":"95",
    "userName":"user95",
    "userMail":"user95@gmail.com",
    "password":"heyiamuser95",
    "cartList":[1,2,3],
    "wishList":[1,2,3],
    "coupons":[1,2,3]
  }

# User signin
2. http://localhost:8010/api/user/signin
   method:POST
   BODY:
  {
     
    "userId":"95",
    "userName":"user95",
    "userMail":"user95@gmail.com",
    "password":"heyiamuser95",
    "cartList":[1,2,3],
    "wishList":[1,2,3],
    "coupons":[1,2,3]
  }
  A Token will be generated


# Get users
3. http://localhost:8010/api/user/
  method:GET
  In Auth section use Bearer-Token


# Get specific user by using id
4. http://localhost:8010/api/user/getUser/:id
   method:GET
  (Ex:-http://localhost:8010/api/user/getUser/62d4252443b1ac3fbde1ae0d)


# Get all items
5. http://localhost:8010/api/user/product/getItems
   method:GET


# Adding to wishlist
6. http://localhost:8010/api/user/product/addToWishList/:userId
   method:POST
   In Auth section use Bearer-Token
   (EX:-http://localhost:8010/api/user/product/addToWishList/62d4252443b1ac3fbde1ae0d)


# Removing from wishlist
7. http://localhost:8010/api/user/product/removeFromWishList/:productId/:userId
   method:DELETE
   In Auth section use Bearer-Token
   (EX:-http://localhost:8010/api/user/product/removeFromWishList/62d441364135ea78c8484f37/62d4252443b1ac3fbde1ae0d)


# Add to cart
8. http://localhost:8010/api/user/product/addToCart/:userId
   method:POST
   In Auth section use Bearer-Token
  (EX:-http://localhost:8010/api/user/product/addToCart/62d4252443b1ac3fbde1ae0d)


# Remove from cart
9. http://localhost:8010/api/user/product/removeFromCart/:productId/:userId
   method:DELETE
   In Auth section use Bearer-Token
   (EX:-http://localhost:8010/api/user/product/removeFromCart/62d441364135ea78c8484f37/62d4252443b1ac3fbde1ae0d)


# Placing order
10. http://localhost:8010/api/user/order/placeOrder
    method:POST
    In Auth section use Bearer-Token
   BODY:
   {
     "productId":"1",
     "cost":"500",
     "productName":"bed1",
     "quantity":"1",
     "userId":"62d5b1c32d3350a3f4608d1b",
     "userName":"user95",
     "address":"street-1"
    }

# modifying sales
11. http://localhost:8010/api/user/sales/modifySales
    method:POST
    In Auth section use Bearer-Token
    BODY:
    {
     "productId":"1",
     "productName":"bed1",
     "sold":2,
     "cost":501
    }

# use discount
12. http://localhost:8030/useUserCoupon/:userId
    method:PUT
    Body:
    {
        "coupon":"abcdef",
        "discount":20
    }


