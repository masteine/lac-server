export default async function parseResDataValues(dataValues) {
  let resParsed: any = await JSON.stringify(dataValues);
  resParsed = await JSON.parse(resParsed);
  const resParsedKeys = Object.keys(resParsed);
  return resParsedKeys.includes("data") ? resParsed.data : resParsed;
}
