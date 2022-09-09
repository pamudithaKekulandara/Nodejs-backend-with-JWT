import mongoose from 'mongoose'
const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Item', ItemSchema)
