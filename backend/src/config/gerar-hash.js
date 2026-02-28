const bcrypt = require('bcryptjs');

const senhaNormal = 'admin123'; // mude para a senha que você quer usar

const hashGerado = bcrypt.hashSync(senhaNormal, 10);

console.log('Hash gerado para a senha "' + senhaNormal + '":');
console.log(hashGerado);
