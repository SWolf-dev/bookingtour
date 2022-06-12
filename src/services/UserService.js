const db = require('../models/index');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


// bcrypt.compareSync("not_bacon", hash); compare password

let userLoginService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {
            };
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exit
                let user = await db.User.findOne({
                    where: {
                        email: email,
                        login: 'false'
                    },
                    raw: true,
                    attributes: ['id','email','image', 'roleId', 'password', 'firstName', 'lastName'],
                })

                if(user && user.image){
                    user.image = Buffer.from(user.image, 'base64').toString('binary');
                }

                if(user && user.roleId){
                    let hashRoleId = await bcrypt.hashSync(user.roleId, salt);
                    user.roleId = hashRoleId;
                }
                if (user) {

                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        checkLogin(user.id);
                        userData.errCode = 0;
                        userData.errMessage = 'No err';
                        delete user.password;
                        userData.user = user;
                        
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errCode = `User not found or being log in`;
                }
                resolve(userData);
            } else {
                // return err
                userData.errCode = 1;
                userData.errMessage = `This email isn's exist in ours system.Please try again!`;
                resolve(userData);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let checkLogin = (id)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let res = await db.User.update(
                {
                    login: 'true'
                },
                {
                    where:{
                        id:id
                    }
                }
            );
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail,
                }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}


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
            if(!data.email || !data.password || !data.gender ||!data.roleId || !data.firstName || !data.lastName){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameters'
                })
            }else{
                let existUser =  await checkUserEmail(data.email);
                if(existUser){
                    resolve({
                        errCode:-1,
                        errMessage:'This account have been exist in our systems'
                    })
                }else{
                    const hashPassword = bcrypt.hashSync(data.password, salt);
                    await db.User.create({
                        email: data.email,
                        password: hashPassword,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        roleId: data.roleId,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                        image: data.image
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
                if(res && res.image){
                    res.image = Buffer.from(res.image, 'base64').toString('binary');
                }
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

let userLogoutService = (id)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            if(!id){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameters'
                })
            }else{
                let data = await db.User.update(
                    {
                        login: 'false'
                    },
                    {
                        where:{
                            id:id,
                            login:"true"
                        }
                    }
                );
                if(data[0] !== 0){
                    resolve({
                        errCode:0,
                        errMessage:'log out success',
                    });
                }else{
                    resolve({
                        errCode:-1,
                        errMessage:'log out failed',
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getHomePageService,
    createNewUserService,
    searchUserByNameService,
    getAllUsersService,
    userLoginService,
    userLogoutService
}