const express = require('express')
const app = express()


app.get('/.wellxknown/openid-credential-issuer', (req, res) => {
  var metadata = {
    credential_issuer: "https://test", //TODO when hosting
    credential_endpoint: "https://test/credential",
    credential_configurations_supported: {
      "Visa": {
        format: "jwt_vc_json"
      },
      "UniversityDegree": {
        format: "jwt_vc_json"
      }
    }
  }
})

app.listen(3000, () => {
  console.log(`Listening on: ${port}`)
})