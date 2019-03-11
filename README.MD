# passport-ldapauth-apostrophe-wrapper

This is a wrapper strategy based on [passport-ldapauth](https://www.npmjs.com/package/passport-ldapauth).
It adapts passport-ldapauth to [apostrophe-passport](https://github.com/apostrophecms/apostrophe-passport).

[apostrophe-passport](https://github.com/apostrophecms/apostrophe-passport) is designed to support strategies based on [passport-oauth2](https://github.com/jaredhanson/passport-oauth2).
In order to user [passport-ldapauth](https://www.npmjs.com/package/passport-ldapauth) in [apostrophe-passport](https://github.com/apostrophecms/apostrophe-passport)

## Installation

```bash
npm install --save passport-ldapauth-apostrophe-wrapper

# if you prefer yarn
yarn add passport-ldapauth-apostrophe-wrapper
```

## Usage

Please refer to [passport-ldapauth](https://github.com/vesse/passport-ldapauth).

This strategy adds an extra configuration option `completeProfile`, to build the user profile required by apostrophe.
It accepts a function that use the ldap search result as its first argument, and should return the completed user profile.
Reference: [How should I map users on their site to users on my site?](https://github.com/apostrophecms/apostrophe-passport#how-should-i-map-users-on-their-site-to-users-on-my-site)

For more detailed usage, please refer to [apostrophe-passport](https://github.com/apostrophecms/apostrophe-passport).

Configuration example:

```javascript
'apostrophe-passport': {
  strategies: [{
    module: 'passport-ldapauth-apostrophe-wrapper',
    options: {
      server: {
        url: 'ldap://localhost:389',
        bindDN: 'cn=root',
        bindCredentials: 'secret',
        searchBase: 'ou=passport-ldapauth',
        searchFilter: '(uid={{username}})'
      },
      completeProfile: function (user) {
        user.username = user.cn
        user.displayName = user.cn
        return user
      }
    }
  }],
  create: {
    group: {
      title: 'ldap',
      permissions: ['admin']
    }
  }
}
```

## License

[The MIT License](https://opensource.org/licenses/MIT)