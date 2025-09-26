# Authorization Server
This is a support Authorization Server for Verifiable Credential Issuance. Please refer to the main project at [thesiswallet](https://github.com/davidodev3/thesiswallet).


## Installation
Clone this repository. Run "npm start" on the shell to install dependencies and run the server.

### Changing the port
By default the server listens on port 3000. If you want to change that modify line 70 of `server.js`.

## `config.json`
Before running, update the file with the JWK of the private and public key of the Issuer app. To do so, run the mobile Issuer and press "Copy JWK". Paste the JWK in the `jwk` field, then remove the `d` parameter from the JWK and paste that in the `public` field (refer to the config file provided with this repository). As a demo project this was intended for simplicity, in a real application you would want to hide this file.


## License
This project uses the [jose](https://github.com/panva/jose) library, licensed under the MIT License (©2018 Filip Skokan).
