const bcrypt = require('bcrypt');


const verifyPassword = async (password)=>{
  const myPassword = 'admin123';
  const hash = 'khgghdfghghkjh';
  const isMatch = await bcrypt.compare(myPassword,hash);
  console.log(isMatch);
}

verifyPassword();
