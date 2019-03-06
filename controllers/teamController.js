const mongoose = require('mongoose')
const Teams = require('../models/teamModel')

exports.createTeam = (req, res) => {
    let newTeam = new Teams(req.body)
    newTeam.save((err, team) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(team)
        }
    })
}

exports.list_all_teams = (req, res) => {
    Teams.find({}, (err, team) => {
        if (err) {
            res.send(err);
        } else {
            let mysort = { score: -1 };
            res.json(team)
        }
    })
}

exports.update_team = (req, res) => {
    const { name, score, placement, kills } = req.body;
    Teams.findOneAndUpdate(
        {
            name
        },
        {
            name,
            score,
            placement,
            kills
        },
        {
            new: true
        })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.send(err)
        })

}

exports.delete_team = (req, res) => {
    const { name } = req.body;
    Teams.remove({
        name
    }).then(resp => {
        res.send(resp)
    }).catch(err => {
        res.send(err)
    })
}