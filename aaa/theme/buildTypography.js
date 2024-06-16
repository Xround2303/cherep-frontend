import {promises, writeFile} from "fs";

const buildClassString = function (tokens) {
  let classString = "";

  const recursiveCheck = (obj, parentKey) => {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        recursiveCheck(obj[key], parentKey ? `${parentKey}-${key}` : `${key}` );
      } else if(key === 'type' && obj[key] === 'typography' && typeof obj['value'] === 'object'){
        classString += `
          .${parentKey} {
            font-size: var(--${parentKey}-font-size);
            font-weight: var(--${parentKey}-font-weight);
            line-height: var(--${parentKey}-line-height);
          }\n 
        `
      }
    });
  }

  recursiveCheck(tokens);

  return classString;
}



export const buildTypography = async function (vendor, tokens) {
  return new Promise(resolve => {
    const text = buildClassString(tokens);

    return writeFile(`./theme/variables/class-typography.scss`,  text, (error) => {
      error ? console.debug(error) : resolve(true);
    })
  })
}

