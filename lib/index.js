/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var path = require("path");
var azureStrategy = require("passport-azure-ad");

var requiredOptions = [
    'identityMetadata',
    'clientID',
    'redirectUrl',
    'users'
];

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
                responseType: 'id_token',
                responseMode: 'form_post',
                redirectUrl: opts.redirectUrl,
                passReqToCallback: true,
                allowHttpForRedirectUrl: true,
                verify: function(req, iss, sub, profile, accessToken, refreshToken, done) {
                    done(null, profile);
                    if (!profile.oid) {
                        return done(new Error("No oid found"), null);
                    }
                    // asynchronous verification, for effect...
                    process.nextTick(function () {
                        findByOid(profile.oid, function(err, user) {
                            if (err) {
                            return done(err);
                            }
                            if (!user) {
                            // "Auto-registration"
                            users.push(profile);
                            return done(null, profile);
                            }
                            return done(null, user);
                        });
                    });
                }
            }
        },
        users: opts.users
    };
    if (opts.hasOwnProperty('default')) {
        adminAuth.default = opts.default;
    }

    return adminAuth;

};
