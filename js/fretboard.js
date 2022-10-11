
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
        this.intervalToSymbol = { // name : semitone
            "Minor 2nd" : "b2",
            "Major 2nd" : "2",
            "Minor 3rd" : "b3",
            "Major 3rd" : "3",
            "Perfect 4th" : "4",
            "Dim 5th" : "b5",
            "Perfect 5th" : "5",
            "Minor 6th" : "b6",
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

        // symbols
        this.chordIntervals = { // 1st string -> 6th string
            6 : { "maj" : ["8","5","3","1","5","1"],
                  "min" : ["8","5","b3","1","5","1"],
                  "dim" : ["NA", "NA", "b3", "1", "b5", "1"],
                  "aug" : ["NA","#5","3","1","NA","1"],
                  "sus2": ["8","5","2","NA","NA","1"],
                  "sus4" : ["8","5","4","1","5","1"],
                  "maj7" : ["NA","5","3","7","5","1"],
                  "m7" : ["NA","5","b3","b7","5","1"],
                  "m7b5" : ["NA","NA","b3","b7","b5","1"],
                  "7" : ["NA","5","3","b7","5","1"]
                },
            5 : {
                "maj" : ["5","3","1","5","1","NA"],
                "min" : ["5","b3","1","5","1","NA"],
                "dim" : ["5","b3","1","b5","1","NA"],
                "aug" : ["#5","3","1","NA","1","NA"],
                "sus2" : ["5","2","1","5","1","NA"],
                "sus4" : ["NA","4","1","5","1","NA"],
                "maj7" : ["NA","3","7","5","1","NA"],
                "m7" : ["NA","b3","b7","5","1"],
                "m7b5" : ["NA","b3","b7","b5","1","NA"],
                "7" : ["NA","b3","b7","5","1","NA"]
            },
            4 : {
                "maj" : ["3","1","5","1","NA","NA"],
                "min" : ["b3","1","5","1","NA","NA"],
                "dim" : ["b3","1","b5","1","NA","NA"],
                "aug" : ["1","#5","3","1","NA","NA"],
                "sus2" : ["2","5","NA","1","NA","NA"],
                "sus4" : ["4","1","5","1","NA","NA"],
                "maj7" : ["3","7","5","1","NA","NA"],
                "m7" : ["b3","b7","5","1","NA","NA"],
                "m7b5" : ["b3","b7","b5","1","NA","NA"],
                "7" : ["3","b7","3","5","1","NA"]
            }
        }

        this.chordConstructionOffset = {
            6 : { "maj" : [0,0,1,2,2,0],
                  "min" : [0,0,0,2,2,0],
                  "dim" : [-100,-100,0,2,1,0],
                  "aug" : [-100,1,1,2,-100,0],
                  "sus2" : [0,0,-1,-100,-100,0],
                  "sus4" : [0,0,2,2,2,0],
                  "maj7" : [-100,0,1,1,2,0],
                  "m7" : [-100,0,0,0,2,0],
                  "m7b5" : [-100,-100,0,0,1,0],
                  "7" : [-100,0,1,0,2,0]
                },
            5 : {
                "maj" : [0,2,2,2,0,-100],
                "min" : [-100,1,2,2,0,-100],
                "dim" : [-100,1,2,1,0,-100],
                "aug" : [1,2,2,-100,0,-100],
                "sus2" : [0,0,2,2,0,-100],
                "sus4" : [-100,3,2,2,0,-100],
                "maj7" : [-100,2,1,2,0,-100],
                "m7" : [-100,1,0,2,0,-100],
                "m7b5" : [-100,1,0,1,0,-100],
                "7" : [-100,2,0,2,0,-100]
                },
            4 : {
                "maj" : [2,3,2,0,-100,-100],
                "min" : [1,3,2,0,-100,-100],
                "dim" : [1,3,1,0,-100,-100],
                "aug" : [-2,-1,-1,0,-100,-100],
                "sus2" : [0,-2,-100,0,-100,-100],
                "sus4" : [3,3,2,0,-100,-100],
                "maj7" : [2,2,2,0,-100,-100],
                "m7" : [1,1,2,0,-100,-100],
                "m7b5" : [1,1,1,0,-100,-100],
                "7" : [2,1,2,0,-100,-100]
                }
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


    getIntervalNote(rootNote, interval) {
        let notes = (this.accidentals == "#") ? this.notesSharp : this.notesFlat; 
        let i = (notes.indexOf(rootNote) + this.intervalToSemitone[interval]) % 12
        return notes[i]
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////

class Fretboard {
    constructor() {
        this.numStrings = 6;
        this.numFrets = 14; 
        this.accidentals = 'b';
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
            string.setAttribute("string-number", i+1);

            // Add frets to each string
            for (let j=0; j <= this.numFrets; j++) {
                let fret = document.createElement('div');
                fret.classList.add('fret');
                fret.setAttribute('fret-number', j);

                // Adding note info 
                let note = this.noteUtil.getNote(i,j);
                fret.setAttribute('note', note);

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
class ChordGenerator {
    constructor() {
        this.rootNote = "C";
        this.rootOn = "6";
        this.chordType = "maj";
        this.chordConstructionElements = [];
        this.displayMode = "note"; // or interval
        this.noteUtil = new NotesUtil();
        this.renderChord();
        this.handleEventListeners();
    }

    constructChord() {
        // reset chord construction arrray to empty
        this.chordConstructionElements = [];

        // display root note 
        const rootString  = document.querySelector(`[string-number='${this.rootOn}']`);

        // find which fret number the root note is on 
        const rootStringFrets = Array.from(rootString.children);
        var rootStringFretNum;
        for (let i = 0; i < rootStringFrets.length; i++) {
            const note = rootStringFrets[i].getAttribute("note");
            if (note == this.rootNote) {
                this.chordConstructionElements.push(rootStringFrets[i]);
                rootStringFretNum = rootStringFrets[i].getAttribute('fret-number');
                break;
            }
        } 

        // find chord elem for remaining strings
        const strings = document.querySelectorAll(".string");
        for (let i=0; i < 6; i++) {
            // skip root note as it's already added 
            if (i == (parseInt(this.rootOn)-1)) {
                continue;
            }
            // get offset array. ex. rootOn=6th, maj = [0,0,1,2,2,0]
            const chordOffsets = this.noteUtil.chordConstructionOffset[parseInt(this.rootOn)][this.chordType];
            // muted notes have offset of -100. skip 
            if (chordOffsets[i] == -100) {
                continue;
            }
            // calculate fret number based on offset from root note 
            const fretOffset = parseInt(rootStringFretNum) + chordOffsets[i];
            // if offsets are out of fretboard range, skip
            if (fretOffset < 0 || fretOffset > 14) {
                continue;
            }
            const targetFret = strings[i].querySelector(`[fret-number='${fretOffset}']`);
            this.chordConstructionElements.push(targetFret);
        }
    }


    // TODO
    changeChordDescription() {
        // chord name
        document.querySelector(".chord-name").setAttribute("chord-name", this.rootNote + " " + this.chordType);
        // chord description
        const notes = new Set()
        notes.add(this.rootNote)
        for (const elem of this.chordConstructionElements) {
            notes.add(elem.getAttribute("note"));
        }
        var res = "";
        for (const n of notes) {
            res = res + " - " + n;
        }
        
        document.querySelector(".chord-notes").setAttribute("chord-notes", res.substring(2));
        
    }

    // display all notes in this.chordConstructionElements
    renderChord() {
        this.constructChord();
        this.changeChordDescription();

        const allNotes = document.querySelectorAll(".fret");
        for (let i = 0; i < allNotes.length; i++) {
            // handle opacity and root note coloring 
            if (this.chordConstructionElements.includes(allNotes[i])) {
                allNotes[i].style.setProperty('--noteOpacity', 1);
                // Root Note
                if (allNotes[i] == this.chordConstructionElements[0]) {
                    allNotes[i].classList.add('root-note');
                    // delete unnecessary tags from root note 
                    allNotes[i].classList.remove('interval-selected');
                } 
            } else {
                allNotes[i].style.setProperty('--noteOpacity', 0);
                // remove any previous tag that was assigned 
                allNotes[i].classList.remove("root-note");
            }
        }

        if (this.displayMode == "interval") {
            this.displayInterval();
        }
    }

    // ===================================== 
    //       Add/Remove Interval Tag   
    // =====================================
    // display chords in terms of interval (this.displayMode = interval)
    displayInterval() {
        const allNotes = document.querySelectorAll(".fret");
        for (let i = 0; i < allNotes.length; i++) {
            if (this.chordConstructionElements.includes(allNotes[i])) {
                // skip root note 
                const string = allNotes[i].parentElement.getAttribute("string-number");
                if ((allNotes[i].getAttribute("note") == this.rootNote) && (this.rootOn == string)) {
                    continue;
                } else {
                    allNotes[i].classList.add("interval-selected");
                    const stringNumber = parseInt(allNotes[i].parentNode.getAttribute("string-number")-1);
                    const symbol = this.noteUtil.chordIntervals[parseInt(this.rootOn)][this.chordType][stringNumber];
                    allNotes[i].setAttribute("interval-symbol", symbol);
                }
            } else {
                // remove previously assigned tags 
                allNotes[i].classList.remove("interval-selected");
                allNotes[i].removeAttribute("interval-symbol");
            }
        }
    }

    // this.displayMode = note 
    removeAllIntervalTags() {
        const allNotes = document.querySelectorAll(".fret");
        for (let i = 0; i < allNotes.length; i++) {
            if (allNotes[i].classList.contains("interval-selected")) {
                allNotes[i].classList.remove("interval-selected");
                allNotes[i].removeAttribute("interval-symbol");
            }
        }
    }



    // =========================== 
    //       Toggle Buttons       
    // ===========================
    toggleKeyButton() {
        const keyButtons = Array.from(document.querySelector(".key-notes").children);
        for (let i=0; i < keyButtons.length; i++) {
            const note = keyButtons[i].getAttribute("note");
            if (note == this.rootNote) {
                keyButtons[i].classList.add('selected');
            } else {
                keyButtons[i].classList.remove('selected');
            }
        }
    }

    toggleRootButton() {
        const rootOnButtons = Array.from(document.querySelector(".root").children);
        for (let i=0; i < rootOnButtons.length; i++) {
            const root = rootOnButtons[i].getAttribute("root-on");
            if (root == this.rootOn) {
                rootOnButtons[i].classList.add('selected');
            } else {
                rootOnButtons[i].classList.remove('selected');
            }
        }
    }

    toggleTypeButton() {
        const typeButton = Array.from(document.querySelector(".types").children);
        for (let i=0; i < typeButton.length; i++) {
            const type = typeButton[i].getAttribute("type");
            if (type == this.chordType) {
                typeButton[i].classList.add('selected');
            } else {
                typeButton[i].classList.remove('selected');
            }
        }
    }


    // =========================== 
    //       Event Handlers        
    // ===========================

    showNotesButtonEventListener() {
        const btn = document.getElementById("show-notes-btn");
        btn.addEventListener("click", () => {
            this.displayMode = "note";
            this.removeAllIntervalTags();
            this.renderChord();

            // toggle selected button color
            btn.classList.add("selected");
            document.getElementById("show-intervals-btn").classList.remove("selected");
        });
    }

    showIntervalsButtonEventListener() {
        const btn = document.getElementById("show-intervals-btn");
        btn.addEventListener("click", () => {
            this.displayMode = "interval";
            this.renderChord();
            
            // toggle selected button color 
            btn.classList.add("selected");
            document.getElementById("show-notes-btn").classList.remove("selected");

        });
    }

    keyButtonEventListener() {
        const keyButtons = Array.from(document.querySelector(".key-notes").children);
        for (let i=0; i < keyButtons.length; i++) {
            keyButtons[i].addEventListener("click", () => {
                this.rootNote = keyButtons[i].getAttribute("note");
                this.toggleKeyButton();
                this.renderChord();
            });
        }
    }

    rootOnButtonEventListener() {
        const rootOnButtons = Array.from(document.querySelector(".root").children);
        for (let i=0; i < rootOnButtons.length; i++) {
            rootOnButtons[i].addEventListener("click", () => {
                // remove tag from current rootnode
                document.querySelector(".root-note").classList.remove("root-note");
                this.rootOn = rootOnButtons[i].getAttribute("root-on");
                this.toggleRootButton();
                this.renderChord();
            });
        }
    }

    typesButtonEventListener() {
        const typeButtons = Array.from(document.querySelector(".types").children);
        for (let i=0; i < typeButtons.length; i++) {
            typeButtons[i].addEventListener("click", () => {
                this.chordType = typeButtons[i].getAttribute("type");
                this.toggleTypeButton();
                this.renderChord();
            })
        }
    }

    handleEventListeners() {
        this.showNotesButtonEventListener();
        this.showIntervalsButtonEventListener();
        this.keyButtonEventListener();  
        this.rootOnButtonEventListener();
        this.typesButtonEventListener();
    }



}



////////////////////////////////////////////////////////////////////////////////////////////////////////


class IntervalGenerator {
    constructor() {
        this.rootNote = "C";
        this.selectedIntervals = [];
        this.noteUtil = new NotesUtil();
        this.renderAllNotes();
        this.toggleSelectedRootButton();
        this.configureIntervalGeneratorEventListeners();
    }

    renderAllNotes() {
        // {intervals : note}
        var noteToInterval = {}
        for (const interval of this.selectedIntervals) {
            const note = this.noteUtil.getIntervalNote(this.rootNote, interval);
            noteToInterval[note] = interval;
        }

        // go through all frets and display notes that we want to 
        const allNotes = document.querySelectorAll(".fret");
        for (let i = 0; i < allNotes.length; i++) {
            const currentNote = allNotes[i].getAttribute("note");

            // change opacity of rootNote and interval notes to 1, rest to 0
            if ((currentNote in noteToInterval) || (currentNote == this.rootNote)) {
                allNotes[i].style.setProperty('--noteOpacity', 1);
            } else {
                allNotes[i].style.setProperty('--noteOpacity', 0);
            }

            // change root note color to red 
            if (currentNote == this.rootNote) {
                allNotes[i].classList.add('root-note');
            } else {
                allNotes[i].classList.remove('root-note');
            }

            // change interval notes' content to show interval symbols instead of note name 
            if (currentNote in noteToInterval) {
                allNotes[i].classList.add("interval-selected");
                const symbol = this.noteUtil.intervalToSymbol[noteToInterval[currentNote]];
                allNotes[i].setAttribute("interval-symbol", symbol);
            } else {
                allNotes[i].classList.remove('interval-selected');
                allNotes[i].removeAttribute("interval-symbol");
            }
            
        }
    }

    toggleSelectedRootButton() {
        const rootButtons = Array.from(document.querySelector(".root-notes").children);
        for (let i = 0; i < rootButtons.length; i++) {
            const note = rootButtons[i].getAttribute("note");
            if (note == this.rootNote) {
                // change button color of selected rootButton
                rootButtons[i].classList.add('selected');
            } else {
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
        for (let i = 0; i < rootButtons.length; i++) {
            const rootNote = rootButtons[i].getAttribute("note");
            rootButtons[i].addEventListener("click", () => {
                this.rootNote = rootNote;
                this.renderAllNotes();
                this.toggleSelectedRootButton();
            });
        }
    }

    // toggle interval notes 
    intervalButtonsEventListener() {
        const intervalButtons = Array.from(document.querySelector(".interval-buttons").children);
        for (let i = 0; i < intervalButtons.length; i ++) {
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
                
                // toggle selected (to change color of selected intervals)
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

        let page = this.getPageName();
        if (page == "interval.html") {
            let intervalGenerator = new IntervalGenerator();
        } else if (page == "index.html") {
            let chordGenerator = new ChordGenerator();
        }
    },

    getPageName() {
        let path = window.location.pathname;
        let page = path.split("/").pop();
        return page;
    }
}




app.init();