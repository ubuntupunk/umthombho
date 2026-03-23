# Netlify Identity Configuration

## Roles System

Available roles: `member`, `editor`, `admin`

## identity-signup Function

The `netlify/functions/identity-signup.js` function automatically assigns the `member` role to new users upon registration.

### To change default role

Edit `netlify/functions/identity-signup.js` and change:
```js
const defaultRole = 'member';
```

### To assign multiple roles

```js
app_metadata: {
  roles: ['member', 'editor']
}
```

## Configuration Required

In Netlify dashboard:

1. Go to **Identity** > **Settings** > **Identity callbacks**
2. Add: `/.netlify/functions/identity-signup`

3. Go to **Identity** > **Settings** > **User registration**
4. Enable "Allow invite only" or configure as needed

5. Set environment variable `NETLIFY_IDENTITY_SECRET` in Netlify dashboard

## Manual Role Assignment

To manually assign roles to existing users:
1. Go to Identity > Users
2. Select user
3. Click "Edit metadata" to add roles manually
