module.exports = (req, res, next) => {
  res.status(400).json({ 
    valid: false, 
    message: 'invalid request endpoint',
    info: {
      method: req.method,
      path: req.path
    }});
}