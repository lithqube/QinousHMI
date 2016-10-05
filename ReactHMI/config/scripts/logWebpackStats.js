var chalk = require('chalk');

// Some custom utilities to prettify Webpack output.
// This is a little hacky.
// It would be easier if webpack provided a rich error object.
var friendlySyntaxErrorLabel = 'Syntax error:';
function isLikelyASyntaxError(message) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

function formatMessage(message) {
  return message
    // Make some common errors shorter:
    .replace(
      // Babel syntax error
      'Module build failed: SyntaxError:',
      friendlySyntaxErrorLabel
    )
    .replace(
      // Webpack file not found error
      /Module not found: Error: Cannot resolve 'file' or 'directory'/,
      'Module not found:'
    )
    // Internal stacks are generally useless so we strip them
    .replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '') // at ... ...:x:y
    // Webpack loader names obscure CSS filenames
    .replace('./~/css-loader!./~/postcss-loader!', '');
}

module.exports = function log(stats) {
  var hasErrors = stats.hasErrors();
  var hasWarnings = stats.hasWarnings();
  var json = stats.toJson({}, true);
  var formattedErrors = json.errors.map(message =>
    'Error in ' + formatMessage(message)
  );
  var formattedWarnings = json.warnings.map(message =>
    'Warning in ' + formatMessage(message)
  );
  if (hasErrors) {
    console.log(chalk.red('Failed to compile.'));
    console.log();
    if (formattedErrors.some(isLikelyASyntaxError)) {
      // If there are any syntax errors, show just them.
      // This prevents a confusing ESLint parsing error
      // preceding a much more useful Babel syntax error.
      formattedErrors = formattedErrors.filter(isLikelyASyntaxError);
    }
    formattedErrors.forEach(message => {
      console.log(message);
      console.log();
    });
    // If errors exist, ignore warnings.
    return;
  }
  if (hasWarnings) {
    console.log(chalk.yellow('Compiled with warnings.'));
    console.log();
    formattedWarnings.forEach(message => {
      console.log(message);
      console.log();
    });
  }
}