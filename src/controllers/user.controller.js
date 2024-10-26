const asyncHandler = require('../utils/asyncHandler')

const registerUser = asyncHandler (async (req, res) => {
  res.status(200).json({
    message: "Ok"
  })
})

module.exports = registerUser