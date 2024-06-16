import fs, {promises, writeFile, cp} from "fs";
import path from "node:path";
import * as sass from "sass";
import {getDistPath, getPath} from "./utils.js";

export default async function (vendor) {
  return new Promise(async resolve => {
    const pathTheme = `themes/theme-${vendor}.css`
    await promises.mkdir(path.dirname(getDistPath(pathTheme)), {recursive: true})
    const result = sass.compile(getPath(`src/index.scss`));

    // Сохраняем тему
    writeFile(getDistPath(pathTheme), result.css.toString(), (error) => {
      error ? console.debug(error) : resolve(true);
    })

    // Копируем шрифты
    fs.cp(getPath(`src/fonts`), getDistPath("themes/fonts"), {recursive: true}, () => {})
  })
}