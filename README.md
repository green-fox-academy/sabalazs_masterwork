# Bakery pre-order
Masterwork for GFA Full-stack training. It's a simple full-stack application for a Bakery and it's customers to place and manage pre-orders. [Link to original repository on Github](https://github.com/green-fox-academy/sabalazs_masterwork)

## Table of contents
* [Description](#description)
* [Features](#features)
* [Technologies](#technologies)
* [Getting Started](#getting-started)
* [Authors](#authors)
* [License](#license)

## Description

Customers can register, then place pre-orders for available products, and view the status of their previous orders. The administrators can add, delete and edit products, and accept, or reject pre-orders from customers.

## Features
### Customers can:
- register, log in and log out
- see a list of available products
- place orders
- see a list of their previously placed orders
### Administrators can:
- log in and log out
- see a list of all products
- add, delete and edit a product
- see a list of all orders
- change the status of an order

## Technologies
### Backend
- Node
- Express
- MongoDB
- Json Web Token
- Docker
### Frontend
- React

### API documentation
- Swagger

## Getting Started

To see the application in action, run
```
docker-compose up
```
then open ```http://localhost:3000/``` in your browser. The app is running for the (imaginary) "La Merienda" bakery. The database is loaded with some sample data (users, products and orders). You can log-in with the following credentials to test features:

Customer:
```
customer@customer.customer
Password123
```
Admin:
```
admin@admin.admin
Password123
```
You can access the API documentation, at ```http://localhost:4000/``` in your browser.

Instructions regarding dependencies, installation and execution of frontend, backend, image-server and documentation separately:
- [Frontend](frontend/README.md)
- [Backend](backend/README.md)
- [Image server](image-server/README.md)
- [API Documentation](api-documentation/README.md)

## Authors

Balázs Sághy
ex. [@sabalazs](https://github.com/sabalazs)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details