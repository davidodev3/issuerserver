const express = require('express')
const app = express()
const baseUrl = "http://10.0.2.2:3000"

var sessionIds = []

app.use(express.urlencoded());

app.get("/.well-known/openid-configuration", (req, res) => {
  const metadata = {
    issuer: `${baseUrl}`,
    token_endpoint: `${baseUrl}/token`,
    response_types_supported: ["token"]

  }
  res.json(metadata)
})

app.post("/credential", (req, res) => {})

app.post("/token", (req, res) => {
  var preauth = req.body['pre-authorized_code']
  var payload = JSON.parse(Buffer.from(preauth.split('.')[1], 'base64').toString());

  if (payload.aud === "TOKEN" || payload.iss === baseUrl) res.send("access")
})

app.get('/.well-known/openid-credential-issuer', (req, res) => {
  const metadata = {
    credential_issuer: `${baseUrl}`, //TODO when hosting

    credential_configurations_supported: {
      "Visa": {
        format: "jwt_vc_json"
      },
      "UniversityDegree": {
        format: "jwt_vc_json"
      }
    },
    credential_endpoint: `${baseUrl}/credential`,
  }
  res.json(metadata)
})






app.post("/session", (req, res) => {
  sessionIds.push(req.body.session)
  res.end("Session added correctly.")
})

app.listen(3000, () => {
  console.log(`Listening on: 3000`)
}) 