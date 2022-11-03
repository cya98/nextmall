import mongoose from 'mongoose'

const connection = {} // 함수 밖에서 선언

async function connect() {
  //몽고디비에 연결하는함수
  if (connection.isConnected) {
    console.log('already connected')
    return
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState
    if (connection.isConnected === 1) {
      console.log('use previous connection')
      return
    }
    await mongoose.disconnect() //기존에 커넥트가 없다면
  }
  const db = await mongoose.connect(process.env.MONGODB_URI) //.env꺼를 가져다가 쓰는거 클라우드엔 환경변수 넣는 곳이 있음
  console.log('new connection')
  connection.isConnected = db.connections[0].readyState
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect()
      connection.isConnected = false
    } else {
      console.log('not disconnected')
    }
  }
}
const db = { connect, disconnect }
export default db

//이 전체 코드가 그냥 몽고연결하는거라 다른 프로젝트할때도 그대로 쓸 수 있음
