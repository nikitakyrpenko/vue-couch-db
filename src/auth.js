export default {
    login(email, pass) {

        return window.db.find({
            selector: {
                email: {'$regex': '(?i)' + email},
                password: pass,
                '$or':[{type: 'teacher'},{type: 'student'}]
            }
        }).then( _ => {
            if (_.docs.length === 0) throw "User Not Found";
            localStorage.user = JSON.stringify(_.docs[0]);
            return {role: _.docs[0].type}
        })
    },

    getUser() {
        return JSON.parse(localStorage.user);
    },

    logout() {
        delete localStorage.user;
    },

    loggedIn() {
        return true;
    }
}