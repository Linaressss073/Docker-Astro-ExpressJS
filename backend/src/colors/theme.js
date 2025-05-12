const colors = require('colors');

colors.setTheme({
  success: ['bold', 'underline', 'white', ], // OK
  failed: ['bold', 'underline', 'white', 'bgRed'],    // OK
  warning: ['bold', 'underline', 'black', 'bgYellow'],// OK
  info: ['bold', 'underline', 'white', 'bgBlue'],     // OK
  highlight: ['bold', 'underline', 'black', 'bgCyan'],// OK
  title: ['bold', 'underline', 'magenta']             // Solo texto
});

/* Ejemplos de uso:
console.log('✅ Conexión exitosa'.success);
console.log('❌ Fallo en la conexión'.failed);
console.log('⏳ Conectando...'.pending);
console.log('🔄 Reintentando conexión...'.reconnecting);
console.log('🔌 Desconectado del servidor'.disconnected);
console.log('ℹ️ Información adicional'.info);
console.log('Mi texto especial'.custom);
*/

module.exports = colors;