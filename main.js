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
  intentos: ["CASAS", "TERMO"],
  actual: "PE",
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

function getBox(row, col) {
  return boxes[row * N_COLS + col];
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
function render(state) {
  /* ... */
  boxes = document.querySelectorAll(".letter-box");
  console.log(getBox(0, 0));
  console.log(state.intentos.length);
  let n_intentos = state.intentos.length;
  for (let i = 0; i < n_intentos; ++i) {
    setRow(state.intentos[i], i);
  }
  let pos_actual = n_intentos;
  setRow(state.actual, pos_actual);
}
// 3. Nothing outside render() ever touches the DOM.
render(state_midgame);
console.log(evaluar("AAAAA", "SALSA"));
