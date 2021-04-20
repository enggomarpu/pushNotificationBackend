// In-memory persistence for simplicity
var data = ['64e3f08b8342af31f47a30'];

exports.write = function(item) {
    // Avoid duplicate items
    if (data.indexOf(item) === -1) {
        data.push(item);
    }
};

exports.read = function() {
    // Expose data externally
    return data;
};