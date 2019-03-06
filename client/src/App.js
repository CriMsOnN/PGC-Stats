import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './assets/projectExtreme.png';
import Addnewteam from './Components/Addnewteam';
import Updateteam from './Components/Updateteam';
import Deleteteam from './Components/Deleteteam';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      intervalIsSet: false,
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
          <button type="button" className="btn btn-primary outer" data-toggle="modal" data-target="#exampleModal" data-whatever="addNewTeam">Add</button>
          <button type="button" className="btn btn-primary outer" data-toggle="modal" data-target="#exampleModal2" data-whatever="deleteteam">Delete</button>
          <button type="button" className="btn btn-primary outer" data-toggle="modal" data-target="#exampleModal3" data-whatever="updateteam">Update</button>
        </div>
        <Addnewteam dataAccess={this.state.data} />
        <Updateteam dataAccess={this.state.data} />
        <Deleteteam dataAccess={this.state.data} />
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
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="footer" style={{ position: "fixed" }}>
                <p>Copyright © 2019 PGC. All rights Reserved<br />This project is under development so nothing is perfect</p>
              </div>
            </div>
          ) : ""
        }
      </div>
    )
  }
}

export default App;