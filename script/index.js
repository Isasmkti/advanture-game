  const sprite = document.getElementById("sprite");
    const arena = document.getElementById("arena");
    const buttonReset = document.getElementById("buttonReset");
    const button = document.getElementById("button");
    // const title = document.getElementsById("title");
    // const desc = document.getElementsById("desc");
    const step = 20;
    let x = 0;
    let y = 0;
    // const currentPosition = 0;

    // ukuran arena & sprite
    const arenaWidth = arena.clientWidth;
    const arenaHeight = arena.clientHeight;
    const spriteSize = sprite.clientWidth;
    const gameInit = [sprite, arena, buttonReset];
    // const titleInit = [title, desc];

    function beforePlay() {
        gameInit.map((o) => o.style.display = 'none')
    }
    beforePlay()

    function play() {
        gameInit.map((o) => o.style.display = 'block')
        button.style.display = 'none'
       
        sprite.style.left = '0'
        sprite.style.top = '0'
    }
    console.log(gameInit)


    // fungsi pembatas (CLAMP)
    function clamp(value, min, max) {
        return Math.max(min, Math.min(value, max));
    }

    function updatePosition() {
        // 🧱 BATAS X
        x = clamp(x, 0, arenaWidth - spriteSize);

        // 🧱 BATAS Y
        y = clamp(y, 0, arenaHeight - spriteSize);

        sprite.style.left = x + "px";
        sprite.style.top = y + "px";
    }

    function resetPosition() {
        x = 0;
        y = 0;
        sprite.style.left = x;
        sprite.style.top = y;
        sprite.style.transform = 'scaleX(-1)';
    }

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowRight":
                x += step;
                sprite.style.transform = 'scaleX(-1)';
                break;
            case "ArrowLeft":
                x -= step;
                sprite.style.transform = 'scaleX(1)';
                break;
            case "ArrowUp":
                y -= step;
                break;
            case "ArrowDown":
                y += step;
                break;
        }
        updatePosition();
    });

