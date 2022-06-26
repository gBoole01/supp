import 'dotenv/config'

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL } = process.env

const dbConnectionURL = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}`

export default dbConnectionURL
