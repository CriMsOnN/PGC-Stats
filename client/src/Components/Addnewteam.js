import React, { Component } from 'react'
import axios from 'axios';


class Addnewteam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            score: null,
            captain: null,
        }
    }
    putDataToDB = (name, captain, e) => {
        e.preventDefault();
        let currentIds = this.props.dataAccess.map(data => data.id)
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post("https://pgcstats.herokuapp.com/teams/createTeam", {
            id: idToBeAdded,
            name: name,
            captain: captain
        })
    }


    render() {
        return (
            <div className="addnewteam">
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label className="col-form-label">New team</label>
                                        <input
                                            type="text"
                                            onChange={e => this.setState({ name: e.target.value })}
                                            className="form-control"
                                            placeholder="Enter the team name"
                                        />
                                        <input
                                            type="text"
                                            onChange={e => this.setState({ captain: e.target.value })}
                                            className="form-control"
                                            placeholder="Enter team captain"
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button data-dismiss="modal" className="btn btn-primary submitApprove" onClick={(e) => this.putDataToDB(this.state.name, this.state.captain, e)}>
                                            Add team
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

export default Addnewteam;