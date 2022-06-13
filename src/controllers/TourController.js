const TourService = require('../services/TourService');

let createNewTour = async(req,res)=>{
    try {
        let data = await TourService.createNewTourService(req.body);
        res.status(200).json({...data});
    } catch (error) {
        console.log(error);
         res.status(200).json({
            errCode:-1,
            errMessage:'Err from sever'
         });
    }
}

let getToursByLimit = async(req,res)=>{
    try {
        let data = await TourService.getToursByLimitService(+req.query.limit);
        res.status(200).json({...data});
    } catch (error) {
        console.log(error);
         res.status(200).json({
            errCode:-1,
            errMessage:'Err from sever'
         });
    }
}

module.exports = {
    createNewTour,
    getToursByLimit
}