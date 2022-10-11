
class NotesUtil {
    constructor() {
        this.accidentals = 'b';
        this.notesSharp = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
        this.notesFlat = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
        this.guitarTuning = ['E','A','D','G','B','E'];
        this.intervalToSemitone = { // name : semitone
            "Minor 2nd" : 1,
            "Major 2nd" : 2,
            "Minor 3rd" : 3,
            "Major 3rd" : 4,
            "Perfect 4th" : 5,
            "Dim 5th" : 6,
            "Perfect 5th" : 7,
            "Minor 6th" : 8,
            "Major 6th" : 9, 
            "Minor 7th" : 10, 
            "Major 7th" : 11, 
            "Octaves" : 12
            // "Minor 9th" : 13,
            // "Major 9th" : 14, 
            // "Aug 9th" : 15, 
            // "11th" : 16,
            // "Aug 11th" : 17,
            // "Minor 13th" : 18, 
            // "13th" : 19
        }   
        this.senitoneToInterval = { // name : semitone
            0 : "Octaves",
            1 : "Minor 2nd",
            2 : "Major 2nd",
            3 : "Minor 3rd",
            4 : "Major 3rd",
            5 : "Perfect 4th",
            6 : "Dim 5th",
            7 : "Perfect 5th",
            8 : "Minor 6th",
            9 : "Major 6th", 
            10 : "Minor 7th", 
            11 : "Major 7th", 
            12 : "Octaves"
            // "Minor 9th" : 13,
            // "Major 9th" : 14, 
            // "Aug 9th" : 15, 
            // "11th" : 16,
            // "Aug 11th" : 17,
            // "Minor 13th" : 18, 
            // "13th" : 19
        }   
        this.intervalToSymbol = { // name : semitone
            "Minor 2nd" : "b2",
            "Major 2nd" : "2",
            "Minor 3rd" : "b3",
            "Major 3rd" : "3",
            "Perfect 4th" : "4",
            "Dim 5th" : "b5",
            "Perfect 5th" : "5",
            "Minor 6th" : "#5",
            "Major 6th" : "6", 
            "Minor 7th" : "b7", 
            "Major 7th" : "7", 
            "Octaves" : "8",
            // "Minor 9th" : 13,
            // "Major 9th" : 14, 
            // "Aug 9th" : 15, 
            // "11th" : 16,
            // "Aug 11th" : 17,
            // "Minor 13th" : 18, 
            // "13th" : 19
        }   
    }

    // 0 = 1st string, 1 = 2nd string, ..., 5 = 6th string
    getNote(string, fret) {
        let notes = (this.accidentals == "#") ? this.notesSharp : this.notesFlat; 
        let arrayLength = this.guitarTuning.length - 1 ;
        let note0 = this.guitarTuning[arrayLength - string];
        let note0Index = notes.indexOf(note0);
        let note = notes[(note0Index + fret) % notes.length];
        return note;
    }

    // getNoteFromIntervalName("C", "Major 3rd") = "E"
    getNotefromIntervalName(rootNote, interval) {
        let notes = (this.accidentals == "#") ? this.notesSharp : this.notesFlat; 
        let i = (notes.indexOf(rootNote) + this.intervalToSemitone[interval]) % 12
        return notes[i];
    }

    // getIntervalNameFromNote("C", "E") = "Major 3rd"
    // A C gives -9 
    getIntervalNameFromNote(rootNote, intervalNote) {
        let notes = (this.accidentals == "#") ? this.notesSharp : this.notesFlat; 
        let i = notes.indexOf(intervalNote) - notes.indexOf(rootNote)
        // let i = (notes.indexOf(intervalNote) - notes.indexOf(this.rootName)) % 12
        console.log(rootNote,intervalNote,i)
        return this.senitoneToInterval[i];
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////

class Fretboard {
    constructor() {
        this.numStrings = 6;
        this.numFrets = 14; 
        this.accidentals = 'b';
        this.defaultRoot = 'C';
        this.noteUtil = new NotesUtil();
    }

    // Create fretboard 
    constructFretboard() {
        // Empty .fretboard element 
        const fretboard = document.querySelector('.fretboard')

        // Add strings
        for (let i=0; i < this.numStrings; i++) {
            let string = document.createElement('div');
            string.classList.add('string');

            // Add frets to each string
            for (let j=0; j <= this.numFrets; j++) {
                let fret = document.createElement('div');
                fret.classList.add('fret');

                // Adding note info 
                let note = this.noteUtil.getNote(i,j);
                fret.setAttribute('note', note);

                // set root / interval
                if (note == this.defaultRoot) {
                    fret.classList.add("root-note");
                } 
                const interval = this.noteUtil.getIntervalNameFromNote(this.defaultRoot, note);
                const symbol = this.noteUtil.intervalToSymbol[interval];
                fret.setAttribute('interval', interval);
                fret.setAttribute('interval-symbol', symbol);
                

                // Adding position mark 
                    // single position mark 
                if ((i == 0) && [3,5,7,9,14].includes(j)) {
                    fret.classList.add('singlePositionMark');
                // double position mark 
                } else if (j == 12) {
                    if (i == 0) {
                        fret.classList.add('doublePositionMarkTop');
                    } else if (i == 5) {
                        fret.classList.add('doublePositionMarkBottom');
                    } 
                }
                string.appendChild(fret);
            }

            // Add string + its fret children to .fretboard element
            fretboard.appendChild(string);

        }
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////


class IntervalGenerator {
    constructor() {
        this.rootNote = "C";
        this.selectedIntervals = ["Octaves"];
        this.noteUtil = new NotesUtil();
        this.renderAllNotes();
        this.selectRootButton();
    }

    renderAllNotes() {
        // update fretboard attributes first 
        this.setIntervalAttributes();

        // go through all frets and display notes that we want to 
        const allNotes = document.querySelectorAll(".fret");
        for (let i = 0; i < allNotes.length; i++) {
            // const currentNote = allNotes[i].getAttribute("note");
            const interval = allNotes[i].getAttribute("interval");
            // handle display
            if (this.selectedIntervals.includes(interval)) {
                allNotes[i].style.setProperty('--noteOpacity', 1);
            } else {
                allNotes[i].style.setProperty('--noteOpacity', 0);
            }

            // handle root note coloring 
            if (interval == "Octaves") {
                allNotes[i].classList.add('root-note');
            } else if (allNotes[i].classList.contains('root-note')) {
                allNotes[i].classList.remove('root-note');
            }

            // handle interval text
            if ((this.selectedIntervals.includes(interval)) && (interval != "Octaves")) {
                allNotes[i].classList.add("interval-selected");
            } else if (allNotes[i].classList.contains('interval-selected')) {
                allNotes[i].classList.remove('interval-selected');
            }
            
        }
    }

    // sets "interval" attribute of all notes on fret relative to this.rootNote
    setIntervalAttributes() {
        const allNotes = document.querySelectorAll(".fret");
        for (let i = 0; i < allNotes.length; i++) {
            const currentNote = allNotes[i].getAttribute("note");
            const interval = this.noteUtil.getIntervalNameFromNote(this.rootNote, currentNote);
            const symbol = this.noteUtil.intervalToSymbol[interval];
            allNotes[i].setAttribute('interval', interval);
            allNotes[i].setAttribute('interval-symbol', symbol);
        }
    }

    // select root 
    // root -> add class ".selected"
    // for every note on fretboard, set attributes "interval"
    // when we select interval button, toggle "active"

    selectRootButton() {
        const rootButtons = Array.from(document.querySelector(".root-notes").children);
        const numChildren = document.querySelector('.root-notes').childElementCount;
        for (let i = 0; i < numChildren; i++) {
            const note = rootButtons[i].getAttribute("note");
            if (note == this.rootNote) {
                rootButtons[i].classList.add('selected');
            } else if (rootButtons[i].classList.contains('selected')) {
                rootButtons[i].classList.remove('selected');
            }
        }
    }


    // =========================== 
    //       Event Handlers        
    // ===========================

    // display root notes 
    rootButtonsEventListener() {
        const rootButtons = Array.from(document.querySelector(".root-notes").children);
        const numChildren = document.querySelector('.root-notes').childElementCount;
        for (let i = 0; i < numChildren; i++) {
            const rootNote = rootButtons[i].getAttribute("note");
            rootButtons[i].addEventListener("click", () => {
                this.rootNote = rootNote;
                this.renderAllNotes();
                this.selectRootButton();
            });
        }
    }

    // toggle interval notes 
    intervalButtonsEventListener() {
        const intervalButtons = Array.from(document.querySelector(".interval-buttons").children);
        const numChildren = document.querySelector('.interval-buttons').childElementCount;
        for (let i = 0; i < numChildren; i ++) {
            const interval = intervalButtons[i].getAttribute("interval");
            intervalButtons[i].addEventListener("click", () => {
                // toggle interval in this.selectedIntervals
                if (this.selectedIntervals.includes(interval)) {
                    // that interval was already selected -> remove
                    const i = this.selectedIntervals.indexOf(interval);
                    this.selectedIntervals.splice(i,1);
                } else {
                    // that interval has not already been selected -> add
                    this.selectedIntervals.push(interval);
                }
                this.renderAllNotes();
                
                // toggle selected
                intervalButtons[i].classList.toggle("selected");
            });
        }
    }

    // collection of event listeners 
    configureIntervalGeneratorEventListeners() {
        this.rootButtonsEventListener();
        this.intervalButtonsEventListener();
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////



const app = {
    init() {
        let fretboard = new Fretboard();
        fretboard.constructFretboard();

        let intervalGenerator = new IntervalGenerator();
        intervalGenerator.configureIntervalGeneratorEventListeners();
    },
}




app.init();