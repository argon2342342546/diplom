export function calcPuro(data, {}, row, col) {
  let E = [],
    D = [],
    D0 = [],
    Etemp = [];

  for (let i = 0; i < row; i++) {
    Etemp[i] = [];
  }

  for (let i = 0; i < col; i++) {
    D[i] = [];
    D0[i] = [];
  }

  function ranking(x1, x2) {
    if (x1 < x2) {
      return 1;
    } else if (x1 > x2) {
      return -1;
    }

    return 0;
  }

  for (let k = 0; k < col; k++) {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < row; j++) {
        console.log(k, i, j, data[k][i], data[k][j]);
        Etemp[i][j] = ranking(parseInt(data[k][i]), parseInt(data[k][j]));
      }
    }
    E.push(Etemp);
    Etemp = [];
    for (let i = 0; i < row; i++) {
      Etemp[i] = [];
    }
  }

  for (let k = 0; k < col; k++) {
    for (let h = 0; h < col; h++) {
      let temp = 0;
      for (let i = 0; i < row; i++) {
        let temp2 = 0;
        for (let j = 0; j < row; j++) {
          temp2 = temp2 + Math.abs(E[k][i][j] - E[h][i][j]);
        }
        temp = temp + temp2;
      }
      D[k][h] = temp / 2;
    }
  }

  let med = 0;
  let sumRast = 0;
  let max = row * (row - 1);

  for (let k = 0; k < col; k++) {
    let sum = 0;
    for (let h = 0; h < col; h++) {
      sum = sum + D[k][h] * D[k][h];
      sumRast = sumRast + D[k][h];
    }
    if (med === 0) {
      med = sum;
    }
    if (sum < med) {
      med = sum;
    }
  }
  console.log("max", max);
  console.log("med", med);
  console.log("sumRast", sumRast);

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < col; j++) {
      let temp = D[i][j] / max;
      if (temp === 0) {
        D0[i][j] = 0;
      } else {
        D0[i][j] = parseFloat(temp.toFixed(2));
      }
    }
  }

  console.log("D0", D0);

  return {
    E,
    D,
    med,
    sumRast,
    D0,
  };
}
