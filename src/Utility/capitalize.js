const capitalize = (string) => {
  string = string.trimStart();
  if (string.length > 0) {
    const words = string.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 0) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
      }
    }
    return words.join(" ");
  }
};

export default capitalize;
