const express = require('express')
const jose = require('jose')
const app = express()

const baseUrl = "http://10.0.2.2:3000"

var sessionIds = []

const ENC = 'base64'
const config = require('./config.json')
const private = jose.importJWK(config.jwk, 'Ed25519')
const public = jose.importJWK(config.public, 'Ed25519')

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

app.post("/token", async (req, res) => {

  let preauth = req.body['pre-authorized_code']
  let {payload, protectedHeader} = await jose.jwtVerify(preauth, await public)

  console.log(preauth)

  if ((payload.aud === "TOKEN" || payload.iss === baseUrl) && sessionIds.includes(payload.sub)) {
    payload.aud = "ACCESS"
    //let accessBearerToken = preauth.split('.')[0] + '.' + Buffer.from(JSON.stringify(payload)).toString(ENC) + '.' + preauth.split('.')[2] //placeholder
    let accessBearerToken = await new jose.SignJWT(payload).setProtectedHeader(protectedHeader).sign(private)
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