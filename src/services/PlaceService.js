const db = require('../models/index');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

let createNewPlaceService = (data)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            if(!data.name || !data.country || !data.descriptionMarkdown || !data.descriptionHTML){
                 resolve({
                    errCode:1,
                    errMessage:'Missing required parameters'
                })
            }else{
                await db.Place.create({
                    name:data.name,
                    country: data.country,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.image
                })
                resolve({
                    errCode:0,
                    errMessage:'Create a place success'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewPlaceService
}