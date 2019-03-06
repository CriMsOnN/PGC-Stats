import React, { Component } from 'react';
import axios from 'axios';


class Deleteteam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameToDelete: null,
        }
    }


    handleSelectChange = (event) => {
        this.setState({
            nameToDelete: event.target.value
        })
    }
    deleteDB = (name, e) => {
        e.preventDefault();
        this.props.dataAccess.forEach(dat => {
            if (dat.name === this.state.nameToDelete) {
                name = dat.name
            }
        })
        axios.delete("https://pgcstats.herokuapp.com/teams/deleteTeams", {
            data: {
                name: this.state.nameToDelete
            }
        })
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label className="col-form-label">Delete Team</label>
                                        <br />
                                        <select name="teams" onClick={this.handleSelectChange}>
                                            <option value="">Choose one</option>
                                            {
                                                this.props.dataAccess.map((m) => {
                                                    return (
                                                        <option key={m.id} value={m.name}>{m.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button data-dismiss="modal" className="btn btn-primary" onClick={(e) => this.deleteDB(this.state.nameToDelete, e)}>
                                            Delete
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


export default Deleteteam;