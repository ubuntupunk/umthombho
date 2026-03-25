# automate the onboarding for your feeding scheme members, you can use an Identity Event Function. 

This specific function, named identity-signup.js, is automatically triggered by Netlify whenever a new user confirms their email and completes their registration. 


## 1. The identity-signup Function
This function does two things: it automatically assigns the member role to the user so they can access the CMS, and it triggers a welcome email with your induction PDF attached. 
Create this file at netlify/functions/identity-signup.js: 
javascript

const sgMail = require('@sendgrid/mail'); // Example using SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  // 1. Define the Induction PDF (Base64 encoded)
  // You can fetch this from a URL or include it in your function bundle
  const pdfUrl = "https://your-site.com";
  const response = await fetch(pdfUrl);
  const buffer = await response.arrayBuffer();
  const base64Pdf = Buffer.from(buffer).toString('base64');

  // 2. Send the Welcome Email
  const msg = {
    to: user.email,
    from: 'admin@your-npo.org',
    subject: 'Welcome to the Feeding Scheme Project!',
    text: `Hi ${user.user_metadata.full_name || 'Member'}, welcome! Please find your induction guide attached.`,
    attachments: [
      {
        content: base64Pdf,
        filename: "Induction-Guide.pdf",
        type: "application/pdf",
        disposition: "attachment"
      }
    ]
  };

  try {
    await sgMail.send(msg);
    
    // 3. Return the 'member' role to Netlify to update the user automatically
    return {
      statusCode: 200,
      body: JSON.stringify({
        app_metadata: {
          roles: ['member'] // Automatically gives them CMS access
        }
      })
    };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};

Use code with caution.


## 2. Implementation Checklist

    Install Dependencies: Run npm install @sendgrid/mail in your functions folder.
    Environment Variables: Add your SENDGRID_API_KEY to the Netlify Dashboard under Site settings > Build & deploy > Environment.
    Induction PDF: Ensure your induction PDF is hosted somewhere public (like your site's public folder) so the function can fetch it during execution.
    Role-Based Access: In your admin/config.yml, ensure you have role-based access configured to allow users with the member role to log in. 

## 3. How the Flow Works

    Admin Invites: Your Admin uses the custom form you built to send an invite.
    Member Accepts: The member clicks the link in their email and sets a password.
    Function Fires: Netlify detects the signup, runs identity-signup.js, assigns the role, and emails the PDF.
    CMS Access: The member can now immediately log in to /admin/ and begin producing content.
