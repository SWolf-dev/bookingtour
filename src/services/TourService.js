const db = require('../models/index');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

let createNewTourService = (data)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            if(!data.name || !data.video || !data.price || !data.country || !data.descriptionMarkdown || !data.descriptionHTML){
                 resolve({
                    errCode:1,
                    errMessage:'Missing required parameters'
                })
            }else{
                await db.Tour.create({
                    name:data.name,
                    video: data.video,
                    price: data.price,
                    country: data.country,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.image
                })
                resolve({
                    errCode:0,
                    errMessage:'Create a tour success'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getToursByLimitService = (limit)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.Tour.findAll({
                limit: limit,
                order: [["updatedAt", "DESC"]],
                // include:[
                //     { model: db.Allcode, as: 'genderData', attributes: ['value'] },
                // ],
                // nest: true,
                // raw: false
            });
            if(data && data.image){
                data.image = Buffer.from(data.image, 'base64').toString('binary');
            }
            resolve({

                errCode:0,
                errMessage:'oke',
                data:data
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewTourService,
    getToursByLimitService
}