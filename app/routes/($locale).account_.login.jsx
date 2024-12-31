// import {Form, useActionData, redirect} from '@remix-run/react';
// import {json} from '@shopify/remix-oxygen';

// export async function action({request, context}) {
//   const formData = await request.formData();
//   const email = formData.get('email');
//   const password = formData.get('password');

//   // Make sure both fields are provided
//   if (!email || !password) {
//     return json({error: 'Email and password are required'}, {status: 400});
//   }

//   try {
//     // Call Shopify's Customer Login API
//     const {data, errors} = await context.customerAccount.login({
//       email,
//       password,
//     });

//     if (errors?.length || !data?.customerAccessToken) {
//       return json({error: 'Invalid email or password'}, {status: 401});
//     }

//     // Set customer access token in session
//     context.session.set(
//       'customerAccessToken',
//       data.customerAccessToken.accessToken,
//     );
//     await context.session.commit();

//     // Redirect to account page after successful login
//     return redirect('/account');
//   } catch (error) {
//     return json({error: 'Unexpected error during login'}, {status: 500});
//   }
// }

// export default function Login() {
//   const actionData = useActionData();

//   return (
//     <div className="login fixed top-24 flex flex-col gap-2 w-full justify-center items-center">
//       <h1>Login Form</h1>
//       <Form
//         method="post"
//         action="/account/login"
//         className="flex flex-col gap-5"
//       >
//         {actionData?.error && <p className="error">{actionData.error}</p>}

//         <div className="email flex flex-col gap-1">
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" name="email" required />
//         </div>

//         <div className="password flex flex-col gap-1">
//           <label htmlFor="password">Password</label>
//           <input type="password" id="password" name="password" required />
//         </div>

//         <button type="submit" className="py-2 px-3 text-white bg-green-500">
//           Sign In
//         </button>
//       </Form>
//     </div>
//   );
// }

/**
 * @param {LoaderFunctionArgs}
 */

export async function loader({request, context}) {
  return context.customerAccount.login();
}

export async function login() {
  return <>{/* <Login/> */}</>;
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
