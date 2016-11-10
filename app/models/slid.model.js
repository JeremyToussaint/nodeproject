'use strict'
var path = require("path");
var fs = require("fs");

var CONFIG = JSON.parse(process.env.CONFIG);

module.exports = SlidModel;

function SlidModel(slid) {
    this.type = slid && slid.type ? slid.type : null;
    this.id = slid && slid.id ? slid.id : null;
    this.title = slid && slid.title ? slid.title : null;
    this.fileName = slid && slid.fileName ? slid.fileName : null;

    var data = slid && slid.data ? slid.data : null;

    this.getData = function() {
        return data;
    };

    this.setData = function(pData) {
        data = pData;
    };
}

SlidModel.create = function(slid, callback) {
    if (slid != null) {
        if (slid.fileName != null) {
            fs.writeFile(path.join(CONFIG.contentDirectory, slid.fileName.toString()), slid.getData(), function(err, data) {
                if (err) {
                    return callback(err);
                }
                // callback(null, data);
                if (slid.id != null) {
                fs.writeFile(path.join(CONFIG.contentDirectory, slid.id.toString() + ".meta.json"), JSON.stringify(slid), function(err, data) {
                    if (err) {
                        return callback(err);
                    }

                    callback(null, data);
                });
            }
            });
            
        }
    }
};

SlidModel.read = function(id, callback) {
    if (id != null) {
        fs.readFile(path.join(CONFIG.contentDirectory, id.toString() + ".meta.json"), function(err, data) {
            if (err) {
                return callback(err);
            }

            var slidModel = new SlidModel(JSON.parse(data));

            callback(null, slidModel);
        });
    }
};

SlidModel.update = function(slid, callback) {
    if (slid != null) {
        if (slid.id != null) {
            fs.writeFile(path.join(CONFIG.contentDirectory, slid.id.toString() + ".meta.json"), JSON.stringify(slid), function(err, data) {
                if (err) {
                    return callback(err);
                }

                // callback(null, data);

                if (slid.getData() != null && slid.getData().length > 0) {
                fs.writeFile(path.join(CONFIG.contentDirectory, slid.fileName.toString()), slid.getData(), function(err, data) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, data);
                });
            }
            });


            
        }
    }
};

SlidModel.delete = function(id, callback) {
    if (!id) {
        return callback(new Error("ID null"));
    }

    SlidModel.read(id, function(err, data) {
        if (err) {
            return callback(err);
        }

        console.log("read " + data);
        console.log(data.fileName);
console.log(path.join(CONFIG.contentDirectory, data.fileName));
        if (data != null && data.fileName != null) {
            fs.unlink(path.join(CONFIG.contentDirectory, data.fileName), function(err) {
                if (err) {
                    return callback(err);
                }

                fs.unlink(path.join(CONFIG.contentDirectory, id + ".meta.json"), function(err) {
                    if (err) {
                        return callback(err);
                    }

                    callback();

                });
            });
        }
    });
}