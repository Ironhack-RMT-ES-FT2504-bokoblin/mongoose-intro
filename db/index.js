const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("todo bien, conectados a la DB")
})
.catch((error) => {
  console.log(error)
})