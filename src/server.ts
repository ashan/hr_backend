import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import users from './routes/api/users'
import posts from './routes/api/posts'
import profile from './routes/api/profile'
import keys from './config/keys'
import passportConfig from './config/passport'

const app: express.Application = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect to db
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log.bind(console, 'MongoDB connected'))

// passport middleware
passportConfig.init(app)

// api routes
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
