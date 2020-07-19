const sortColor = () => {
  const colors = [
    '#8FBC8F',
    '#1E90FF',
    '#B0C4DE',
    '#20B2AA',
    '#EEDD82',
    '#6495ED',
    '#DDA0DD',
    '#CD853F',
    '#FFEFD5',
    '#F0FFF0',
  ];
  const rand = colors[Math.floor(Math.random() * colors.length)];
  return rand;
};

export default sortColor;
