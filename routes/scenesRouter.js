const express = require("express");
const router = express.Router();
const createError = require('http-errors')
const uploadCloud = require('../config/cloudinary')
const User = require("../models/user");
const Song = require('../models/song');
const Scene = require('../models/scene');

//GETS ALL SONGS FROM ALL USERS
router.get('/', (req, res, next) => {
    Scene.find()
    .populate('user')
        .then(scenes => {
            res.json(scenes)
            res.status(200)
        })
        .catch(err => next(createError(err)))
})


router.post('/', async (req, res, next) => {
    let { name, description, urlPath } = req.body
    let user = req.session.currentUser._id
    let artist = req.session.currentUser.username
    try {
        const song = await Song.create({ name, description, urlPath, user, artist })
        await User.findByIdAndUpdate(user, { $push: { songs: song._id } })
        res
            .status(200)
            .json(song)
    } catch (err) {
        next(createError(err))
    }
})



//POSTS A NEW SCENE
router.post('/save', async (req, res, next) => {

    let { strokeR, strokeG, strokeB, patterns, name, capture, canvas,alphaStroke,betaStroke } = req.body
    let user = req.session.currentUser._id
    try {
        const scene = await Scene.create({ user, strokeR, strokeG, strokeB, patterns, name, capture, canvas,alphaStroke,betaStroke })
        await User.findByIdAndUpdate(user, { $push: { scenes: scene._id } })
        res
            .status(200)
            .json(scene)
    } catch (err) {
        next(createError(err))
    }
})

router.put('/update', async (req, res, next) => {

    let { strokeR, strokeG, strokeB, patterns, sceneId, name, capture, canvas,bpm,alphaStroke,betaStroke } = req.body
    let user = req.session.currentUser._id

    try {
        const scene = await Scene.findByIdAndUpdate(sceneId, { user,bpm, strokeR, strokeG, strokeB, patterns, name, capture, canvas,alphaStroke,betaStroke })
        res
            .status(200)
            .json(scene)
    } catch (err) {
        next(createError(err))
    }
})

//ADDS URL TO CLOUDINARY
router.post('/file', uploadCloud.single('urlPath'), async (req, res, next) => {
    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }
    try {
        res
            .status(200)
            .json({
                urlPath: req.file.secure_url
            })
    } catch (err) {
        next(createError(err))
    }
})



//DELETES ONE SONG
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const removeScene = await Scene.findByIdAndDelete(id)
        res
            .status(204)
            .send()
    } catch (err) {
        next(createError(err))
    }
})

router.get('/:id', (req, res, next) => {
    let sceneId = req.params.id
    Scene.findById(sceneId)
        .then(scene => {
            res.json(scene)
            res.status(200)
        })
        .catch(err => next(createError(err)))
})
module.exports = router; 