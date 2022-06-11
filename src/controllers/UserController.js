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

module.exports = {
    getHomePage,
    createNewUser,
    searchUserByName,
}