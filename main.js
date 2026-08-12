// 1. ALL state lives in one object. One.
const state = {
  solucion: "PERRO",
  intentos: ["CASAS", "TERMO"],
  actual: "PE",
  estado: "jugando",
  mensaje: "",
};
// 2. ONE function paints the entire DOM from that state.
let boxes;
const N_COLS = 5;
const N_ROWS = 6;

function getBox(col, row) {
  return boxes[row * N_COLS + col];
}
function render(state) {
  /* ... */
  boxes = document.querySelectorAll(".letter-box");
  console.log(getBox(0, 0));
}
// 3. Nothing outside render() ever touches the DOM.
render();
