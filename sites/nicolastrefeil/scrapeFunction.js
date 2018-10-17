import { getCleanData } from "../../scraper/utils";

export default function scrapeFunction(jsDoc) {
  const tableClass = "webs-table";
  const tables = jsDoc.getElementsByClassName(tableClass);
  const players = Array.from(tables).map(table => {
    const [tHead, ...tRows] = table.children;
    const player = {};
    const [name, ...propNames] = tHead.children[0].children;
    player.name = getCleanData(name);
    player.setups = Array.from(tRows).map(setup => {
      const setupRow = setup.children[0];
      const setupProps = {};
      propNames
        .map(propName => {
          const cleanedPropName = getCleanData(propName).toLowerCase();
          return cleanedPropName;
        })
        .forEach((propName, index) => {
          const cleanPropValue = getCleanData(setupRow.children[index + 1]);
          if (cleanPropValue && cleanPropValue.length && cleanPropValue !== ".") {
            setupProps[propName.toLowerCase()] = cleanPropValue;
          }
        });
      return setupProps;
    });
    return player;
  });
  return {
    players
  };
}
