import {promises} from "fs";
import {buildTypography} from "./buildTypography.js";
import buildTokenVariables from "./buildTokenVariables.js";
import saveTheme from "./saveTheme.js";
import fs from "fs";
import {getPath} from "./utils.js";
import _ from "lodash";

const getTokens = async function (path) {
  const text = await promises.readFile(path, "utf-8");

  // BUG FIX Токен фигма отдает json в некоторых случаях c пробелами перед символом "*" или после, из-за чего не срабатывает
  // трансормация значений по правилу ts/resolveMath
  const regex = /(\S)\s*\*\s*(\S)/g;
  const newText = text.replace(regex, "$1 * $2");

  return JSON.parse(newText);
};

const buildTheme = async function(vendor, tokens) {
  await buildTokenVariables(vendor, tokens);
  await buildTypography(vendor, tokens["lara-light"]).finally(() => console.debug(`${vendor} - typography ok`));
  await saveTheme(vendor).finally(() => console.debug(`${vendor} - theme ok`));
  await fs.rmSync( getPath("variables"), { recursive: true, force: true });
};

export const startBuildTheme = async () => {
  // Собираем базовую тему
  await buildTheme("base", await getTokens(getPath("src/tokens.json")));
  
  // Получаем все токены кастомных тем
  const vendors = fs.readdirSync(getPath("custom"), { withFileTypes: false });


  for(const vendor of vendors) {
    const tokensBase = await getTokens(getPath("src/tokens.json"));
    const tokensCustom = await getTokens(getPath(`custom/${vendor}/tokens.json`));

    const tokensMerge = _.merge(
      tokensBase,
      tokensCustom
    );

    await buildTheme(vendor, tokensMerge);
  }
};


export default startBuildTheme();
