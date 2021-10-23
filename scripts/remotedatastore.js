(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore() {
        let FirebaseConfig = {
            apiKey: "AIzaSyDp8VQABLtYMYlrFOMrFUKM4_56zrZExjI",
            authDomain: "coffee-run-80b3e.firebaseapp.com",
            projectId: "coffee-run-80b3e",
            storageBucket: "coffee-run-80b3e.appspot.com",
            messagingSenderId: "469027659648",
            appId: "1:469027659648:web:715723198fa64ea6512b65"
        };

        firebase.initializeApp(FirebaseConfig);

        console.log("connected to firebase");

        App.collection = firebase.firestore().collection('coffeeorders');
    }

    RemoteDataStore.prototype.add = async function (key, val) {
        console.log(await App.collection.add(val));
    };

    RemoteDataStore.prototype.getAll = async function () {
        let query = await firebase.firestore().collection('coffeeorders');
        
        console.log(`query: ${query.docs}`);

        let formattedData = this.processFirestoreData(query);

        console.log("Get All: ", formattedData);

        return formattedData;
    };

    RemoteDataStore.prototype.get = async function (key, cb) {
        let query = await firebase.firestore().collection('coffeeorders').where('emailAddress', '==', key).get();
        let formattedData = this.processFirestoreData(query);
        
        console.log("Get: ", formattedData);
        cb(formattedData);
    };

    RemoteDataStore.prototype.remove = async function (key) {
        let query = await firebase.firestore().collection('coffeeorders').where('emailAddress', '==', key).get();
        console.log("Delete: ", this.processFirestoreData(query));

        for (let doc of query.docs) {
            doc.ref.delete();
        }
    };

    RemoteDataStore.prototype.processFirestoreData = function (data) {
        let formattedQuery = {};

        for (let doc of data.docs) {
            formattedQuery[doc.data()['emailAddress']] = doc.data();
        }

        return formattedQuery;
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);
