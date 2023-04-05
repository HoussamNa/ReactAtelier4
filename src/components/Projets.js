import React, { useEffect, useState } from "react";
import AddProjet from "./AjouterProjet";
import ModProjet from "./ModProjet";

//const url = "http://localhost:8080/projets/dev";
const url = "https://spring-rest-api-2023.herokuapp.com/projets/dev";
function Projets() {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    loadProjets();
  }, []);

  const loadProjets = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProjets(data));
  };

  const deleteProjet = (id) => {
    if (id < 11)
    {
      alert ("les projets 1 à 10 ne peuvent pas être supprimés")
      return;
    }
    fetch(url + "/" + id, { method: "DELETE" })
      .then(setProjets(projets.filter((el) => el.idProjet !== id)))
      .catch((err) => console.log(err));
  };
  const ajouterProjet = (p) => {
    let data = JSON.stringify(p);
    let head = { "content-type": "application/json" };
    fetch(url, { method: "POST", headers: head, body: data })
      .then((response) => response.json())
      .then((p) => setProjets([...projets, p]))
      .catch((er) => {
        console.log(er);
      });
  };
  const modifierProjet = (p) => {
    if (p.idProjet < 11)
    {
      alert ("les projets 1 à 10 ne peuvent pas être modifiés")
      return;
    }
    let data = JSON.stringify(p);
    let head = { "content-type": "application/json" };
    fetch(url, { method: "PUT", headers: head, body: data })
      .then((response) => response.json())
      .then((p) => {
        let liste = projets.map((item) => {
          if (item.idProjet === p.idProjet) return p;
          else return item;
        });
        setProjets(liste);
        setEdition(false);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const [mode, setEdition] = useState(false); // false mode ajout par défaut.
  const modeAdd = <AddProjet onAdd={ajouterProjet} />;
  const [projet , setProjet]=useState({}); // projet à modifier
  const modeEdition = <ModProjet onEdit={modifierProjet} projet={projet}/>;
  const formEdit=(item)=>{setProjet(item); setEdition(true);}
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Langage</th>
          </tr>
        </thead>
        <tbody>
          {projets.map((item) => (
            <tr key={item.idProjet}>
              <th>{item.idProjet}</th>
              <td>{item.description}</td>
              <td>{item.langage}</td>
              <td>
                <button onClick={() => deleteProjet(item.idProjet)}>
                  Supprimer
                </button>
              </td>
              <td>
                <button onClick={() => formEdit(item)}>
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mode ? modeEdition : modeAdd}
    </div>
  );
}

export default Projets;
