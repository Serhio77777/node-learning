const fs = require('fs')

fs.readFile('my_huge_file.txt', (err, data) => {
    var convertedData = data.toString().toUpperCase();

    fs.writeFile('my_converted_file.txt', convertedData, () => {
        console.log('Done')
    });
});
