var userCounter = 1;

var Users = function () {};

Users.prototype.data = [];
Users.prototype.authenticationData = {};

Users.prototype.getAll = function(callback){
    setTimeout(callback.bind(null, null, this.data), 0);
};

Users.prototype.getById = function(id, callback){
    var result = null;
    for (var i = 0; i < this.data.length; ++i){
        // Intentionally using '==' and not '===' because the id parameter can be a string (extracted from the url)
        if (this.data[i].id == id){
            result = this.data[i];
            break;
        }
    }
    setTimeout(callback.bind(null, null, result), 0);
};

Users.prototype.getByName = function(name, callback){
    var result = null;
    for (var i = 0; i < this.data.length; ++i){
        if (this.data[i].name == name){
            result = this.data[i];
            break;
        }
    }
    setTimeout(callback.bind(null, null, result), 0);
};

Users.prototype.save = function(username, password, callback){
    var user = {id: userCounter++, name: username};
    this.data[this.data.length] = user;
    this.authenticationData[user.name] = password;

    setTimeout(callback.bind(null, null, user), 0);
};

Users.prototype.authenticate = function(username, password, callback){
    var result = this.authenticationData[username] === password;
    if (!result) {
        setTimeout(callback.bind(null, null, null), 0);
    }
    else {
        this.getByName(username, callback);
    }
};

new Users().save("Moshe", "12345", function(err, question) {});

exports.Users = Users;