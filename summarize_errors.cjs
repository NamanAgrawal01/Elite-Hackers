const fs = require('fs');
const results = JSON.parse(fs.readFileSync('lint_results.json', 'utf8'));

const errorsByRule = {};
const errorsByFile = {};

results.forEach(result => {
    result.messages.forEach(msg => {
        const ruleId = msg.ruleId || 'unknown';
        errorsByRule[ruleId] = (errorsByRule[ruleId] || 0) + 1;
        
        errorsByFile[result.filePath] = (errorsByFile[result.filePath] || 0) + 1;
    });
});

console.log('Errors by Rule:');
console.log(JSON.stringify(errorsByRule, null, 2));

console.log('\nTop 10 Files with Errors:');
const topFiles = Object.entries(errorsByFile)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
console.log(JSON.stringify(topFiles, null, 2));
