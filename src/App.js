import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  const url = "https://mern-app-329.herokuapp.com";

  // set State to hold list of birds
  const [birds, setBirds] = React.useState([]);

  //empty bird for the create form
  const emptyBird = {
    name: "",
    img: "",
    description: "",
  };

  const [selectedBird, setSelectedBird] = React.useState(emptyBird);

  //get / call list of all birds
  const getBirds = () => {
    fetch(url + "/birds/")
      .then((response) => response.json())
      .then((data) => {
        setBirds(data);
      });
  };

  //useEffect to get data upon page load
  React.useEffect(() => {
    getBirds();
  }, [selectedBird]);

  //handleCreate for when form is submitted
  const handleCreate = (newBird) => {
    fetch(url + "/birds/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBird),
    }).then(() => getBirds());
  };

  //handleUpdate for when the edit form is submitted
  const handleUpdate = (bird) => {
    fetch(url + "/birds/" + bird._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bird),
    }).then(() => getBirds());
  };

  const selectBird = (bird) => {
    setSelectedBird(bird);
  };

  //deleteBird
  const deleteBird = (bird) => {
    fetch(url + "/brids/" + bird._id, {
      method: "delete",
    }).then(() => {
      getBirds();
    });
  };

  //function to specify which bird we updated

  return (
    <div className="App">
      <h1>Birdex</h1>
      <hr />
      <Link to="/create">
        <button>Add bird</button>
      </Link>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display
                {...rp}
                birds={birds}
                selectBird={selectBird}
                deleteBird={deleteBird}
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                bird={emptyBird}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form
                {...rp}
                label="update"
                bird={selectedBird}
                handleSubmit={handleUpdate}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
