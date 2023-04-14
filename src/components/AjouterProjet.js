import React from "react";
import { useState } from "react";

export default function AddProjet(props) {
  const [projet, setProjet] = useState({
    description: "",
    langage: "",
  });

  const {description, langage} = projet;

  const onInputChange = (e) => {
    setProjet({ ...projet, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    props.onAdd (projet);
  };

  return (
    <div className="App">
      <div>
        <div>
          <h2>Ajouter un projet</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type={"text"}
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div>
              <label htmlFor="langage">Langage:</label>
              <input
                type={"text"}
                placeholder="langage"
                name="langage"
                value={langage}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
