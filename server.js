const express = require('express')
const app = express()
const baseUrl = "http://10.0.2.2:3000"

var sessionIds = []

const ENC = 'base64'

app.use(express.urlencoded());

app.get("/.well-known/openid-configuration", (req, res) => {
  const metadata = {
    issuer: `${baseUrl}`,

    token_endpoint: `${baseUrl}/token`,
    response_types_supported: []
  }
  res.json(metadata)
})

app.post("/credential", (req, res) => {})

app.post("/token", (req, res) => {

  var preauth = req.body['pre-authorized_code']
  var payload = JSON.parse(Buffer.from(preauth.split('.')[1], ENC).toString());

  console.log(preauth)

  if ((payload.aud === "TOKEN" || payload.iss === baseUrl) && sessionIds.includes(payload.sub)) {
    payload.aud = "ACCESS"
    let accessBearerToken = preauth.split('.')[0] + '.' + Buffer.from(JSON.stringify(payload)).toString(ENC) + '.' + preauth.split('.')[2] //placeholder

    
    let index = sessionIds.indexOf(payload.sub)
    sessionIds.splice(index, 1)
    
    res.json({access_token: accessBearerToken, token_type: "Bearer"})












  }
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