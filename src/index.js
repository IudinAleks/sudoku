module.exports = function solveSudoku(matrix) {
  let countNan = 0;

  function searchSqrMatrix(index) {
    if (index < 6 && index > 2) return [3, 5];
    if (index >= 6) return [6, 8];
    if (index <= 2) return [0, 2];
  }

  function difference(source, other) {
    let result = new Set();
    [...source]
      .filter((val) => !other.has(val))
      .forEach((val) => result.add(val));
    return result;
  }

  function numbsIsNot(numbStr, numbCol) {
    let set = new Set(Array(1, 2, 3, 4, 5, 6, 7, 8, 9));

    for (let i = 0; i < matrix[numbStr].length; i++) {
      if (matrix[numbStr][i] !== 0 && set.has(matrix[numbStr][i])) {
        set.delete(matrix[numbStr][i]);
      }
      if (matrix[i][numbCol] !== 0 && set.has(matrix[i][numbCol])) {
        set.delete(matrix[i][numbCol]);
      }
    }

    for (
      let i = searchSqrMatrix(numbStr)[0];
      i <= searchSqrMatrix(numbStr)[1];
      i++
    ) {
      for (
        let j = searchSqrMatrix(numbCol)[0];
        j <= searchSqrMatrix(numbCol)[1];
        j++
      ) {
        if (matrix[i][j] !== 0 && set.has(matrix[i][j]))
          set.delete(matrix[i][j]);
      }
    }
    if (set.size == 1) {
      countNan--;
      return [...set][0];
    } else return set;
  }

  function numbsSetIsNot(numbStr, numbCol) {
    let setHor = new Set();
    let setVert = new Set();
    for (let i = 0; i < matrix[0].length; i++) {
      if (typeof matrix[numbStr][i] == "number" && numbCol !== i) {
        setHor.add(matrix[numbStr][i]);
      } else if (typeof matrix[numbStr][i] != "number" && numbCol !== i) {
        matrix[numbStr][i].forEach((val) => setHor.add(val));
      }
      if (typeof matrix[i][numbCol] == "number" && numbStr !== i) {
        setVert.add(matrix[i][numbCol]);
      } else if (typeof matrix[i][numbCol] != "number" && numbStr !== i) {
        matrix[i][numbCol].forEach((val) => setVert.add(val));
      }
    }
    let resultHor = difference(matrix[numbStr][numbCol], setHor);
    if (resultHor.size === 1) {
      countNan--;
      return [...resultHor][0];
    }
    let resultVert = difference(matrix[numbStr][numbCol], setVert);
    if (resultVert.size === 1) {
      countNan--;
      return [...resultVert][0];
    }

    return matrix[numbStr][numbCol];
  }

  function delNumberIfSearch(numbStr, numbCol) {
    for (let i = 0; i < matrix[numbStr].length; i++) {
      if (
        numbCol !== i &&
        typeof matrix[numbStr][i] !== "number" &&
        matrix[numbStr][i].has(matrix[numbStr][numbCol])
      ) {
        matrix[numbStr][i].delete(matrix[numbStr][numbCol]);
      }
      if (
        numbStr !== i &&
        typeof matrix[i][numbCol] !== "number" &&
        matrix[i][numbCol].has(matrix[numbStr][numbCol])
      ) {
        matrix[i][numbCol].delete(matrix[numbStr][numbCol]);
      }
    }

    for (
      let i = searchSqrMatrix(numbStr)[0];
      i <= searchSqrMatrix(numbStr)[1];
      i++
    ) {
      for (
        let j = searchSqrMatrix(numbCol)[0];
        j <= searchSqrMatrix(numbCol)[1];
        j++
      ) {
        if (
          typeof matrix[i][j] !== "number" &&
          matrix[i][j] !== matrix[numbStr][numbCol] &&
          matrix[i][j].has(matrix[numbStr][numbCol])
        )
          matrix[i][j].delete(matrix[numbStr][numbCol]);
      }
    }
  }

  do {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (typeof matrix[i][j] !== "number") {
          matrix[i][j] = numbsSetIsNot(i, j);
          if (typeof matrix[i][j] == "number") {
            delNumberIfSearch(i, j);
          }
        }
        if (matrix[i][j] === 0) {
          countNan++;
          matrix[i][j] = numbsIsNot(i, j);
        }
      }
    }
  } while (countNan !== 0);
  return matrix;
};
