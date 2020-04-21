const mandrill = require('mandrill-api/mandrill');
const mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);

module.exports = {
  mandrill_client: mandrill_client
}
