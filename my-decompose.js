'use strict';

const section = (
  // Splits string by the first occurrence of separator
  s, // string
  separator // string, or char
  // Example: section('All you need is JavaScript', 'is')
  // Returns: ['All you need ', ' JavaScript']
) => {
  const i = s.indexOf(separator);
  if (i < 0) return [s, ''];
  return [s.slice(0, i), s.slice(i + separator.length)];
};

const selectSpecification = text => {
  const textBetweenRoundedBrackets = /(?<=^\(\s*).*?(?=\s*\)\s*(=>)*\s*\{)/gs;
  return text.match(textBetweenRoundedBrackets).join();
};
module.exports.selectSpecification = selectSpecification;

const trim = text => text.trim();

const isComment = line => line.trimLeft().startsWith('//');
const isNotComment = line => !isComment(line);
const unComment = line => {
  const length = '//'.length;
  return isComment(line) ?
    line.trimLeft().substring(length) :
    line;
};

const isEmpty = text => text ? false : true;
const isNotEmpty = text => text ? true : false;

const isNotStartsWithNamed = line => {
  const NAMED_LINES = ['Example:', 'Returns:', 'Hint:', 'Result:'];
  const finded = NAMED_LINES.find(item => line.startsWith(item));
  return isEmpty(finded);
};

const parseParameterDescription = line => {
  const [name, text] = section(line, '//');
  let [type, comment] = section(text, ',');
  return {
    name: name.replace(',', '').trim(),
    type: unComment(type).trim(),
    comment: comment.trim()
  };
};

const parseCommentDescription = line => {
  const [name, comment] = section(line, ':');
  return {
    name: unComment(name).trim(),
    comment: comment.trim()
  };
};

const parseSignature = fn => {
  const specification = selectSpecification(fn);

  const lines = specification
    .split('\n')
    .map(trim)
    .filter(isNotEmpty);

  const descriptions = lines
    .filter(isComment)
    .map(unComment)
    .map(trim)
    .filter(isNotStartsWithNamed);

  const title = descriptions
    .slice(0, 1)
    .join()
    .trim();

  const description = descriptions
    .slice(1)
    .join('\n');

  const parameters = lines
    .slice(descriptions.length)
    .filter(isNotComment)
    .map(parseParameterDescription);

  const comments = lines
    .slice(descriptions.length + parameters.length)
    .map(parseCommentDescription);

  return {
    title,
    description,
    parameters,
    comments
  };
};
module.exports.parseSignature = parseSignature;

const ispect = (
  // Introspect interface
  namespace // hash of interfaces
  // Returns: hash of hash of record, { method, title, parameters }
) => {
  const inventory = {};
  for (const name in namespace) {
    const iface = namespace[name];
    const methods = {};
    inventory[name] = methods;
    for (const method in iface) {
      const fn = iface[method].toString();
      const signature = parseSignature(fn);
      methods[method] = Object.assign({
        method: name + '.' + method
      }, signature);
    }
  }
  return inventory;
};
module.exports.ispect = ispect;