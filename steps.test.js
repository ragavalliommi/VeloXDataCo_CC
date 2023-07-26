const { expect } = require('chai');
const { step1, step2, step3 } = require('./index'); // Replace with the actual path to your functions

describe('step1 function', () => {
    
  it('should count the frequency of elements in the input array', () => {
    const inputArray = [1, 2, 1, 1, 3, 'hello', 4, 1, 2, 'hello', 'text'];
    const outputObject = step1(inputArray);

    const outputObjectNew = Object.fromEntries(outputObject);
    expect(outputObjectNew).to.deep.equal({
      "1": 4,
      "2": 2,
      "3": 1,
      "4": 1,
      "hello": 2,
      "text": 1
    });
  });
});


describe('step2 function', () => {
  it('should record the indices of each matching item in the original input array', () => {
    const inputArray = [1, 2, 1, 1, 3, 'hello', 4, 1, 2, 'hello', 'text'];
    const outputMap = step2(inputArray);
  // Convert the Map to a plain JavaScript object for easier comparison
  const outputObject = Object.fromEntries(outputMap);

  expect(outputObject).to.deep.equal({
     "1": [0, 2, 3, 7],
      "2": [1, 8],
      "3": [4],
      "4": [6],
      "hello": [5, 9],
      "text": [10]
  });
  });
});


describe('step3 function', () => {
  it('should combine the outputs of step1 and step2 into a single output with count and indices', () => {

    const inputArray = [1, 2, 1, 1, 3, 'hello', 4, 1, 2, 'hello', 'text'];
    const step1Output = step1(inputArray);
    const step2Output = step2(inputArray);

    const combinedOutput = step3(step1Output, step2Output);

    // Convert the Map to a plain JavaScript object for easier comparison
  const combinedOutputNew = Object.fromEntries(combinedOutput);

    expect(combinedOutputNew).to.deep.equal({
      "1": { count: 4, indices: [0, 2, 3, 7] },
      "2": { count: 2, indices: [1, 8] },
      "3": { count: 1, indices: [4] },
      "4": { count: 1, indices: [6] },
      "hello": { count: 2, indices: [5, 9] },
      "text": { count: 1, indices: [10] }
    });
  });
});
