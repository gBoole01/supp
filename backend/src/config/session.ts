const { SESSION_SECRET } = process.env

const sessionConfig = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}

export default sessionConfig
