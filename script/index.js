// ================== UTIL ==================
const $ = (id) => document.getElementById(id);
const delay = (ms) => new Promise(r => setTimeout(r, ms));
const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

// ================== ELEMENT ==================
const el = {
    sprite: $("sprite"),
    arena: $("arena"),
    buttonReset: $("buttonReset"),
    button: $("button"),
    title: $("title"),
    desc: $("desc"),
    message: $("message"),
    textPlace: $("textPlace"),
    messageBox: $("messageBox"),
    okButton: $("ok")
};

// ================== STATE GAME ==================
const game = {
    x: 0,
    y: 0,
    step: 20,
    spriteSize: 0,
    arenaWidth: 0,
    arenaHeight: 0,
};

// ================== INIT SIZE (biar responsif) ==================
function updateArenaSize() {
    game.arenaWidth = el.arena.clientWidth;
    game.arenaHeight = el.arena.clientHeight;
    game.spriteSize = el.sprite.clientWidth;
}

window.addEventListener("resize", updateArenaSize);
updateArenaSize();

// ================== UI CONTROL ==================
function show(elements) {
    elements.forEach(e => e.style.display = "block");
}
function hide(elements) {
    elements.forEach(e => e.style.display = "none");
}

function beforePlay() {
    hide([el.sprite, el.arena, el.buttonReset, el.messageBox]);
    show([el.title, el.desc]);
}

function play() {
    show([el.sprite, el.arena, el.buttonReset]);
    hide([el.title, el.desc, el.button]);
    resetPosition();
}

beforePlay();

// ================== POSITION ==================
function updatePosition() {
    game.x = clamp(game.x, 0, game.arenaWidth - game.spriteSize);
    game.y = clamp(game.y, 0, game.arenaHeight - game.spriteSize);

    el.sprite.style.left = game.x + "px";
    el.sprite.style.top = game.y + "px";
}

function resetPosition() {
    game.x = 0;
    game.y = 0;
    el.sprite.style.transform = "scaleX(-1)";
    updatePosition();
}

// ================== MOVEMENT ==================
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowRight":
            game.x += game.step;
            flip(-1);
            break;
        case "ArrowLeft":
            game.x -= game.step;
            flip(1);
            break;
        case "ArrowUp":
            game.y -= game.step;
            break;
        case "ArrowDown":
            game.y += game.step;
            break;
    }
    updatePosition();
});

function flip(dir) {
    el.sprite.style.transform = `scaleX(${dir})`;
    el.message.style.transform = `scaleX(${dir})`;
}

// ================== DIALOG CHARACTER ==================
el.message.style.display = "none";
async function charOnClick() {
  // tampilkan dialog box
  show([el.messageBox]);
  el.textPlace.value = "";
  el.textPlace.focus();

  // tunggu tombol OK
  const name = await waitForOk();

  if (!name) {
    hide([el.messageBox]);
    return;
  }

  hide([el.messageBox]);

  el.message.textContent = `Hello ${name}!`;
  el.message.style.display = "block";

  await delay(3000);
  el.message.style.display = "none";
}

function waitForOk() {
  return new Promise((resolve) => {
    function handleClick() {
      const value = el.textPlace.value.trim();
      el.okButton.removeEventListener("click", handleClick); // biar ga numpuk
      resolve(value);
    }

    el.okButton.addEventListener("click", handleClick);
  });
}


el.sprite.addEventListener("click", charOnClick);
