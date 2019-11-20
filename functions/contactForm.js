var AWS = require('aws-sdk')

var ses = new AWS.SES();
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
},

module.exports.submit = (event, context, cb) => {

  try {
    var { fromAddress, toAddress, message, subject } = JSON.parse(event.body)
  } catch (e) {
    return cb(null, {
      statusCode: 500,
      body: 'Error parsing request',
      headers: corsHeaders
    })
  }

  var params = {
      Destination: {
          BccAddresses: [],
          CcAddresses: [
            fromAddress
          ],
          ToAddresses: [
            toAddress
          ]
      },
      Message: {
          Body: {
              Html: {
                  Charset: "UTF-8",
                  Data: `${ message } <br/><br/><hr/>Sent via the contact form at volleystudio.us`
              },
              Text: {
                  Charset: "UTF-8",
                  Data: message
              }
          },
          Subject: {
              Charset: "UTF-8",
              Data: subject
          }
      },
      Source: fromAddress
    };
    ses.sendEmail(params, function(err, data) {
        if (err) {
          console.log(err);
          return cb(null, {
            statusCode: 500,
            body: 'Error sending message',
            headers: corsHeaders
          })
        }
        cb(null, {
          statusCode: 200,
          body: 'Success',
          headers: corsHeaders
        })
    });
}
