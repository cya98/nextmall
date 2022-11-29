import { getSession } from 'next-auth/react'
import Order from '../../../models/Order'
import db from '../../../utils/db'

const handler = async (req, res) => {
  //order를 저장함을 위함
  const session = await getSession({ req }) //req에 세션정보가 있는데 그걸 확인
  if (!session) {
    return res.status(401).send('Signin required')
  }

  const { user } = session
  await db.connect()
  const newOrder = new Order({ ...req.body, user: user._id })

  const order = await newOrder.save() //몽고디비에 저장
  console.log(order)
  res.status(201).send(order)
}

export default handler
