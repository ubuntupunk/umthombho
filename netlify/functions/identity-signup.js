exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { user } = JSON.parse(event.body);

    const defaultRole = 'member';

    return {
      statusCode: 200,
      body: JSON.stringify({
        app_metadata: {
          roles: [defaultRole]
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
