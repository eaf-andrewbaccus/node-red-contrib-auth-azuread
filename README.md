# Node-RED Authentication with AzureAD

[Node-RED](https://nodered.org) plugin for authenticating users with AzureAD.

This modules lets you restrict access to the Node-RED editor to specific AzureAD
users.

**Note:** this requires Node-RED 0.18 or later


## Install

In your Node-RED user directory, typically `~/.node-red`:

    $ npm install node-red-contrib-auth-azuread

## Usage

### Create a new AzureAD application

Guide to Microsoft AzureAD application registration [here](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-integrating-applications).

To enable access control with AzureAD, you must first [create a new application on your Azure Portal](https://portal.azure.com).

Once created, you will be provided a _Identity Metadata_ and _Client ID_ that you will need to use to configure the authentication plugin.

### Configure `adminAuth`

Access control for the Node-RED editor is configured in your `settings.js` file
using the `adminAuth` property. Receives options as listed in the [passport-azure-AD](https://github.com/AzureAD/passport-azure-ad) project. 
`identityMetadata`, `clientID`, `responseType`, `responseMode`, and `redirectUrl` are required; 
`scope` defaults to `['profile']` if none is provided. Also receives a custom "verify" function if desired; 
otherwise uses a default that looks for "Preferred Username". Example:

    adminAuth:require("node-red-contrib-auth-azuread")({
        identityMetadata: 'https://login.microsoftonline.com/<tenant guid>/v2.0/.well-known/openid-configuration',
        clientID: '<application ID>',
        responseType: 'code',
        responseMode: 'query',
        redirectUrl: 'https://<node red endpoint>/auth/strategy/callback',
        users: [
            {username: "test@admin.com",permissions: ["*"]}
        ]
    })

**Note:** at time of this writing, the node-red `auth/strategy/callback` method only accepts GET requests, so this will fail unless you use the response mode `query`.
As described in the [passport-azure-AD](https://github.com/AzureAD/passport-azure-ad) project, this will change requirements for some other options. Please read their github for more info.

## Copyright and license

Copyright JS Foundation and other contributors, http://js.foundation under [the Apache 2.0 license](LICENSE).
