"use strict";

var solanaJSON = require('./solana-json.js');

(function _callee() {
  var connection, payerAccount, smartContract, app, confirmationTicket, testJSON;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('deploying...');
          connection = solanaJSON.setupConnection("devnet");
          _context.next = 4;
          return regeneratorRuntime.awrap(solanaJSON.createUser());

        case 4:
          payerAccount = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(solanaJSON.fundUser(connection, payerAccount));

        case 7:
          smartContract = {
            pathToProgram: '/home/abdulqadir/solana/example-helloworld/dist/program/helloworld.so',
            dataLayout: solanaJSON.setDataStructure(1000)
          };
          _context.next = 10;
          return regeneratorRuntime.awrap(solanaJSON.loadProgram(connection, smartContract, payerAccount));

        case 10:
          app = _context.sent;
          console.log('app', app);
          _context.next = 14;
          return regeneratorRuntime.awrap(solanaJSON.pushJSON(connection, app, '{"abc":123}'));

        case 14:
          confirmationTicket = _context.sent;
          testJSON = solanaJSON.pullJSON(connection, app.appAccount.publicKey);
          console.log("Test: ".concat(JSON.parse(testJSON).abc));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
})();