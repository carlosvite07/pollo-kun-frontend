const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const twilio = require('twilio');

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const twilioNumber = functions.config().twilio.phone;

const client = new twilio(accountSid, authToken);

exports.sendSMS = functions.firestore
  .document('emergencies/{emergencyId}')
  .onCreate((change, context) => {
    console.log('test');
    const textMessage = {
      body: 'Emergencia en el pollo kun',
      to: '+5215516218679',
      from: twilioNumber
    };
    client.messages.create(textMessage);
  });
