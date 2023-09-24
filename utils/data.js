const thoughtText = [
  'I wonder if wolves dream',
  'I wonder if dogs dream',
  'I wonder if cats dream',
  'I wonder if bugs dream',
  'I wonder if birds dream',
  'I wonder if trees dream',
  'I wonder if wolves sleep',
  'I wonder if dogs sleep',
  'I wonder if cats sleep',
  'I wonder if bugs sleep',
  'I wonder if birds sleep',
  'I wonder if trees sleep',
  'I wonder if dogs dream',
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtName: getRandomArrItem(thoughtText),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

module.exports = getRandomThoughts;