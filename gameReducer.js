var GAME_ACTIONS = {
  pressKey: "PRESS_KEY",
  releaseKey: "RELEASE_KEY",
  movePlayer: "MOVE_PLAYER",
  addWall: "ADD_WALL",
  addPlayer: "ADD_PLAYER"
}

var INITIAL_GAME_STATE = {
  pressedKeys: [],
  player: null,
  walls: []
};

function gameReducer(state = INITIAL_GAME_STATE, action) {
  switch (action.type) {
  case GAME_ACTIONS.pressKey:
    if (state.pressedKeys.includes(action.value)) { return state; }
    var pressedKeys = [...state.pressedKeys, action.value];
    var playerAngle = getRadianFromKeyboardKeys(pressedKeys);
    var player = { ...state.player, angle: playerAngle }
    return { ...state, pressedKeys, player  };
  case GAME_ACTIONS.releaseKey:
    var pressedKeys = state.pressedKeys.filter(key => key !== action.value);
    var playerAngle = getRadianFromKeyboardKeys(pressedKeys);
    var player = { ...state.player, angle: playerAngle }
    return { ...state, pressedKeys, player  };
  case GAME_ACTIONS.movePlayer:
    var player = { ...state.player, x: state.player.x + action.vx, y: state.player.y + action.vy }
    return { ...state, player };
  case GAME_ACTIONS.addWall:
    return { ...state, walls: [...state.walls, action.wall] }
  case GAME_ACTIONS.addPlayer:
    return { ...state, player: action.player }
  default:
    return state
  }
}
