const express = require('express')
const app = express()
const baseUrl = "https://server"

app.get("/.well-known/openid-configuration", (req, res) => {
  const metadata = {
    issuer: `${baseUrl}`,
    token_endpoint: `${baseUrl}/token`,
    response_types_supported: ["token"]
  }
  res.json(metadata)
})


app.post("/credential", (req, res) => {})

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


app.post("/token", (req, res) => {})

app.listen(3000, () => {
  console.log(`Listening on: ${port}`)
})