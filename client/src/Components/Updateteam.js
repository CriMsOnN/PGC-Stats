import React, { Component } from 'react';
import axios from 'axios';

class Updateteam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameToUpdate: this.props.update,
            scoreToUpdate: null,
            placementToUpdate: 0,
            killsToUpdate: 0,
            gamesPlayed: 0
        }
    }
    updateDB = (name, score, placement, kills, e) => {
        let placementUpdate = null;
        let killsUpdate = null;
        e.preventDefault();
        this.props.dataAccess.forEach(dat => {
            if (dat.name === this.props.update) {
                name = dat.name;
                score = this.state.scoreToUpdate;
                placementUpdate = parseFloat((dat.placement + this.state.placementToUpdate) / this.state.gamesPlayed).toFixed(2);
                killsUpdate = dat.kills + this.state.killsToUpdate;
            }
        })
        axios.post("https://pgcstats.herokuapp.com/teams/updateTeams", {
            name,
            score,
            placement: placementUpdate,
            kills: killsUpdate
        })
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label className="col-form-label">Update Team</label><br />
                                        {/* <select name="teams" onClick={this.handleSelectChange}>
                                            <option value="">Choose one</option>
                                            {
                                                this.props.dataAccess.map((m) => {
                                                    return (
                                                        <option key={m.id} value={m.name}>{m.name}</option>
                                                    )
                                                })
                                            }
                                        </select> */}
                                        <input
                                            type="text"
                                            onChange={e => this.setState({ scoreToUpdate: e.target.value })}
                                            className="form-control"
                                            placeholder="Enter the new score"
                                        />
                                        <input
                                            type="text"
                                            onChange={e => this.setState({ placementToUpdate: parseInt(e.target.value) })}
                                            className="form-control"
                                            placeholder="Enter the placement"
                                        />
                                        <input
                                            type="text"
                                            onChange={e => this.setState({ killsToUpdate: parseInt(e.target.value) })}
                                            className="form-control"
                                            placeholder="Enter the kills"
                                        />
                                        <input
                                            type="text"
                                            onChange={e => this.setState({ gamesPlayed: parseInt(e.target.value) })}
                                            className="form-control"
                                            placeholder="Games played"
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button data-dismiss="modal" className="btn btn-primary" onClick={(e) => this.updateDB(this.props.update, this.state.scoreToUpdate, this.state.placementToUpdate, this.state.killsToUpdate, e)}>
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Updateteam;