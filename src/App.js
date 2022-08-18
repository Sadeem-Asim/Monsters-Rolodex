import React, { Component } from "react";
import "./App.css";
import { SearchBox } from "./components/search-box/search.component";
import { CardList } from "./components/card-list/card-list.component";
// import MetaCard from "./components/meta-card/metaCard.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => this.setState({ monsters: users }));
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { monsters, searchField } = this.state;
    // filter function
    // const filteredMonsters = monsters.filter((monster) =>
    //   monster.name.includes(searchField.toLowerCase())
    // );
    // => using foreach function
    const filteredMonsters = [];
    monsters.forEach((monster) => {
      if (monster.name.toLowerCase().includes(searchField.toLowerCase())) {
        filteredMonsters.push(monster);
      }
    });

    return (
      <div className="app">
        {/* <h1>Meta Mask </h1> */}
        {/* <MetaCard /> */}
        <h1> Monsters Rolodex</h1>
        <SearchBox
          placeholder="Search Monster"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
export default App;
