var express = require('express');
var router = express.Router();
const TeamsController = require('../controllers/teamController')


router.post('/createTeam', TeamsController.createTeam)
router.get('/listTeams', TeamsController.list_all_teams)
router.post('/updateTeams', TeamsController.update_team)
router.delete('/deleteTeams', TeamsController.delete_team)
module.exports = router;