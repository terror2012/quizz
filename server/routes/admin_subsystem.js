const express = require('express')

const mongoose = require('mongoose')

const router = express.Router();

const multer = require('multer')

var quiz = require('./../migrations/quizz.js')

var category = require('./../migrations/categories.js');

var solution = require('./../migrations/solutions.js')

const isLoggedInAsUser = (req, res, next) => {
    if(req.session.user) next()
    else res.json({status: 'redirect', message: '/login'})
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.toLowerCase().split(' ').join('-'))
    }
})

var upload = multer({storage})

router.get('/get_all_quizzes', isLoggedInAsUser, (req, res, next) => {
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

router.post('/add_new_quiz', upload.single('image'), isLoggedInAsUser, (req, res, next) => {

    let name = req.body.name
    let description = req.body.description
    let image = req.protocol + "://" + req.get('host') + '/' + req.file.filename
    let category = JSON.parse(req.body.category);

    let qu = new quiz({
        _id: new mongoose.Types.ObjectId,
        name,
        description,
        image,
        category
    })

    qu.save().then(result => {
        if(result) res.json({status: 'success', message: 'Quiz saved successfully'})
        else res.json({status: 'failed', message: "Error saving this quizz"})
    }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
})

router.get('/get_questions', isLoggedInAsUser, (req, res, next) => {
    quiz.findById(req.query.id).exec().then(qu => {
        if(qu) res.json({status: 'success', message: qu})
        else res.json({status: 'failed', message: 'Quiz not found'})
    })
})

router.post('/update_questions', isLoggedInAsUser, (req, res, next) => {
    let questions = JSON.parse(req.body.questions)

    let id = req.body.id

    quiz.findById(id).exec().then(qu => {
        if(qu)
        {
            qu.questions = questions
            qu.save().then(result => {
                if(result) res.json({status: 'success', message: 'Questions successfully updates'})
                else res.json({status: 'failed', message: "Failed to update the questions"})
            }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
        }
    })
})

router.post('/edit_quiz', upload.single('image'), isLoggedInAsUser, (req, res, next) => {
    quiz.findById(req.body.id).exec().then(qu => {
        if(qu)
        {
            qu.name = req.body.name
            qu.description = req.body.description
            qu.category = JSON.parse(req.body.category)
            if(req.file) qu.image = req.protocol + "://" + req.get('host') + '/' + req.file.filename
            qu.save().then(() => {res.json({status: 'success', message: 'Quiz succesfully edited'})}).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
        }
        else
        {
            res.json({status: 'failed', message: "Quiz not found"})
        }
    }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
})

router.post('/delete_quiz', isLoggedInAsUser, (req, res, next) => {
    quiz.findById(req.body.id).exec().then(qu => {
        if(qu) qu.remove().then(result => {
            if(result)
            {
                res.json({status: 'success', message: 'Quizz successfully deleted'})
            }
            else
            {
                res.json({status: 'failed', message: 'Failed to delete quizz'})
            }
        }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
        else res.json({status: 'failed', message: "Quizz not found"})
    }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
})

router.get('/get_categories', isLoggedInAsUser, (req, res, next) => {
    category.find({}).exec().then(cat => {
        if(cat.length)
        {
            res.json({status: 'success', message: cat})
        }
        else
        {
            res.json({status: 'failed', message: 'No categories found'})
        }
    }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
})

router.post('/create_category', isLoggedInAsUser, (req, res, next) => {
    var cat = new category({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name
    })

    cat.save().then(result => {
        if(result) res.json({status: 'success', message: 'Category successfully created'})
        else res.json({status: 'failed', message: err.message})
    }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
})

router.post('/edit_category', multer().single(), isLoggedInAsUser, (req, res, next) => {
    category.findById(req.body.id).exec().then(cat => {
        if(cat)
        {
            cat.name = req.body.name,
            cat.save().then(result => {
                if(result)
                {
                    quiz.find({"category._id" : cat._id}).exec().then(quzz => {
                        if(quzz.length)
                        {
                            for(var i = 0; i < quzz.length; quzz++)
                            {
                                quzz[i].category.name = cat.name;
                                quzz[i].save();
                            }
                        }
                    })
                    res.json({status: 'success', message: 'Category successfully modified'})
                }
                else res.json({status: 'failed', message: 'Failed to edit the category'})
            }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
        }
    })
})

router.post('/delete_category', isLoggedInAsUser, (req, res, next) => {
    category.findById(req.body.id).exec().then(cat => {
        if(cat)
        {
            quiz.find({"category._id" : cat._id}).exec().then(quzz => {
                if(uzz.length)
                {
                    for (var i = 0; i < quzz.length; quzz++)
                    {
                        quzz[i].category = null;
                        quzz[i].save();
                    }
                }
            })
            cat.remove().then(() => {res.json({status: 'success', message: 'Category successfully deleted'})}).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
        }
        else
        {
            res.json({status: 'failed', message: "Category not found"})
        }
    }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
})

router.get('/get_solutions', isLoggedInAsUser, (req, res, next) => {
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

router.post('/create_solution', upload.single('image'), isLoggedInAsUser, (req, res, next) => {
    var solut = new solution({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        image: req.protocol + "://" + req.get('host') + '/' + req.file.filename,
        description: req.body.description
    })

    solut.save().then(() => {
        res.json({status: 'success', message: 'Solution created successfully'})
    }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
})

router.post('/edit_solution', upload.single('image'), isLoggedInAsUser, (req, res, next) => {
    solution.findById(req.body.id).exec().then(sol => {
        if(sol)
        {
            sol.name = req.body.name
            sol.description = req.body.description
            if(req.file) sol.image = req.protocol + "://" + req.get('host') + '/' + req.file.filename
            sol.save().then(() => {res.json({status: 'success', message: 'Solution successfully edited'})}).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
        }
        else
        {
            res.json({status: 'failed', message: 'Solution not found'})
        }
    }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
})

router.post('/delete_solution', isLoggedInAsUser, (req, res, next) => {
    solution.findById(req.body.id).exec().then(sol => {
        if(sol)
        {
            sol.remove().then(() => {
                res.json({status: 'success', message: "Solution removed successfully"})
            }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
        }
        else
        {
            res.json({status: 'failed', message: 'Solution not found'})
        }
    }).catch(err=>{console.log(err); res.json({status: 'failed', message: err.message})})
})

module.exports = router