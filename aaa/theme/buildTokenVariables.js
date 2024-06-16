import {registerTransforms} from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

export default async (vendor, tokens) => {

  const buildPath = `./theme/variables/`;

  await registerTransforms(StyleDictionary, {
    excludeParentKeys: true,
    expand: {
      typography: true
    },
  });

  const configs = [
    {
      tokens: [tokens['lara-light']],
      "platforms": {
        "scss": {
          "transformGroup": "tokens-studio",
          "transforms": ["name/kebab"],
          "buildPath": buildPath,
          "files": [
            {
              "destination": "variables-theme-light.scss",
              "format": "scss/variables"
            },
            {
              "destination": "css-variables-light.scss",
              "format": "css/variables",
              "options": {
                "showFileHeader": false,
                "selector": "html.light"
              }
            }
          ]
        }
      }
    },
    {
      tokens: tokens,
      "platforms": {
        "scss": {
          "transformGroup": "tokens-studio",
          "transforms": ["name/kebab"],
          "buildPath": buildPath,
          "files": [
            {
              "destination": "variables-theme-dark.scss",
              "format": "scss/variables"
            },
            {
              "destination": "css-variables-dark.scss",
              "format": "css/variables",
              "options": {
                "showFileHeader": false,
                "selector": "html.dark"
              }
            }
          ]
        }
      }
    }
  ];
  const promises = [];

  for (const config of configs) {
    const sd = new StyleDictionary(config);

    promises.push(sd.cleanAllPlatforms());
    promises.push(sd.buildAllPlatforms());
  }


  await Promise.all(promises)
}