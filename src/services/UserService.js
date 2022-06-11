const db = require('../models/index');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

let getHomePageService = ()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            resolve({
                errCode:0,
                errMessage:'oke'
            })
        } catch (error) {
            reject(error);
        }
    })
}

let createNewUserService = (data)=>{
     return new Promise(async(resolve,reject)=>{
        try {
            if(!data.email || !data.password || !data.firstName || !data.lastName){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameters'
                })
            }else{
                let existUser = await db.User.findOne({
                    where:{
                        email:data.email
                    }
                })
                if(existUser){
                    resolve({
                        errCode:-1,
                        errMessage:'This account have been exist in our systems'
                    })
                }else{

                    await db.User.create({
                        email: data.email,
                        password: data.password,
                        firstName: data.firstName,
                        lastName: data.lastName
                    });                
                    resolve({
                        errCode:0,
                        errMessage:'Create new user success'
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let searchUserByNameService = (term)=>{
    return new Promise (async (resolve,reject)=>{
        try {
            if(term.q){
                let res = await db.User.findAll({
                    where:{
                        lastName:{[Op.like]: '%' + term.q + '%'},
                    }
                })
                if(res){
                    resolve({
                        errCode:0,
                        errMessage:'find sucees',
                        data: res
                    })
                }else{
                    resolve({
                        errCode:2,
                        errMessage:'Err',
                    })
                }
            }else{
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameters'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsersService = ()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.User.findAll();
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
    getHomePageService,
    createNewUserService,
    searchUserByNameService,
    getAllUsersService
}