const jwt = require("jsonwebtoken")

const genAuthToken = (user)=>{
    const token=jwt.sign({id: user._id,name:user.name, email:user.email,isAdmin:user.isAdmin}, process.env.JWT_SECRET_KEY)
    return token;
}
module.exports = genAuthToken;