import React from "react";
import { useState } from "react";
import validerLangage from "../tools/langages";
function valider(input) {
  let regex = /projet\d{0,10}/i;
  return regex.test(input);
}
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
    if (!valider(projet.description))
    {
      alert ("la description est incorret: 'projet + 10 chiffres max");
      return;
    }
    if (!validerLangage(projet.langage))
    {
      alert ("le langage n'est pas valide");
      return;
    }
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
