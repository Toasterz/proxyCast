var secret = require('./config').secret;
function authorize(req, res, next)
{
  if(req.body.passphrase !== secret)
  {
    res.status(403).json({msg: 'Forbidden fool'});
  }
  else {
    {
      next();
    }
  }
}

module.exports = authorize;
