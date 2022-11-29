import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    user: {
      //하나의 객체
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      //배열
      {
        name: { type: String, required: true }, // 상품이름
        quantity: { type: Number, required: true }, // 수량
        image: { type: String, required: true }, // 이미지
        price: { type: Number, required: true }, // 가격
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    //??
    timestamps: true, //디비에 시간 저장 //??
  }
)

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)
export default Order
