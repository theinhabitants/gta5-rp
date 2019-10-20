let bcrypt = require('bcryptjs');

exports.cryptPassword = password => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

exports.comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
