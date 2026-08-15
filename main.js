const letter_states = {
  CORRECT: "correct",
  PRESENT: "present",
  ABSENT: "absent",
};
// 1. ALL state lives in one object. One.
const state_empty = {
  solucion: "",
  intentos: [],
  actual: "",
  estado: "jugando",
  mensaje: "",
};

// 1. ALL state lives in one object. One.
// 1. ALL state lives in one object. One.
// 1. ALL state lives in one object. One.
const state_midgame = {
  solucion: "MAYAS",
  intentos: ["YASAS", "TERMO"],
  actual: "PELL",
  estado: "jugando",
  mensaje: "",
};
const state3 = {
  solucion: "MAYAS",
  intentos: ["CASAS", "TERMO"],
  actual: "PE",
  estado: "jugando",
  mensaje: "",
};
const state5 = {
  solucion: "MAYAS",
  intentos: ["CASAS", "TERMO"],
  actual: "PE",
  estado: "jugando",
  mensaje: "",
};
// 2. ONE function paints the entire DOM from that state.
let boxes;

const N_COLS = 5;
const N_ROWS = 6;

let evals = new Array(N_ROWS * N_COLS);

function getBox(row, col) {
  return boxes[row * N_COLS + col];
}
function getLetter(row, col) {
  return getBox(row, col).textContent;
}
function getEval(row, col) {
  return evals[row * N_COLS + col];
}
function setBox(letter, row, col) {
  boxes[row * N_COLS + col].textContent = letter;
}
// word must be of length N_COLS
function setRow(word, row) {
  for (let i = 0; i < N_COLS; ++i) {
    setBox(word[i], row, i);
  }
}

function getBoxes(row) {
  let row_boxes = new Array(N_COLS);
  for (let col = 0; col < N_COLS; ++col) {
    row_boxes[col] = getBox(row, col);
  }
  return row_boxes;
}

function getWord(row) {
  let word = "";
  console.log(word);
  for (let i = 0; i < N_COLS; ++i) {
    word += getLetter(row, i);
  }
  return word;
}
//returns an eval of length solucion.length where for every
// letter there's a possible value of the properties of letter_states
function evaluar(intento, solucion) {
  // returns an array of "correcta" | "presente" | "ausente", same length as intento
  let eval = new Array(solucion.length).fill(letter_states.ABSENT);
  // find the correct ones
  let letters_sol = {};

  for (const letter of solucion) {
    letters_sol[letter] = letters_sol[letter] ?? 0;
    ++letters_sol[letter];
  }

  for (let i = 0; i < solucion.length; ++i) {
    if (intento[i] == solucion[i]) {
      eval[i] = letter_states.CORRECT;
      --letters_sol[solucion[i]];
    }
  }
  // find the present ones but not exact position
  for (let i = 0; i < solucion.length; ++i) {
    if (eval[i] != letter_states.CORRECT && letters_sol[intento[i]] > 0) {
      eval[i] = letter_states.PRESENT;
      --letters_sol[intento[i]];
    }
  }
  // the rest of the letters are absent
  return eval;
}

function setEval(row, eval) {
  for (let i = 0; i < eval.length; ++i) {
    {
      evals[row * N_COLS + i] = eval[i];
    }
  }
}

function paintBox(row, col, eval) {
  let box = getBox(row, col);
  switch (eval) {
    case letter_states.CORRECT:
      box.classList.add("correct");
      break;
    case letter_states.PRESENT:
      box.classList.add("present");
      break;
    case letter_states.ABSENT:
      box.classList.add("absent");
  }
}
function paintEvalWord(word_boxes, evals) {
  for (let i = 0; i < eval.length; ++i) {
    paintBox(word_boxes[i], eval[i]);
  }
}

function render(state) {
  /* ... */
  boxes = document.querySelectorAll(".letter-box");
  // painting the words
  let n_intentos = state.intentos.length;
  for (let i = 0; i < n_intentos; ++i) {
    setRow(state.intentos[i], i);
  }
  let pos_actual = n_intentos;
  setRow(state.actual, pos_actual);
  // painting the evaluation
  for (let i = 0; i < N_ROWS; ++i) {
    for (let j = 0; j < N_COLS; ++j) {
      paintBox(i, j, getEval(i, j));
    }
  }
}

function testEvaluar() {
  // Define the test cases with the correct expected outcomes
  const testCases = [
    {
      solucion: "SOSA",
      intento: "OSOS",
      // O (present), S (present), O (absent - no more O's left), S (present)
      expected: [
        letter_states.PRESENT,
        letter_states.PRESENT,
        letter_states.ABSENT,
        letter_states.PRESENT,
      ],
    },
    {
      solucion: "CASAS",
      intento: "SALSA",
      // S (present), A (correct), L (absent), S (present), A (present)
      expected: [
        letter_states.PRESENT,
        letter_states.CORRECT,
        letter_states.ABSENT,
        letter_states.PRESENT,
        letter_states.PRESENT,
      ],
    },
    {
      solucion: "PERRO",
      intento: "ROPAS",
      // R (present), O (present), P (present), A (absent), S (absent)
      expected: [
        letter_states.PRESENT,
        letter_states.PRESENT,
        letter_states.PRESENT,
        letter_states.ABSENT,
        letter_states.ABSENT,
      ],
    },
    {
      solucion: "PERRO",
      intento: "PERRO",
      // All correct
      expected: [
        letter_states.CORRECT,
        letter_states.CORRECT,
        letter_states.CORRECT,
        letter_states.CORRECT,
        letter_states.CORRECT,
      ],
    },
    {
      solucion: "PLATO",
      intento: "TAPAS",
      // T (present), A (present), P (present), A (absent - only one A in PLATO), S (absent)
      expected: [
        letter_states.PRESENT,
        letter_states.PRESENT,
        letter_states.PRESENT,
        letter_states.ABSENT,
        letter_states.ABSENT,
      ],
    },
    {
      solucion: "MORAS",
      intento: "ROSAS",
      // R (present), O (correct), S (absent - the only S in MORAS is exact matched at the end), A (correct), S (correct)
      expected: [
        letter_states.PRESENT,
        letter_states.CORRECT,
        letter_states.ABSENT,
        letter_states.CORRECT,
        letter_states.CORRECT,
      ],
    },
  ];

  // Run through each case
  for (let i = 0; i < testCases.length; i++) {
    const { solucion, intento, expected } = testCases[i];

    // Call your function
    const result = evaluar(intento, solucion);

    // Convert arrays to strings for an easy deep equality check
    const resultStr = JSON.stringify(result);
    const expectedStr = JSON.stringify(expected);

    if (resultStr !== expectedStr) {
      // Throw error indicating exactly which one failed and what it returned vs what was expected
      throw new Error(
        `Failed at word pair: Solucion "${solucion}", Intento "${intento}".\n` +
          `Expected: ${expectedStr}\n` +
          `Got:      ${resultStr}`,
      );
    }
  }
  return true;
}

render(state_midgame);
// 3. Nothing outside render() ever touches the DOM.
console.log(evaluar("AAAAA", "SALSA"));
console.log("w : " + getWord(0));
let eval = evaluar(getWord(0), state_midgame.solucion);
setEval(0, eval);
setEval(1, evaluar(getWord(1), state_midgame.solucion));
console.log(eval);
render(state_midgame);
