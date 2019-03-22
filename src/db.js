export default {
    install (Vue) {

        Vue.prototype.db = window.db = new PouchDB('http://admin:1qazxsw23edc@172.16.252.40:5984/courseworks');

        window.db.insert = function(type, doc) {
            let data = JSON.parse(JSON.stringify( Object.assign({type: type}, doc) ));
            if (doc.hasOwnProperty('_id')) {
                return window.db.put(data).then( _ => Object.assign(data, {_rev: _.rev}) )
            } else {
                return window.db.post(data).then( _ => Object.assign(data, {_id: _.id, _rev: _.rev}) )
            }
        };
        window.db.patch = function(id, props) {
            let prop = JSON.parse(JSON.stringify(props)),
                doc;
            return window.db.get(id).then( origin => {
                doc = Object.assign(origin, prop);
                return window.db.post(doc)
            }).then(
                rev => Object.assign(doc, {_rev: rev.rev})
            )
        };
    }
}