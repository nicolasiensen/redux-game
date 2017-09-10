var FPS = 60;

window.onload = function() {
  var store = Redux.createStore(gameReducer);

  var scene = document.createElement("div");
  scene.style.position = "relative";
  document.body.appendChild(scene);

  for (var i = 0; i < 100; i++) {
    var wall = {
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      width: 40,
      height: 40
    }

    store.dispatch({ type: GAME_ACTIONS.addWall, wall });

    var wallElement = document.createElement("div");
    wallElement.style.position = "absolute";
    wallElement.style.backgroundColor = "green";
    wallElement.style.left = toPX(wall.x);
    wallElement.style.top = toPX(wall.y);
    wallElement.style.height = toPX(wall.height);
    wallElement.style.width = toPX(wall.width);
    scene.appendChild(wallElement);
  }

  var player = {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    velocity: 200,
    angle: null
  }

  store.dispatch({ type: GAME_ACTIONS.addPlayer, player });

  var playerElement = document.createElement("div");
  playerElement.id = "player";
  playerElement.style.position = "absolute";
  playerElement.style.height = toPX(player.height);
  playerElement.style.width = toPX(player.width);
  playerElement.style.backgroundColor = "red";
  playerElement.style.left = toPX(player.x);
  playerElement.style.top = toPX(player.y);
  scene.appendChild(playerElement);

  store.subscribe(() => {
    console.log(store.getState());

    var { player } = store.getState();
    var playerElement = document.getElementById("player");

    playerElement.style.left = toPX(player.x);
    playerElement.style.top = toPX(player.y);
    playerElement.style.transform = "rotate(" + player.angle + "rad)";
  });

  window.addEventListener("keydown", e => store.dispatch({ type: GAME_ACTIONS.pressKey, value: e.key }));
  window.addEventListener("keyup", e => store.dispatch({ type: GAME_ACTIONS.releaseKey, value: e.key }));

  setInterval(function() {
    var { player, walls } = store.getState();

    if (player.angle !== null) {
      var vx = (player.velocity/FPS) * Math.cos(player.angle);
      var vy = (player.velocity/FPS) * Math.sin(player.angle);
      var collided = false;

      for (var i = 0; i < walls.length; i++) {
        if (
          player.x + vx < walls[i].x + walls[i].width &&
          player.x + vx + player.width > walls[i].x &&
          player.y + vy < walls[i].y + walls[i].height &&
          player.y + vy + player.height > walls[i].y
        ) { collided = true }
      }

      if (!collided) {
        store.dispatch({ type: GAME_ACTIONS.movePlayer, vx, vy });
      }
    }
  }, 1000/FPS)
};
