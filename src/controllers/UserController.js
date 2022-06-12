const express = require('express');
const userService = require('../services/UserService')

let getHomePage = async(req,res)=>{
    try {
        console.log(req.query, req.body)
        let data = await userService.getHomePageService();
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let createNewUser = async(req,res)=>{
    try {
        let data = await userService.createNewUserService(req.body);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
         res.status(200).json({
            errCode:-1,
            errMessage:'Err from sever'
         });
    }
}

let searchUserByName = async(req,res)=>{
    try {
        let data = await userService.searchUserByNameService(req.query);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
         res.status(200).json({
            errCode:-1,
            errMessage:'Err from sever'
         });
    }
}

let getAllUsers = async(req,res)=>{
    try {
        let data = await userService.getAllUsersService();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
         res.status(200).json({
            errCode:-1,
            errMessage:'Err from sever'
         });
    }
}

let userLogin = async(req,res)=>{
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing inputs parameter',

            })
        }
        let userData = await userService.userLoginService(email, password);
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {},
        })
    } catch (e) {
        console.log(e);
    }
}

let userLogout = async(req,res)=>{
    try {
        let data = await userService.userLogoutService(req.body.id);
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
    getHomePage,
    createNewUser,
    searchUserByName,
    getAllUsers,
    userLogin,
    userLogout
}