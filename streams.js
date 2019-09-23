const fs = require('fs')

// const readStream = fs.createReadStream('my_huge_file.txt');
const readStream = fs.createReadStream('my_huge_file.txt', {
    highWaterMark: 64 * 512, 
    // start: 2048, 
    // end: 8192
});
const writeStream = fs.createWriteStream('my_converted_file1.txt');
let counter = 0;
readStream.on('data', function (chunk) {
    counter++
    if (!writeStream.write(chunk)) {
        writeStream.once('drain', (a,b,c) => {
            console.log('drain')
        });
    } else {
        process.nextTick((a,b,c) => {
            console.log('nextTick')
        });
    }
    // if (counter === 1000) {
    //     readStream.pipe(writeStream, {end: true})
    // }
    writeStream.write(chunk.toString().toUpperCase(), () => {
        console.log('Write completed, do more writes now. ', counter);
    });
});
writeStream.on('close', () => {
    console.log('Close ');
})

writeStream.on('error', (error) => {
    console.log('error ', error);
})

writeStream.on('finish', () => {
    console.log('finish ');
})

writeStream.on('pipe', (readStreamData) => {
    console.log('pipe ', readStreamData);
    // writeStream.destroy()
    // writeStream._final(() => {
    //     console.log('Final')
    // })
    writeStream.close(() => {
        console.log('Close 2 ');
    })
})

writeStream.on('unpipe', (readStreamData) => {
    console.log('unpipe ', readStreamData);
})

readStream.on('end', function () {
    console.log('end', writeStream)
    writeStream.end();
});



// stream with checking
// const fs = require('fs');
// const rr = fs.createReadStream('foo.txt');
// let counter = 0
// rr.on('readable', () => {
//   while (null !== (chunk = rr.read(128))) {
//     counter++
//     if (`${chunk}`.match(34)) {
//         console.log(`Received ${chunk.length} bytes of data.`);
//       } else {
//           console.log(counter, chunk.toString())
//       }
//   }
// });
// rr.on('end', () => {
//   console.log('end');
// });

// check emmiting
// const { PassThrough, Writable } = require('stream');
// const pass = new PassThrough();
// const writable = new Writable();

// pass.pipe(writable);
// // pass.unpipe(writable);
// // readableFlowing is now false.

// pass.on('data', (chunk) => { console.log(1, chunk.toString()); });
// pass.write('test');  // Will not emit 'data'.
// pass.resume();     // Must be called to make stream emit 'data'.
// pass.write('ok');
// pass.write('test');
