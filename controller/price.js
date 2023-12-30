const firestore = require("../dbConfig");
const priceDetails = firestore.collection('price');

exports.addPrice = (req, res) => {
  const { id,priceId, priceColor, priceSize, priceAmount,priceDiscount } = req.body;
  console.log(req.body)
  try {
    if( !priceId || !priceColor|| !priceSize|| !priceAmount || !priceDiscount ){
      throw "Missing data";
    } 

    if(!id){
      priceDetails.add({priceId, priceColor, priceSize, priceAmount,priceDiscount})
      .then(() => res.send({ status: "success", data: "Price added successfully" }))
      .catch(() => {throw "Price adding failed"});
    } else {
      priceDetails.doc(id).update({priceId, priceColor, priceSize, priceAmount,priceDiscount})
      .then(() => res.send({ status: "success", data: "Price updated successfully" }))
      .catch(() => {throw "Price updating failed"});
    }
  } catch (error) {
    res.send({ status: "error", data:error });
  }
};

exports.getPrice = async (req,res) => {
  try{
    const price = await priceDetails.get();
    const priceArray = price.docs.map(doc => ({Id: doc.id, ...doc.data()}));
    console.log('All Price Details:', priceArray);
    res.send({ status: "success", data: priceArray });  
  } catch (error) {
    res.send({ status: "error", data:error });
  }
};

exports.deletePrice = async (req, res) => {
  const {id} = req.body;
  try{
    if (!id) {
      throw "missing parameter";
    }
    const data = await priceDetails.doc(id).get();
    if(data.exists){
      priceDetails.doc(id).delete()
      .then(() => res.send({ status: "success", data: "Price deleted successfully" }))
      .catch(() => {throw "Error in deleting Price"});
    } else {
      throw "Error in finding Price";
    }
  } catch (error) {
    res.send({ status: "error", data:error });
  }
};

exports.getPriceById = async (req, res, next) => {
    const {  color,size} = req.body; // Assuming id is provided in the request body
  
    try {
      if (!color||!size) {
        throw ("missing parameter");
      }
  
      const priceSnapshot = await priceDetails
      .where('priceColor', '==', color)
      .where('priceSize', '==', size)
      .get();
  
      if (!priceSnapshot.empty) {
        const priceData = [];

        priceSnapshot.forEach((doc) => {
            const { priceAmount, priceDiscount } = doc.data();
            priceData.push({ priceAmount, priceDiscount });
        });

        console.log('Price Details:', priceData);
        res.send({ status: 'success', data: priceData });
      } else {
        console.log('price not found');
        res.send({ status: "error", data: "price not found" });
      }
    } catch (error) {
      console.error('Error getting price details by ID:', error);
      res.send({ status: "error", data: error });
    }
  
  
  };