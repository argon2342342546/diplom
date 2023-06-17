export function calc(data, { Ep, Eg, Eh, Es }, length) {
  const P11 = [],
    P10 = [],
    P01 = [],
    S = [],
    H = [],
    G = [],
    P0 = [],
    G0 = [],
    S0 = [],
    H0 = [];

  for (let i = 0; i < length; i++) {
    P11[i] = [];
    P10[i] = [];
    P01[i] = [];
    S[i] = [];
    H[i] = [];
    G[i] = [];
    P0[i] = [];
    G0[i] = [];
    S0[i] = [];
    H0[i] = [];
  }

  function intersection(x1, x2) {
    let count = 0;  

    for (let i = 0; i < x1.length; i++) {
      if (x1[i] == x2[i]) {
        count = count + 1;
      }
    }

    return count;
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      P11[i][j] = intersection(data[i], data[j]);
    }
  }

  function diff(x1, x2) {
    let count = 0;

    for (let i = 0; i < x1.length; i++) {
      if (x1[i] != x2[i]) {
        count = count + 1;
      }
    }

    return count;
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      P10[i][j] = diff(data[i], data[j]);
    }
  }

  function sim_diff(x1, x2) {
    let count = 0;

    for (let i = 0; i < x1.length; i++) {
      if (x1[i] == 0 && x2[i] == 1) {
        count = count + 1;
      }
    }

    return count;
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      P01[i][j] = sim_diff(data[i], data[j]);
    }
  }

  function mismatches(p01, p11, p10) {
    return p01 / (p11 + p10);
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      S[i][j] = mismatches(P01[i][j], P11[i][j], P10[i][j]);
    }
  }

  function acquisitions(p11, p10) {
    return p11 / (p11 + p10);
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      H[i][j] = acquisitions(P11[i][j], P10[i][j]);
    }
  }

  function jacquard(p11, p10, p01) {
    return p11 / (p11 + p10 + p01);
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      G[i][j] = jacquard(P11[i][j], P10[i][j], P01[i][j]);
    }
  }

  function intersectionZero(v, i, j) {
    if (v <= Ep && i != j) {
      return 1;
    } else {
      return 0;
    }
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      P0[i][j] = intersectionZero(P01[i][j], i, j);
    }
  }

  function jacquardZero(v, i, j) {
    if (v >= Eg && i != j) {
      return 1;
    } else {
      return 0;
    }
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      G0[i][j] = jacquardZero(G[i][j], i, j);
    }
  }

  function mismatchesZero(v, i, j) {
    if (v <= Es && i != j) {
      return 1;
    } else {
      return 0;
    }
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      S0[i][j] = mismatchesZero(S[i][j], i, j);
    }
  }

  function acquisitionsZero(v, i, j) {
    if (v >= Eh && i != j) {
      return 1;
    } else {
      return 0;
    }
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      H0[i][j] = acquisitionsZero(H[i][j], i, j);
    }
  }

  return { P11, P10, P01, S, H, G, P0, G0, S0, H0 };
}
