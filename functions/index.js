const functions = require('firebase-functions');


// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.watchItemVendorsCreate = functions.database.ref(`inventoryItems/{itemPushId}/vendor`).onCreate( event => {
    let itemPushId = event.params.itemPushId;
    let vendorId = event.data.val();

    admin.database().ref(`vendorItems/${vendorId}/${itemPushId}`).set(true).then( _ => {
        console.log('onCreate ran and we successfully added the item to vendroItems');
    }, error => {
        console.log(error);
    });
});


exports.watchItemVendorsDelete = functions.database.ref(`inventoryItems/{itemPushId}/vendor`).onDelete( event => {
    let previousVendorId = event.data.previous.val();
    let itemPushId = event.params.itemPushId;

    admin.database().ref(`vendorItems/${previousVendorId}/${itemPushId}`).remove( _ => {
        console.log('we removed the item from the vendor.');
    }, error => {
        console.log(error);
    });
});


exports.watchItemVendorsUpdate = functions.database.ref(`inventoryItems/{itemPushId}/vendor`).onUpdate( event => {
    let previousVendorId = event.data.previous.val();
    let currentVendorId = event.data.val();
    let itemPushId = event.params.itemPushId;

    if ( previousVendorId === currentVendorId ) {
        return;
    } else {
        let vendorItemsRef = admin.database().ref('vendorItems');
        return vendorItemsRef.child(`${currentVendorId}`).update({
            [itemPushId]: true
        }).then( _ => {
            vendorItemsRef.child(`${previousVendorId}`).child(`${itemPushId}`).remove();
        });
    }
});


exports.watchVendorDeletion = functions.database.ref(`vendors/{vendorPushId}`).onDelete( event => {
    let deletedVendorId = event.params.vendorPushId;

    return admin.database.ref(`vendorItems/${deletedVendorId}`).remove().then( snapshot => {

    }, error => {
        console.error( error );
    });
})
