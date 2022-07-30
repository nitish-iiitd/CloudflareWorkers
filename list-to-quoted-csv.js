addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const formData = await request.formData()
  const body = {}
  for (const entry of formData.entries()) {
    body[entry[0]] = entry[1]
  }
  var input_ips = body["input_text"] 

  response = new Response(convertIPListToQuotedCSV(input_ips))
  // Set CORS headers
  //response.headers.set("Access-Control-Allow-Origin", "https://utilities.pages.dev")
  response.headers.set("Access-Control-Allow-Origin", "*")
  //console.log("reponse:"+response.text())
  return response
}

function convertIPListToQuotedCSV(input_ips){
  input_ips = input_ips.replace(/\n/g, "','");
  input_ips = input_ips.replace(/\t/g, "");
  input_ips = input_ips.replace(/\r/g, "");
  input_ips = "'" + input_ips + "'";
  return input_ips;
}

