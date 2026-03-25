# decap cms registration form

## 1. Set Up Invite-Only Registration 
First, restrict your site so only invited users can join: 

    In your Netlify dashboard, go to Site settings > Identity > Registration.
    Change Registration preference to Invite only.
    Under Services, ensure Git Gateway is enabled so users can actually edit content in Decap CMS. 

## 2. Create the "Admin Invitation" Form 
Create a protected page on your site (accessible only to users with the admin role) containing a simple HTML form. Since you are the developer, you can use a basic form that sends data to a Netlify Function.
html

<!-- Visible only to admins -->
<form id="invite-form">
  <input type="email" id="invite-email" placeholder="Member Email" required>
  <button type="submit">Invite Member</button>
</form>

<script>
document.getElementById('invite-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('invite-email').value;
  
  // Call your Netlify Function (see step 3)
  const response = await fetch('/.netlify/functions/invite-member', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
  
  if (response.ok) alert('Invitation sent!');
});
</script>

Use code with caution.

## 3. Create the Invitation Netlify Function
Netlify Functions can perform "Admin" operations on Identity users using the GoTrue API and your site's NETLIFY_IDENTITY_ADMIN_TOKEN. 
Create a file at netlify/functions/invite-member.js:
javascript

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // 1. Verify the person calling this function is an Admin
  const { user } = context.clientContext;
  if (!user || !user.app_metadata.roles.includes('admin')) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const { email } = JSON.parse(event.body);
  const identityApi = process.env.NETLIFY_IDENTITY_ENDPOINT; // Auto-set by Netlify

  // 2. Call Netlify's Admin API to invite the user
  const response = await fetch(`${identityApi}/admin/users/invite`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${context.clientContext.identity.token}`
    },
    body: JSON.stringify({ email, data: { role: 'member' } }) 
  });

  return { statusCode: response.status, body: 'User Invited' };
};

Use code with caution.

## 4. Member Onboarding Flow
When the Admin submits the form, Netlify will automatically send an invitation email to the member. 

    The Link: The email contains a link back to your site with an #invite_token.
    Onboarding Form: When the member clicks the link, the Netlify Identity Widget will detect the token and automatically open a "Complete your signup" popup where they can set their password.
    Induction: You can use the identity-signup Netlify Event Function to trigger additional onboarding steps, like adding them to a mailing list or sending a "Welcome to the Scheme" email. 


