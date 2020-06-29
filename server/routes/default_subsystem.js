const express = require('express')

const mongoose = require('mongoose')

const router = express.Router();

const multer = require('multer')

var quiz = require('./../migrations/quizz.js')

var solution = require('./../migrations/solutions.js')

router.get('/get_all_quiz', (req, res, next) => {
    quiz.find({}).exec().then(q => {
        if(q.length)
        {
            res.json({status: 'success', message: q})
        }
        else
        {
            res.json({status: 'failed', message: 'No quizzes found'})
        }
    }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
})

router.post('/increment_quiz', (req, res, next) => {
    quiz.findById(req.body.id).exec().then(q => {
        if(q)
        {
            q.totalCompletions += 1
            q.save().then(result => {
                if(result)
                {
                    res.json({status: 'success', message: "Successfully incremented"})
                }
                else
                {
                    res.json({status: 'failed', message: "Error incrementing"})
                }
            }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
        }
        else
        {
            res.json({status: 'failed', message: 'No quizz found'})
        }
    }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
})

router.post('/login', multer().single(), (req, res, next) => {
    if(req.session.user) 
    {
        res.json({status: 'redirect', message: '/admin'});
        return;
    }
    //const username = "Alaskaaaaaa";
    //const password = "YouAreTheBest!<3";
    const username = "admin"
    const password = "thisisapassword"

    const providedUsername = req.body.username;
    const providedPassword = req.body.password;

    if(username === providedUsername && password === providedPassword)
    {
        req.session.user = {username: providedUsername}
        res.json({status: 'success', message: providedUsername})
    }
    else
    {
        res.json({status: 'failed', message: 'Wrong username or password'})
    }
})

router.get('/get_quiz', (req, res, next) => {
    quiz.findById(req.query.id).exec().then(qu => {
        if(qu) res.json({status: 'success', message: qu})
        else res.json({status: 'failed', message: 'Quiz not found'})
    })
})

router.post('/logout', (req, res, next) => {
    if(req.session.user)
    {
        delete req.session.user;
        res.json({status: 'redirect', message: '/login'})
    }
    else
    {
        res.json({status: 'redirect', message: '/login'})
    }
})

router.get('/get_solutions', (req, res, next) => {
    solution.find({}).exec().then(sol => {
        if(sol.length)
        {
            res.json({status: 'success', message: sol})
        }
        else
        {
            res.json({status: 'failed', message: "No solutions found"})
        }
    }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
})

router.get('/check_session', (req, res, next) => {
    if(req.session.user) res.json({status: 'success', message: req.session.user.username})
    else res.json({status: 'redirect', message: '/login'})
})

module.exports = router