const chalk = require('chalk');
const path = require('path');

// https://github.com/facebook/jest/blob/master/types/TestRunner.js
module.exports = class MyReporter {
  
  onRunComplete(contexts, results) {
    let failedTestsShown = 0;

    console.log('\r                                                   ');

    results.testResults.sort((specResultA, specResultB) => {
      const testFilePathA = specResultA.testFilePath;
      const testFilePathB = specResultB.testFilePath;

      if (testFilePathA < testFilePathB) {
        return -1
      } else if (testFilePathA > testFilePathB) {
        return 1;
      }
      return 0;
    });

    results.testResults.forEach(specResult => {
      if (specResult.skipped) return;
      if (specResult.numFailingTests === 0) return;

      let specWithHints = specResult.testResults.some(haveHints);
      
      const fileName = path.relative(path.resolve(__dirname, '..'), specResult.testFilePath);
      if (failedTestsShown === 0 || specWithHints) {
        console.log(chalk.reset.inverse.bold.red(' FAIL ') +chalk.dim(' ./')+ chalk.bold(fileName));
      }
      
      specResult.testResults.forEach(testResult => {
        if (testResult.status !== 'failed') return;
        if (failedTestsShown === 0|| haveHints(testResult)) {
          console.log(getFormattedTitle(testResult));
          failedTestsShown++;
        }

        testResult.failureMessages.forEach(failureMessage => {
          if (!failureMessage.includes("hint")) return;

          console.log(indent(removeNodeModules(failureMessage), '    '));
        });
      });
    });

    console.log(getFormattedTotals());

    function haveHints(testResult) {
      return testResult.failureMessages && testResult.failureMessages.some(fM => fM.includes("hint"));
    }

    function indent(string, indentation) {
      return indentation + string.split('\n').join('\n' + indentation);
    }

    function removeNodeModules(string) {
      return string.split('\n').filter(s => !s.includes('node_modules')).join('\n');
    }

    function getFormattedTitle(testResults) {
      return chalk.bold.red('  ● ' + [ ...testResults.ancestorTitles, testResults.title].join(' > '));
    }

    function getFormattedTotals() {
      let output = '';

      if (results.numFailedTests > failedTestsShown) {
        output += '\n' + chalk.bold('Hidden tests: ');
        output += chalk.bold.yellow(`${results.numFailedTests - failedTestsShown} failed tests hidden`);
        output += `, ${failedTestsShown} failed test shown.`
      }

      output += '\n' + chalk.bold(       'Test Suites : ');
      if (results.numFailedTestSuites) output += chalk.bold.red(`${results.numFailedTestSuites} failed, `);
      if (results.numPassedTestSuites) output += chalk.bold.green(`${results.numPassedTestSuites} passed, `);
      if (results.numPendingTestSuites) output += chalk.bold.yellow(`${results.numPendingTestSuites} pending, `);
      output += `${results.numTotalTestSuites} total`;

      output += '\n' + chalk.bold('Test        : ');
      if (results.numFailedTests) output += chalk.bold.red(`${results.numFailedTests} failed, `);
      if (results.numPassedTests) output += chalk.bold.green(`${results.numPassedTests} passed, `);
      if (results.numPendingTests) output += chalk.bold.yellow(`${results.numPendingTests} pending, `);
      output += `${results.numTotalTests} total`;

      const elapsedTime = (Date.now() - results.startTime) / 1000;
      const formattedElapsedTime = elapsedTime < 1 ? elapsedTime.toFixed(3) : elapsedTime < 10 ? elapsedTime.toFixed(1): elapsedTime.toFixed(0);
      output += '\n' + chalk.bold('Time        : ') + `${formattedElapsedTime}s`;

      if (results.numFailedTests > failedTestsShown && Math.random() > 0.6) {
        output += '\nNote: Some tests have been hidden for your convenience and help you to focus on the next important thing.';
      } else  if (results.numFailedTests > 1 && Math.random() > 0.6) {
        output += '\nNote: Rember that you can use expect("hint") in the first failing spec if you got stuck';
      }

      return output;
    }
  }
}
