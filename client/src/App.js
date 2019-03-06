import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './assets/projectExtreme.png';
import Addnewteam from './Components/Addnewteam';
import Updateteam from './Components/Updateteam';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      intervalIsSet: false,
      nameToDelete: null,
      nameToUpdate: null
    }
  }

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000)
      this.setState({ intervalIsSet: interval })
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet)
      this.setState({ intervalIsSet: null })
    }
  }

  handleSelectChange = (event) => {
    this.setState({
      nameToDelete: event.target.value
    })
  }

  deleteDB = (name, e) => {
    this.state.data.forEach(dat => {
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

  getDataFromDb = () => {
    fetch("https://pgcstats.herokuapp.com/teams/listTeams")
      .then(data => data.json())
      .then(res => {
        res.sort((a, b) => b.score - a.score)
        this.setState({
          data: res
        })
      })
  }


  render() {
    const { data } = this.state;
    return (
      <div className="container">
        <div className="inline">
          <img className="image" src="https://discordapp.com/api/guilds/362993221229346818/embed.png" alt="Discord Server" />
          <button type="button" className="btn btn-primary outer" data-toggle="modal" data-target="#exampleModal" data-whatever="addNewTeam">Add team</button>
        </div>
        <div className="logo">
          <img src={logo} alt={"logo"} />
        </div>
        {
          data.length > 0 ? (
            <div>
              <table className="table table-dark table-hover table-borderless">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Points</th>
                    <th scope="col">Captain</th>
                    <th scope="col">Average Placement</th>
                    <th scope="col">Kills</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((m, i) => (
                    <tr key={i}>
                      <td key={i}></td>
                      <td>{m.name}</td>
                      <td>{m.score}</td>
                      <td>{m.captain}</td>
                      <td>{m.placement}</td>
                      <td>{m.kills}</td>
                      <td><button onClick={(e) => {
                        this.setState({
                          nameToDelete: m.name
                        }, () => {
                          this.deleteDB(this.state.nameToDelete, e)
                        })
                      }}><i className="fas fa-trash" alt="Delete"></i></button>
                        <button onClick={() => {
                          this.setState({
                            nameToUpdate: m.name
                          })
                        }} data-toggle="modal" data-target="#exampleModal3"><i className="fas fa-edit" alt="Update"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Addnewteam dataAccess={this.state.data} />
              <Updateteam dataAccess={this.state.data} update={this.state.nameToUpdate} />
              <div className="footer" style={{ position: "fixed" }}>
                <p>Copyright © 2019 PGC. All rights Reserved<br />This project is under development.<br />More comming soon.</p>
              </div>
            </div>
          ) : ""
        }
      </div>
    )
  }
}

export default App;
