var azureStrategy = require("passport-azure-ad");

var requiredOptions = [
    'identityMetadata',
    'clientID',
    'responseType',
    'responseMode',
    'redirectUrl'
];

var defaultVerify = function(profile, done) {
    if (!profile._json.preferred_username) {
        return done(new Error("No user found."), null);
    }

    process.nextTick(function () {
        return done(null,{username:profile._json.preferred_username});
    });
};

var defaultScope = ['profile'];

module.exports = function(opts) {
    for (var i=0;i<requiredOptions.length;i++) {
        if (!opts.hasOwnProperty(requiredOptions[i])) {
            throw new Error("Missing auth option: "+requiredOptions[i]);
        }
    }

    var adminAuth = {
        type:"strategy",
        strategy: {
            name: "azuread-openidconnect",
            label: "Sign in with Azure Active Directory",
            icon: "fa-windows",
            strategy: require("passport-azure-ad").OIDCStrategy,
            options: {
                identityMetadata: opts.identityMetadata,
                clientID: opts.clientID,
                responseType: opts.responseType,
                responseMode: opts.responseMode,
                redirectUrl: opts.redirectUrl,
                allowHttpForRedirectUrl: opts.allowHttpForRedirectUrl,
                clientSecret: opts.clientSecret,
                validateIssuer: opts.validateIssuer,
                isB2C: opts.isB2C,
                issuer: opts.issuer,
                passReqToCallback: opts.passReqToCallback,
                scope: opts.scope ? opts.scope: defaultScope,
                loggingLevel: opts.loggingLevel,
                loggingNoPII: opts.loggingNoPII,
                nonceLifetime: opts.nonceLifetime,
                nonceMaxAmount: opts.nonceMaxAmount,
                useCookieInsteadOfSession: opts.useCookieInsteadOfSession,
                cookieEncryptionKeys: opts.cookieEncryptionKeys,
                clockSkew: opts.clockSkew,
                verify: opts.verify ? opts.verify : defaultVerify
            }
        },
        users: opts.users
    };
    if (opts.hasOwnProperty('default')) {
        adminAuth.default = opts.default;
    }

    return adminAuth;

};