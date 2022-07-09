/**
 * @param {string} message
 * @return {Error}
 */
function generateError(message) {
  return new Error(message, {cause: 'Personalized'});
}

module.exports = generateError;
