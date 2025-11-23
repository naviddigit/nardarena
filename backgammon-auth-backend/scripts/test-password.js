const bcrypt = require('bcrypt');
const {Sequelize} = require('sequelize');

const s = new Sequelize('nardarena','postgres','123456',{
  host:'localhost',
  port:5432,
  dialect:'postgres',
  logging:false
});

async function testPassword() {
  const email = 'admin@nardarena.com';
  const password = 'admin123';
  
  const [users] = await s.query('SELECT password FROM users WHERE email = $1', {bind: [email]});
  
  if (users.length === 0) {
    console.log('User not found');
    return;
  }
  
  const hashedPassword = users[0].password;
  
  console.log('Email:', email);
  console.log('Test Password:', password);
  console.log('Hashed in DB:', hashedPassword.substring(0, 30) + '...');
  console.log('Is Hashed:', hashedPassword.startsWith('$2'));
  
  const match = await bcrypt.compare(password, hashedPassword);
  console.log('Password Match:', match ? '✅ YES' : '❌ NO');
  
  await s.close();
}

testPassword();
