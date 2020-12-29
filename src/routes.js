const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const ProductController = require('./controllers/ProductController');
const AuthController = require('./controllers/authController');

routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.post("/products", multer(multerConfig).single("file"), ProductController.store);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.destroy);

routes.post("/register", AuthController.createUser);
routes.post("/authenticate", AuthController.authenticate);

module.exports = routes;
