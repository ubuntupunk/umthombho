import { getUser } from '@netlify/identity';

export const handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { user } = JSON.parse(event.body);

    const defaultRoles = ['member'];

    return {
      statusCode: 200,
      body: JSON.stringify({
        app_metadata: {
          ...user.app_metadata,
          roles: defaultRoles
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
