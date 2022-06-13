const PlaceService = require('../services/PlaceService');

let createNewPlace = async(req,res)=>{
    try {
        let data = await PlaceService.createNewPlaceService(req.body);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
         res.status(200).json({
            errCode:-1,
            errMessage:'Err from sever'
         });
    }
}

module.exports = {
    createNewPlace
}