function getRadianFromKeyboardKeys(keys) {
  if (keys.includes("ArrowUp")) {
    if (keys.includes("ArrowRight")) {
      return 7/4*Math.PI;
    } else if (keys.includes("ArrowLeft")) {
      return 5/4*Math.PI;
    }
    return 3/2*Math.PI;
  } else if (keys.includes("ArrowDown")) {
    if (keys.includes("ArrowRight")) {
      return 1/4*Math.PI;
    } else if (keys.includes("ArrowLeft")) {
      return 3/4*Math.PI;
    }
    return 1/2*Math.PI;
  } else if (keys.includes("ArrowRight")) {
    return 2*Math.PI;
  } else if (keys.includes("ArrowLeft")) {
    return Math.PI;
  }
  return null;
}

function toPX(number) {
  return number + "px";
}
