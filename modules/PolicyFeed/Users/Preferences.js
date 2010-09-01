/*
    Copyright 2010 Emilis Dambauskas

    This file is part of PolicyFeed module.

    PolicyFeed is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    PolicyFeed is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with PolicyFeed.  If not, see <http://www.gnu.org/licenses/>.
*/

// Used modules:
var fs = require("fs");
var gluestick = require("gluestick");
var Site = gluestick.loadModule("Site");
var ctlTemplate = require("ctl/Template");
var Users = require("PolicyFeed/Users");


// Extend module:
gluestick.extendModule(exports, "ctl/Controller");

/**
 * Directory with template files.
 */
exports.tpl_dir = exports.getTplDir(module);


/**
 * Checks if user does not want to receive emails from our site.
 */
exports.isEmailBlocked = function(email) {
    var user = Users.getByEmail(email);
    return user.blocked;
}


/**
 *
 */
exports.showBlockForm = function(req) {
    if (!req.params.key)
        return this.showError(404);

    return this.returnHtml("showBlockForm", {
                user: Users.getByKey(req.params.key)
                });
}


/**
 *
 */
exports.submitBlockForm = function(req) {
    if (!req.params.key)
        return this.showError(404);
    var user = Users.getByKey(req.params.key);
    user.blocked = true;
    Users.write(user.id, user);

    return this.WebMapper.redirect(module.id, "showBlockedOk", user);
}


/**
 *
 */
exports.showBlockedOk = function(req) {

    return this.returnHtml("showBlockedOk", {
            user: req.params
            });
}


/**
 *
 */
exports.showUnblockForm = function(req) {
    if (!req.params.key)
        return Site.showError(404);

    return this.returnHtml("showUnblockForm", {
            user: Users.getByKey(req.params.key)
            });
}


/**
 *
 */
exports.submitUnblockForm = function(req) {
    if (!req.params.key)
        return Site.showError(404);

    var user = Users.getByKey(req.params.key);
    user.blocked = false;
    user.save();

    return this.WebMapper.redirect(module.id, "showUnblockedOk", user);
}


/**
 *
 */
exports.showUnblockedOk = function(req) {
    return this.returnHtml("showUnblockedOk", {
                user: req.params
                });
}

