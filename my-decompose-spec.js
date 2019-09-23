'use strict'
const { expect } = require('chai');

describe('my-decompose.selectSpecification', function () {
  it('select from merge spec', function () {
    // Assign
    const source = `(
  // Distinct merge miltiple arrays
  ...args // array of array
  // Returns: array
) => {
  const array = args[0];
  for (let i = 1; i < args.length; i++) {
    const arr = args[i];
    for (let j = 0; j < arr.length; j++) {
      const val = arr[j];
      if (!array.includes(val)) array.push(val);
    }
  }
  return array;
}`;
    const expected = `
  // Distinct merge miltiple arrays
  ...args // array of array
  // Returns: array`;
    const { selectSpecification } = require('./my-decompose');
    // Act
    let result = selectSpecification(source);
    // Assert
    expect(result).to.be.equal(expected);
  });

  it('select from section spec', function () {
    // Assign
    const source = `(
  // Splits string by the first occurrence of separator
  s, // string
  separator // string, or char
  // Example: section('All you need is JavaScript', 'is' )
  // Returns: ['All you need ', ' JavaScript']
) => {
  const i = s.indexOf(separator);
  // Hi
  if (i < 0) return [s, ''];
  return [s.slice(0, i), s.slice(i + separator.length)];
}`;
    const expected = `
  // Splits string by the first occurrence of separator
  s, // string
  separator // string, or char
  // Example: section('All you need is JavaScript', 'is' )
  // Returns: ['All you need ', ' JavaScript']`;
    const { selectSpecification } = require('./my-decompose');
    // Act
    let result = selectSpecification(source);
    // Assert
    expect(result).to.be.equal(expected);
  });
});

describe('my-decompose.parseSignature', function () {
  it('get spec from merge spec', function () {
    // Assign
    const source = `(
  // Distinct merge miltiple arrays
  ...args // array of array
  // Returns: array
) => {
  const array = args[0];
  for (let i = 1; i < args.length; i++) {
    const arr = args[i];
    for (let j = 0; j < arr.length; j++) {
      const val = arr[j];
      if (!array.includes(val)) array.push(val);
    }
  }
  return array;
}`;
    const expected = `{"title":"Distinct merge miltiple arrays","description":"","parameters":[{"name":"...args","type":"array of array","comment":""}],"comments":[{"name":"Returns","comment":"array"}]}`;
    const { parseSignature } = require('./my-decompose');
    // Act
    const signature = parseSignature(source);
    let result = JSON.stringify(signature);
    // Assert
    expect(result).to.be.equal(expected);
  });

  it('get spec from section spec', function () {
    // Assign
    const source = `(
  // Splits string by the first occurrence of separator
  s, // string
  separator // string, or char
  // Example: section('All you need is JavaScript', 'is')
  // Returns: ['All you need ', ' JavaScript']
) => {
  const i = s.indexOf(separator);
  // Hi
  if (i < 0) return [s, ''];
  return [s.slice(0, i), s.slice(i + separator.length)];
}`;
    const expected = `{"title":"Splits string by the first occurrence of separator","description":"","parameters":[{"name":"s","type":"string","comment":""},{"name":"separator","type":"string","comment":"or char"}],"comments":[{"name":"Example","comment":"section('All you need is JavaScript', 'is')"},{"name":"Returns","comment":"['All you need ', ' JavaScript']"}]}`;
    const { parseSignature } = require('./my-decompose');
    // Act
    const signature = parseSignature(source);
    let result = JSON.stringify(signature);
    // Assert
    expect(result).to.be.equal(expected);
  });
});