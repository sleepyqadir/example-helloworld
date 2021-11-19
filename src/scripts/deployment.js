const solanaJSON = require('./solana-json.js');

(async () => {
    console.log('deploying...');
    const connection = solanaJSON.setupConnection("devnet");
    const secret = '[81,9,89,134,30,159,37,92,161,127,133,146,219,110,4,112,14,85,236,188,88,113,209,80,104,217,49,39,142,98,224,170,34,230,90,54,61,39,243,127,5,63,1,48,72,197,250,249,159,240,44,1,157,82,149,240,240,251,216,48,43,41,234,107]'
    const payerAccount = await solanaJSON.createUser(secret);
    await solanaJSON.fundUser(connection, payerAccount);

    const smartContract = {
        pathToProgram: '/home/abdulqadir/solana/example-helloworld/dist/program/helloworld.so',
        dataLayout: solanaJSON.setDataStructure(1000),
    }


    const app = await solanaJSON.loadProgram(connection, smartContract, payerAccount);
    console.log('app', app);

    const confirmationTicket = await solanaJSON.pushJSON(connection, app, '{"abc":123}', payerAccount);
    const testJSON = solanaJSON.pullJSON(connection, app.appAccount.publicKey);
    console.log(`Test: ${JSON.parse(testJSON).abc}`);
})();