const muscles = {
  chest: {
    name: "胸",
    left: { size: 1, exercises: ["左ベンチプレス", "左腕立て伏せ"] },
    right: { size: 1, exercises: ["右ベンチプレス", "右腕立て伏せ"] }
  },
  arms: {
    name: "腕",
    left: { size: 1, exercises: ["左ダンベルカール"] },
    right: { size: 1, exercises: ["右ダンベルカール"] }
  },
  legs: {
    name: "脚",
    left: { size: 1, exercises: ["左片足スクワット"] },
    right: { size: 1, exercises: ["右片足スクワット"] }
  }
};

let currentMuscle = null;
let currentSide = null;

const muscleButtons = document.getElementById("muscle-buttons");
const sideButtons = document.getElementById("side-buttons");
const exerciseButtons = document.getElementById("exercise-buttons");

const currentMuscleEl = document.getElementById("current-muscle");
const currentSideEl = document.getElementById("current-side");
const currentSizeEl = document.getElementById("current-size");

const characterEl = document.getElementById("character");

// 部位ボタン生成
Object.keys(muscles).forEach(key => {
  const btn = document.createElement("button");
  btn.textContent = muscles[key].name;
  btn.onclick = () => selectMuscle(key);
  muscleButtons.appendChild(btn);
});

function selectMuscle(key) {
  currentMuscle = key;
  currentMuscleEl.textContent = muscles[key].name;

  // 左右ボタン生成
  sideButtons.innerHTML = "";
  ["left", "right"].forEach(side => {
    const btn = document.createElement("button");
    btn.textContent = side === "left" ? "左" : "右";
    btn.onclick = () => selectSide(side);
    sideButtons.appendChild(btn);
  });

  exerciseButtons.innerHTML = "";
  currentSideEl.textContent = "-";
  currentSizeEl.textContent = "-";
}

function selectSide(side) {
  currentSide = side;
  currentSideEl.textContent = side === "left" ? "左" : "右";

  const data = muscles[currentMuscle][side];
  currentSizeEl.textContent = data.size;

  // 種目ボタン生成
  exerciseButtons.innerHTML = "";
  data.exercises.forEach(ex => {
    const btn = document.createElement("button");
    btn.textContent = ex;
    btn.onclick = () => train(currentMuscle, side);
    exerciseButtons.appendChild(btn);
  });

  updateCharacter();
}

function train(muscle, side) {
  muscles[muscle][side].size++;
  currentSizeEl.textContent = muscles[muscle][side].size;
  updateCharacter();
}

function updateCharacter() {
  // 今は「腕」の左右サイズをキャラに反映
  const leftSize = muscles.arms.left.size;
  const rightSize = muscles.arms.right.size;

  characterEl.style.setProperty("--left-size", leftSize);
  characterEl.style.setProperty("--right-size", rightSize);
}
