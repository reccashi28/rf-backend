import Product, { ProductDocument } from '../models/Product'

function create(product: ProductDocument): Promise<ProductDocument> {
  console.log(product, "product services ")
  return product.save()
}

function findProductById(productId: string): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then((product) => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }
      return product
    })
}

function findAllProducts(): Promise<ProductDocument[]> {
  return Product.find().sort({ name: 1 }).exec()
}

function update(
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then((product) => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }
      if (update.name) {
        product.name = update.name
      }
      if (update.description) {
        product.description = update.description
      }
      if (update.categories) {
        product.categories = update.categories
      }
      if (update.variants) {
        product.variants = update.variants
      }
      if (update.sizes) {
        product.sizes = update.sizes
      }
      if(update.price) {
        product.price = update.price
      }
      if (update.quantity) {
        product.quantity = update.quantity
      }

      return product.save()
    })
}

function deleteProduct(productId: string): Promise<ProductDocument | null> {
  return Product.findByIdAndDelete(productId).exec()
}

export default {
  create,
  findProductById,
  findAllProducts,
  update,
  deleteProduct,
}
