var AWS = require('aws-sdk')

var ses = new AWS.SES();

module.exports.submit = (event, context, cb) => {


    var params = {
        Destination: {
            BccAddresses: [],
            CcAddresses: [],
            ToAddresses: [
              "colton@coltonbrown.co"
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: "This message body contains HTML formatting. It can, for example, contain links like this one: <a class=\"ulink\" href=\"http://docs.aws.amazon.com/ses/latest/DeveloperGuide\" target=\"_blank\">Amazon SES Developer Guide</a>."
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "This is the message body in text format."
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Test email"
            }
        },
        Source: "colton@coltonbrown.co"
    };
    ses.sendEmail(params, function(err, data) {
        if (err) {
          console.log(err);
          return cb(null, {
            statusCode: 500,
            body: 'Error sending message'
          })
        }
        cb(null, {
          statusCode: 200,
          body: 'Success'
        })
    });
}
