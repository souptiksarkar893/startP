const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const User = require('../models/user.model')
const uploadOnCloudinary = require('../utils/cloudinary.js')
const ApiResponse = require('../utils/ApiResponse')

const registerUser = asyncHandler (async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if the user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refreh token field from response
  // check for user creation
  // return response

  const { fullName, email, userName, password } = req.body
  console.log("email: ", email)

  if(
    [fullName, email, userName, password].some((field) => 
      field.trim() === "")
  ) {
    throw new ApiError(400,  "All fields are required")
  }

  // Await the `findOne` method to ensure it completes before continuing
  const existedUser = await User.findOne({
    $or: [{ userName }, { email }]
  });

  if(existedUser) {
    throw new ApiError(409, "User with email or username already exists")
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if(!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // Conditionally upload cover image only if `coverImageLocalPath` exists
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  if(!avatar) {
    throw new ApiError(400, "Avatar file is required")
  }

  const user = await User.create({
    fullName, 
    email, 
    userName: userName.toLowerCase(), 
    password, 
    avatar: avatar.url, 
    coverImage: coverImage?.url || ""
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  )
})

module.exports = registerUser