const connectDB = require('./db/index')
const app = require('./app');

require('dotenv').config();

const port = process.env.PORT || 8000

connectDB()
.then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})
.catch((err) => {
  console.log("MONGO DB connection failed !!! ", err)
})