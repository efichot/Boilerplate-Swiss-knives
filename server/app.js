import { Connect, SimpleSigner } from 'uport-connect'

const uport = new Connect('Etienne first app', {
    clientId: '2oqvGrYUVjf2yBtf49SPRrRTQhjuW9GYVjo', //uportID
    network: 'rinkeby',
    signer: SimpleSigner('43e07c070e66bc33ad7879fe35e3ccb5110fc2865477e4ae82dd25908d4e2df2') //Private Key
})

// Request credentials to login
uport.requestCredentials({
    requested: ['name', 'phone', 'country'],
    notifications: true // We want this if we want to recieve credentials
})
.then((credentials) => {
    // Do something
    console.log(credentials);
})

// Attest specific credentials
uport.attestCredentials({
    sub: THE_RECEIVING_UPORT_ADDRESS,
    claim: {
    CREDENTIAL_NAME: CREDENTIAL_VALUE
    },
    exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
})