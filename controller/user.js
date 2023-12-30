const firestore = require('../dbConfig')
const collectionRef = firestore.collection('admin');
const userCollection = firestore.collection('users');
const contactUsCollection = firestore.collection('contactus');
const admin = require('firebase-admin');

exports.adminLogin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            throw "missing Crediential"
        }
        const userSnapshot = await collectionRef.where('username', '==', username).get();
        if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            if (userData.password == password) {
                console.log('User details:', userData);
                res.send({ status: "success", message: "Admin login Successfully", role: 'admin' })
            } else {
                res.send({ status: "error", message: "Password is mismatch..." })
            }
        } else {
            console.log('User not found');
            res.send({ status: "error", message: "User not found" })
        }
    } catch (error) {
        console.error('Error getting documents:', error);
    }
};
exports.userLogin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const userSnapshot = await userCollection.where('username', '==', username).get();
        if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            if (userData.password == password) {
                console.log('User details:', userData);
                res.send({ status: "success", message: "User login Successfully", role: 'user', data: userSnapshot.docs[0].data() })
            } else {
                res.send({ status: "error", message: "Password is mismatch..." })
            }
        } else {
            console.log('User not found');
            res.send({ status: "error", message: "User not found" })
        }
    } catch (error) {
        console.error('Error getting documents:', error);
    }
};
exports.register = async (req, res, next) => {
    const { username, email, password, mobileNo } = req.body;

    try {
        // Check if the username already exists
        const existingUserSnapshot = await userCollection.where('username', '==', username).get();

        if (!existingUserSnapshot.empty) {
            // Username already exists, handle accordingly (e.g., return an error response)
            res.send({ status: 'error', data: 'Username already exists. Please choose a different username.' });
        } else {
            // Username doesn't exist, proceed with user registration
            await userCollection.add({
                username,
                email,
                password,
                mobileNo,
                createdAt: admin.firestore.FieldValue.serverTimestamp() // Add a timestamp field
            });

            res.send({ status: 'success', data: 'User registered successfully' });
        }
    } catch (error) {
        console.error('Error storing user details in Firestore:', error);
        // Handle other errors (e.g., internal server error) here
        res.send({ status: 'error', data: 'User registration failed' });
    }
};

exports.contactUs = async (req, res, next) => {
    const { name, company, mobileNo, email, message } = req.body;

    try {
        await contactUsCollection.add({
            name, company, mobileNo, email, message,createdAt: admin.firestore.FieldValue.serverTimestamp() 
        });

        res.send({ status: "success", data: "Contact Us registered successfully" });
    } catch (error) {
        console.error('Error storing Contact Us details in Firestore:', error);
        res.send({ status: "error", data: "Contact Us registration failed" });
    }

};
exports.getContactUsDetails = async (req, res, next) => {
    try {
        const contactUs = await contactUsCollection.orderBy('createdAt', 'desc').get();
        const contactUsArray = contactUs.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
        });

        console.log('All Product Details:', contactUsArray);
        res.send({ status: "success", data: contactUsArray });
    } catch (error) {
        console.error('Error storing Contact Us details in Firestore:', error);
        res.send({ status: "error", data: "Contact Us registration failed" });
    }

};
exports.getUser = async (req, res, next) => {
    try {
        const user = await userCollection.orderBy('createdAt', 'desc').get();
        const userArray = user.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
        });

        console.log('All User Details:', userArray);
        res.send({ status: "success", data: userArray });
    } catch (error) {
        console.error('Error storing User details in Firestore:', error);
        res.send({ status: "error", data: "Contact Us registration failed" });
    }

};