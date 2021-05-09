const yargs = require('yargs')
const notes = require('./notes.js')

// Customizing yargs version
yargs.version('1.1.0')

// add, remove, read, list commands
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note content(body)',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.addNote(argv.title, argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: 'Remove the note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.removeNote(argv.title)
    }
})
yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.readNote(argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler () {
        notes.listNotes()
    }
})

yargs.parse()



