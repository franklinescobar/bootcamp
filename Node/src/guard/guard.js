const firebase = require('../services/firebase')

const firebaseGuard = async (req, res, next) => {
  console.log(req.headers);
  if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(403).json({ valid: false, message: 'Unauthorized!'});
  }
  let idToken = req.headers.authorization.split('Bearer ')[1];
  try {
   
    const decodedToken = await firebase.auth().verifyIdToken(idToken);
    
    req.user = decodedToken;
    next();
  } catch(e) {
    return res.status(403).json({ valid: false, message: 'Unauthorized, Invalid Token!'});
  }
};

module.exports = firebaseGuard;