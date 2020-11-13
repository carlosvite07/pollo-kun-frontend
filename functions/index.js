const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const twilio = require('twilio');

const twilioNumber = '+12028664457';

const client = new twilio(
  'AC998ae5494e59a09dc1b987e06b452fd5',
  '965849dd209c2f2f47ff1b9568cc6f1b'
);

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
