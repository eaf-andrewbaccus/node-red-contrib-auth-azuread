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

To enable access control with AzureAD, you must first [create a new applicationon your Azure Portal](https://portal.azure.com).

Once created, you will be provided a _Identity Metadata_ and _Client ID_ that you will need to use to configure the authentication plugin.

### Configure `adminAuth`

Access control for the Node-RED editor is configured in your `settings.js` file
using the `adminAuth` property.

    adminAuth: require('node-red-auth-twitter')({
        identityMetadata: IDENTITY_METADATA_URL,
        clientID: CLIENTID,
        redirectUrl: "http://localhost:1880/auth/security/callback"
    })

## Copyright and license

Copyright JS Foundation and other contributors, http://js.foundation under [the Apache 2.0 license](LICENSE).
