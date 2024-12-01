const express = require('express');
const auth = require('../middleware/auth');
const projectsCtrl = require('../controllers/projects');
const router = express.Router();

router.get('/', projectsCtrl.getAllProjects);
router.post('/', auth, projectsCtrl.createProject);



module.exports = router;