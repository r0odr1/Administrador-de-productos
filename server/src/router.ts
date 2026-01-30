import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  updateProductAvailability,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *         Product:
 *              type: object
 *              properties:
 *                  id:
 *                       type: integer
 *                       description: The Product ID
 *                       example: 1
 *                  name:
 *                       type: string
 *                       description: The Product name
 *                       example: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                       type: number
 *                       description: The Product price
 *                       example: 300
 *                  availability:
 *                       type: boolean
 *                       description: The Product availability
 *                       example: true
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products:
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *
 */

router.get("/:id", handleInputErrors, getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by id
 *          tags:
 *              - Products:
 *          description: Return a product base on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad Request - Invalid ID
 *
 */

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El Precio del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),

  handleInputErrors,
  createProduct,
);

/**
 * @swagger
 * /api/products/:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *              - Products:
 *          description: Return a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                             name:
 *                                type: string
 *                                example: "Monitor Curvo de 49 Pulgadas"
 *                             price:
 *                                type: number
 *                                example: 399
 *          responses:
 *              201:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid input data
 *
 */

router.put(
  "/:id",
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El Precio del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no válido"),

  handleInputErrors,
  updateProduct,
);

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a product with user input
 *          tags:
 *              - Products:
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                             name:
 *                                type: string
 *                                example: "Monitor Curvo de 49 Pulgadas"
 *                             price:
 *                                type: number
 *                                example: 399
 *                             availability:
 *                                type: boolean
 *                                example: true
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 *
 */

router.patch("/:id", handleInputErrors, updateProductAvailability);

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update product availability
 *          tags:
 *              - Products:
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found
 *
 */

router.delete("/:id", handleInputErrors, deleteProduct);

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a product by a given ID
 *          tags:
 *              - Products:
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      apllication/json:
 *                          schema:
 *                               type: string
 *                               value: 'Producto Eliminado'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 *
 */

export default router;
