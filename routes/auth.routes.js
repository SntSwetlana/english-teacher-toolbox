const {Router, request} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

router.post(
    '/register',
    [
        check('email','incorrect email').isEmail(),
        check('password','min length is 8 symbols').isLength({min:8})
    ],
    async (req,res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'incorrect registration data'
            })
        }

        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()
        res.status(201).json({message: 'User completed'})
    }catch (e){
        res.status(500).json({message: 'something went wrong, try one more time'})
    }
})

router.post(
    '/login',
    [
        check('email','enter correct email').isEmail(),
        check('password','enter password').exists()
    ],
    async (req,res) => {
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect login data'
                })
            }
            const {email, password} = req.body
            console.log(email)
            const user = await  User.findOne({email})

            if(!user){
                return res.status(400).json({message: 'user does not exists'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message: 'password is incorrect, try one more time'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId:user.id})

        }catch (e){
            res.status(500).json({message: 'something went wrong, try one more time'})
        }
})

module.exports = router
