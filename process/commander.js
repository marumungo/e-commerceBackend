const commander = require('commander')

const program = new commander.Command()

program
    .option('-d', 'Variable para debug', false)
    .option('-p, --port <port>', 'Puerto para el servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'production')
    .requiredOption('-u <user>', 'Usuario utilizando el appicativo', 'No se ha declarado un usuario')
    .option('-l, --letters [letter...]', 'specify the letters')
    
program.parse()

console.log('options: ', program.opts())
console.log('Remaining Arguments: ', program.args)


// node commander.js -d -p 3000 --mode develpment -u root --letters a b c
// node commander.js -d -p 3000 -u root 2 a 5 --letters fede

process.on('exit', code => {
    console.log('se ejecuta justo antes de terminar el processo', code)
})
process.on('uncaughtException', exception => {
    console.log('se ejecuta justo con alguna exception')
})
process.on('message', message => {
    console.log('muestra el mensaje de otro processo')
})

