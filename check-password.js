const {Sequelize} = require('sequelize');

const s = new Sequelize('nardarena','postgres','123456',{
  host:'localhost',
  port:5432,
  dialect:'postgres',
  logging:false
});

s.query('SELECT email, password FROM users WHERE email = $1', {
  bind:['test@gmail.com']
}).then(r => {
  if (r[0].length > 0) {
    console.log('Email:', r[0][0].email);
    console.log('Password:', r[0][0].password);
    console.log('Is Hashed:', r[0][0].password.startsWith('$2'));
  } else {
    console.log('User not found');
  }
  s.close();
});
