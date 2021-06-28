import mongoose, { Document, Schema, ObjectId } from 'mongoose'

type itemsInCart = {
  productId: string;
  quantity: number;
}

export type CartDocument = Document & {
  purchasedBy: string;
  items: itemsInCart[];
  totalAmount: number;
}
const reqNumber = {
  type: Number,
  required: true,
}

const cartSchema = new mongoose.Schema({
  purchasedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: reqNumber,
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
})

export default mongoose.model<CartDocument>('Cart', cartSchema)
