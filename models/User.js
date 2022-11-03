import mongoose, { Mongoose } from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }, //관리자가 아니도록 평소엔 이폴트 false
  },
  {
    timestamps: true, //시간기록
  }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
