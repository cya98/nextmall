//백엔드 페이지 백엔드 프론트 나녔는데 여기선 그냥 한 프로젝트 안에 백엔드 페이지가있어서 편리

import User from '../../models/User'
import data from '../../utils/data'
import db from '../../utils/db'

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

const handler = async (req, res) => {
  await db.connect()
  await User.deleteMany() //기존의 유저 데이터를 다 지우는거
  await User.insertMany(data.users)
  await db.disconnect()
  res.send({
    message: 'seeded successfully... 초기사용자가 성공적으로 등록되었습니다.',
  })
} //async 비동기 함수 다른거할땐 다른거하고 대기하거나 등등 효율적으로 하기위해

export default handler
