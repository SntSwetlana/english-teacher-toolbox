const {Router} = require('express')
const config = require('config')
const Quizlet = require('../models/Quizlet')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try{
        console.log('write to quizletlog');
        const {term,definition,language} = req.body

        const existing = await  Quizlet.findOne({term})

        if(existing){
            return res.json({quiz: existing})
        }

        const quiz = new Quizlet({term, definition , language, owner: req.user.userId})

        await quiz.save()

        res.status(201).json({quiz})

    }catch (e){
        res.status(500).json({message:'something went wrong, try one more time'})
    }
})

router.get('/',auth, async (req, res) => {
    try{
        const quizlets = await Quizlet.find({owner: req.user.userId})
        res.json(quizlets)
    }catch (e){
        res.status(500).json({message:'something went wrong, try one more time'})
    }
})

router.get('/:id', auth, async (req,res) => {
    try{
        const quiz = await Quizlet.findById(req.params.id)
        res.json(quiz)
    }catch (e){
        res.status(500).json({message:'something went wrong, try one more time'})
    }
})

module.exports = router
