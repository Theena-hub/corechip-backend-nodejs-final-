const firestore = require("../dbConfig");
const bannerDetails = firestore.collection('banner');

exports.addBanner = (req, res) => {
  const { bannerId, bannerTitle, bannerButton, bannerUrl,bannerDesc,bannerImage } = req.body;
  try {
    console.log(req.body)
    if( !bannerTitle  || !bannerButton || !bannerUrl || !bannerImage || !bannerDesc){
      throw "Missing data";
    } 
    const data = {
      bannerTitle : bannerTitle,
      bannerImage : bannerImage,
      bannerDesc:bannerDesc,
      bannerButton : bannerButton,
      bannerUrl : bannerUrl
    }
    if(!bannerId){
      bannerDetails.add(data)
      .then(() => res.send({ status: "success", data: "Banner added successfully" }))
      .catch(() => {throw "Banner adding failed"});
    } else {
      bannerDetails.doc(bannerId).update(data)
      .then(() => res.send({ status: "success", data: "Banner updated successfully" }))
      .catch(() => {throw "Banner updating failed"});
    }
  } catch (error) {
    res.send({ status: "error", data:error });
  }
};

exports.getBanner = async (req,res) => {
  try{
    const banners = await bannerDetails.get();
    const bannersArray = banners.docs.map(doc => ({Id: doc.id, ...doc.data()}));
    console.log('All Banner Details:', bannersArray);
    res.send({ status: "success", data: bannersArray });  
  } catch (error) {
    res.send({ status: "error", data:error });
  }
};

exports.deleteBanner = async (req, res) => {
  const {bannerId} = req.body;
  try{
    if (!bannerId) {
      throw "missing parameter";
    }
    const data = await bannerDetails.doc(bannerId).get();
    if(data.exists){
      bannerDetails.doc(bannerId).delete()
      .then(() => res.send({ status: "success", data: "Banner deleted successfully" }))
      .catch(() => {throw "Error in deleting Banner"});
    } else {
      throw "Error in finding Banner";
    }
  } catch (error) {
    res.send({ status: "error", data:error });
  }
}