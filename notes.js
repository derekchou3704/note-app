const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...';
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    debugger

    if (!duplicateNote) {
        notes.push({ title: title, body: body })
        saveNotes(notes)
        const successMsg = chalk.green.inverse('New note added!')
        console.log(successMsg)
    } else {
        const warnMsg = chalk.red.inverse('Note title taken!')
        console.log(warnMsg)
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note =>  note.title !== title)
    saveNotes(notesToKeep)

    if (notesToKeep.length === notes.length) {
        const warnMsg = chalk.red.inverse('No such note!')
        console.log(warnMsg)
    } else {
        const successMsg = chalk.green.inverse('Note Removed!')
        console.log(successMsg)
    }
}

const readNote = title => {
    const notes = loadNotes()
    try {
        const noteToRead = notes.find(note => note.title === title)
        console.log(`${chalk.cyan.bgGrey(noteToRead.title)}: ${noteToRead.body}`)
    } catch (e) {
        console.log(chalk.red(`Can't find ${chalk.inverse(title)} in the list!`))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.cyan.inverse('Your notes:'))
    notes.forEach(note => console.log(note.title));
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}