import {redirect} from '@shopify/remix-oxygen';

export async function loader({context, request}) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) {
    return redirect('/account/login'); // Handle errors here
  }

  const tokenResponse = await fetch(
    'https://shopify.com/authentication/63098454109/oauth/token',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        client_id: '<your-client-id>',
        client_secret: '<your-client-secret>',
        code,
        redirect_uri: 'http://localhost:localhost:3000/callback', // Must match what you registered
      }),
    },
  );

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    throw new Error(`Error exchanging code: ${tokenData.error}`);
  }

  // Save token to session or cookies
  return redirect('/account', {
    headers: {
      'Set-Cookie': await context.session.commit(),
    },
  });
}
