import React from 'react'
import { useState } from "react";

export default function ModProjet(props) {

  const [projet, setProjet] = useState(props.projet);

  const {idProjet, description, langage} = projet;

  const onInputChange = (e) => {
    setProjet({ ...projet, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.onEdit (projet);
  };

  return (
    <div className="App">
      <div>
        <div>
          <h2>Modifier le projet</h2>

          <form onSubmit={(e) => onSubmit(e)}>
          <div>
              <label htmlFor="idProjet">Id:</label>
              <input
                readOnly
                type={"text"}
                name="idProjet"
                value={idProjet}
                onChange={(e) => onInputChange(e)}
              />
            </div>
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