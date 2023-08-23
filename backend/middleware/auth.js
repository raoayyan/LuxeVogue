
const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.header("x-auth-token")

    if(!token) return res.status(401).send("Access denied not authenticated");
    try{
        const secretkey = process.env.JWT_SECRET_KEY;
        const user=jwt.verify(token,secretkey)

        req.user = user;
        next();
    }
    catch(err){
        res.status(401).send("Access denied invalid auth token");
    }
};

const isUser = (req, res, next) => {
  auth(req, res, () => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access denied. Not authorized...");
    }
  });
};

const isAdmin = (req, res, next) => {
    auth(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).send("Access denied. Not authorized...");
      }
    });
  };

  module.exports = { auth,isAdmin,isUser };