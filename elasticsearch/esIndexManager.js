const client = require('./connection');
module.exports = class EsIndexManager {
    constructor(indexName) {
        this.indexName = indexName;
    }

    //1.create index
    createIndex() {
        return client.indices.create({
            index: this.indexName
        }, (err, res, status) => {
            console.log([err, res, status].map(x => x));
        });
    }

    //2.check if index exist
    indexExist() {
        return client.indices.exists({
            index: this.indexName
        }, (err, res, status) => {
            console.log([err, res, status].map(x => x));
        });
    }

    //3.delete index by index name
    deleteIndex() {
        client.indices.delete({
            index: this.indexName
        }, (err, res, status) => {
            console.log([err, res, status].map(x => x));
        });
    }

    //4.add/update a document
    saveDocument(_id, _docType, _payLoad) {
        delete _payLoad._id;
        const data = {
            index: this.indexName,
            id: `${_id}`,
            type: _docType,
            body: _payLoad
        };
        client.index(data, (err, res, status) => {
            console.log([err, res, status].map(x => x));
        });
    }
}