export default {
  async fetch(request, env, ctx) {
    try {
      const bucket = env.amsibucket;
      const folderName = getFolderNameFromRequest(request);
      // List files in R2 folder
      const contents = await listObjectsInFolder(bucket, folderName);
      const url = new URL(request.url);
      const searchParams = url.searchParams;
      const randomObjKey = getRandomElementFromArray(contents, searchParams);
      // fetch object. random if not specified
      const object = await bucket.get(randomObjKey);
      const payload = new Response(object.body);
      return payload;
    } catch (error) { // Handle errors
      // return new Response('An error occurred: ' + error.message, {status: 500});
      return new Response(JSON.stringify({ "Error" : "Sorry nothing here!" }, null, 2), { status: 404, headers: { "content-type": "application/json;charset=UTF-8" } })
    }
  }
};
function getFolderNameFromRequest(request) {
  const {pathname} = new URL(request.url);
  return pathname.slice(1).split('/');
}
async function listObjectsInFolder(bucket, folderName) {
  const contents = [];
  const data = await bucket.list({
    prefix: folderName + '/',
    delimiter: folderName + '/'
  });
  if (data.objects) {
    for (const obj of data.objects) {
      contents.push(obj.key);
    }
  }
  return contents;
}
function getRandomElementFromArray(array, searchParams) { // Check for the payload query parameter
  const specificIndex = searchParams.get('payload');
  if (specificIndex !== null && !isNaN(specificIndex) && specificIndex >= 1 && specificIndex <= array.length) { // Return the element. adjsuting the index so it start at 1 and not 0
    return array[specificIndex - 1];
  }
  // If no query parameter, return a random element
  return array[Math.floor(Math.random() * array.length)];
}