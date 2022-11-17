import Product from '../../../models/Product'
import db from '../../../utils/db'

const handler = async (req, res) => {
  await db.connect()
  const product = await Product.findById(req.query.id)
  await db.disconnect()
  res.send(product) //특정한 찾아서 응답
}

export default handler
