export const transform_number = (num) => {
  if (num < 1000) {
    return num.toString(); // Menos de mil, se devuelve tal cual
  } else if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K"; // Entre mil y un millón, en formato "X.XK"
  } else {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M"; // Un millón o más, en formato "X.XM"
  }
};
