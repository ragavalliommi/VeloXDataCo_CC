const fsPromises = require('fs').promises;

// Check if the script is being run in test mode
const isTestMode = process.env.NODE_ENV === 'test';

//command line check
if(!isTestMode && process.argv.length !== 3){
    console.error('Use: node your_script.js file_to_read.txt');
    process.exit(1);
}

//getting file name
const fileName = process.argv[2];

//step1 function
function step1(array){
    const frequencyMap = new Map();

  // Count the frequency of each element in the array
  array.forEach((element) => {
    frequencyMap.set(element, (frequencyMap.get(element) || 0) + 1);
  });

  // Sort the map keys with numbers first, followed by text in ascending order
  const sortedMap = new Map(
    [...frequencyMap].sort((a, b) => {
      const [keyA, freqA] = a;
      const [keyB, freqB] = b;

      const isANumber = !isNaN(Number(keyA));
      const isBNumber = !isNaN(Number(keyB));

      if (isANumber && isBNumber) {
        return Number(keyA) - Number(keyB);
      } else if (isANumber) {
        return -1;
      } else if (isBNumber) {
        return 1;
      } else {
        return keyA.localeCompare(keyB);
      }
    })
  );

    
    return sortedMap;
}


//step2 function
function step2(array){
    const locationMap = new Map();

  // Push index of each element in the array
  array.forEach((element, index) => {
    if (!locationMap.has(element)) {
        locationMap.set(element, [index]);
      } else {
        locationMap.get(element).push(index);
      }
  });

  // Sort the map keys with numbers first, followed by text in ascending order
  const sortedMap = new Map(
    [...locationMap].sort((a, b) => {
      const [keyA, indexA] = a;
      const [keyB, indexB] = b;

      const isANumber = !isNaN(Number(keyA));
      const isBNumber = !isNaN(Number(keyB));

      if (isANumber && isBNumber) {
        return Number(keyA) - Number(keyB);
      } else if (isANumber) {
        return -1;
      } else if (isBNumber) {
        return 1;
      } else {
        return keyA.localeCompare(keyB);
      }
    })
  );

    return sortedMap;
}

//step 3 function
function step3(step1Output, step2Output) {
    
  const combinedOutput = new Map();
  
  // Iterate through the keys of step1Output and step2Output
  const keys = new Set([...step1Output.keys(), ...step2Output.keys()]);
  keys.forEach((key) => {
    const count = step1Output.get(key) || 0;
    const indices = step2Output.get(key) || [];

    combinedOutput.set(key, { count, indices });
  });

  return combinedOutput;
}

//readFile
const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(fileName, 'utf8');
        const dataArray = data.split(',');
        const filteredDataArray = dataArray.filter((element) => {
            // Regular expression to check if the element contains a number,
            // lowercase letter, and uppercase letter
            const regex = /^[0-9a-zA-Z]+$/;
        
            return regex.test(element);
        });

        const step1Output = step1(filteredDataArray);
        const step2Output = step2(filteredDataArray);
        const step3Output = step3(step1Output, step2Output);

        if(!isTestMode){

          console.log('Data in file:');
          console.log(data);

          console.log('Step 1 Output:');
          console.log(JSON.stringify(Object.fromEntries(step1Output), null, 2));

          console.log('\nStep 2 Output:');
          console.log(JSON.stringify(Object.fromEntries(step2Output), null, 2));

          console.log('\nStep 3 Output:');
          console.log(JSON.stringify(Object.fromEntries(step3Output), null, 2));
        }
  
    }catch(err){
        console.error(err);
    }
}


if (!isTestMode) {
  fileOps();
}

module.exports = { step1 , step2, step3};