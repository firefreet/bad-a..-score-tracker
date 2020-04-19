const { mandrill_client } = require('../config/mandrillConfig');

module.exports = {
  send: function (req, res) {
    console.log('in send function');
    console.log(req.body);

    let contact = req.body
    
    var template_name = "college_coaching_contact";
    var template_content = [{
      "name": "main",
      "content": 'input into mcedit:main'
    }];

    var message = {
      "subject": `Contact from ${contact.firstName} ${contact.lastName}`,
      "from_email": "contact@satprepct.com",
      "from_name": contact.firstName + " " + contact.lastName,
      "to": [{
        "email": contact.email,
        "name": contact.firstName + " " + contact.lastName,
        "type": "to"
      }],
      "headers": {
        "Reply-To": contact.email
      },
      "important": false,
      "track_opens": true,
      "track_clicks": true,
      "auto_text": null,
      "auto_html": null,
      "inline_css": null,
      "url_strip_qs": null,
      "preserve_recipients": null,
      "view_content_link": null,
      "bcc_address": "",
      "tracking_domain": null,
      "signing_domain": null,
      "return_path_domain": null,
      "merge": true,
      "merge_language": "mailchimp",
      "global_merge_vars": [{
        "name": "merge1",
        "content": "merge1 content"
      }],
      "merge_vars": [{
        "rcpt": contact.email,
        "vars": [
          {
            "name": "NAME",
            "content": contact.firstName + " " + contact.lastName
          },
          {
            "name": "EMAIL",
            "content": contact.email
          },
          {
            "name": "MESSAGE",
            "content": contact.message
          }
        ]
      }],
      "tags": [
        "college_coaching_contact"
      ]
    };

    var async = false;
    var ip_pool = "Main Pool";
    var send_at = new Date().toUTCString();

    mandrill_client.messages.sendTemplate(
      {
        "template_name": template_name,
        "template_content": template_content,
        "message": message,
        "async": async,
        "ip_pool": ip_pool,
        "send_at": send_at
      },
      function (result) {
        console.log(result);
        res.status(200).json(result);
      }, function (e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        res.status(503).json(e);
      }
    );
  }
};