import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string;
  description: string;
  categories: string;
  variants: string[];
  sizes: string[];
  price: number;
  quantity: number;
  productImage: string;
  dateAdded: Date;
}
const reqString = {
  type: [String],
  required: true,
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true
  },
  variants: reqString,
  sizes: reqString,
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)
