import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProducts = async(req: Request, res: Response) => {

  const products = await Product.findAll({});
  res.json({data: products});
}

export const getProductById = async(req: Request, res: Response) => {

  const { id } = req.params
  // Verificar que sea string y no array
  if ((Array.isArray(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // PK numérica, se convierte:
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return res.status(400).json({ error: 'ID debe ser un número' });
  }

  const product = await Product.findByPk(productId, {})

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json({data: product});
}

export const createProduct = async(req: Request, res: Response) => {

  const product = await Product.create(req.body);
  res.status(201).json({data: product});
}

export const updateProduct = async(req: Request, res: Response) => {

  const { id } = req.params
  // Verificar que sea string y no array
  if ((Array.isArray(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // PK numérica, se convierte:
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return res.status(400).json({ error: 'ID debe ser un número' });
  }

  const product = await Product.findByPk(productId)

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // Actualizar
  await product.update(req.body);
  await product.save();

  res.json({data: product});
}

export const updateProductAvailability = async(req: Request, res: Response) => {
  const { id } = req.params
  // Verificar que sea string y no array
  if ((Array.isArray(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // PK numérica, se convierte:
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return res.status(400).json({ error: 'ID debe ser un número' });
  }

  const product = await Product.findByPk(productId)

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // Actualizar
  product.availability = !product.dataValues.availability;
  await product.save();

  res.json({data: product});
}

export const deleteProduct = async(req: Request, res: Response) => {
  const { id } = req.params
  // Verificar que sea string y no array
  if ((Array.isArray(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // PK numérica, se convierte:
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return res.status(400).json({ error: 'ID debe ser un número' });
  }

  const product = await Product.findByPk(productId)

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // Eliminar
  await product.destroy();

  res.json({data: "Producto Eliminado"});
}