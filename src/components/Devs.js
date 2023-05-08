import React, { useState, useEffect } from 'react';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, TextField } from '@mui/material';
import { Edit } from '@mui/icons-material';







export default function Devs() {
    const columns = [
        {
            field : "dev_id", Headername : "ID", width : 90
        },
        {
            field : "nom", Headername : "Nom", width : 200
        },
        {
            field : "email", Headername : "Email", width : 250
        },
        {
            field : "actions" ,
            Headername : "Actions" , 
            width:150 ,
            renderCell: (params)=> (
                <div>
                    <IconButton
                    onClick={()=>handleEditClick(params.row)}
                    >
                        <Edit color='primary' />
    
                    </IconButton>
                    <IconButton
                    onClick={()=>handleDeleteClick(params.row.dev_id)}
                    > 
                    <GridDeleteIcon color='error' />
                    </IconButton>
                </div>
            )
        }
    ];

const [developeurs , setDevelopeurs] = useState([]);
useEffect( () => {
    fetch("http://localhost:8080/devs")
    .then((response) => response.json())
    .then((data) => setDevelopeurs(data));
},
[]);
const handleDeleteClick = (dev_id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce dev?")) {
       deleteDevelopeur(dev_id);
    }
};
const [dialogMode, setDialogMode] = useState('add');
const[selectedDevelopeur,setSelectedDevelopeur]=useState({
    dev_id:"",
    nom:"",
    email:"",
});
const [open,setOpen]=useState(false);
const handleDialogClose=() =>{
    setOpen(false);
};
const handleSaveClick= () =>{
    if(dialogMode ==="add"){
        addDeveloppeur(selectedDevelopeur);
    } else 
    {
        updateDeveloppeur(selectedDevelopeur);
    }
    setOpen(false);
};
const addDeveloppeur=(developeur)=> {
    fetch("http://localhost:8080/devs", {
        method:"POST",
        headers :{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(developeur),
    })
    .then((response)=>response.json())
    .then((data)=>setDevelopeurs((prevState)=>[...prevState,data]));
};

const updateDeveloppeur =(developeur)=>{
    fetch(`http://localhost:8080/devs/${developeur.dev_id}`,
    {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(developeur),
    }
    )
    .then((response)=>response.json())
    .then((data)=>
    setDevelopeurs((prevState)=>
    prevState.map((row)=>(row.dev_id===data.dev_id ? data : row))
    )
    );
};
const handleEditClick=(selectedRow)=>{
    setDialogMode("edit");
    setSelectedDevelopeur(selectedRow);
    setOpen(true);
};
<Dialog open={open} onClose={handleDialogClose}>
 <DialogTitle>
    {
        dialogMode==='add'
        ? "Ajouter un développeur"
        : "Modifier un développeur"
    }
 </DialogTitle>
 <DialogContent>
    <DialogContentText>
        Remplissez les champs suivants :
    </DialogContentText>
    <TextField
        autoFocus
        margin="dense"
        name="nom"
        label="Nom"
        type="text"
        fullWidth
        value={selectedDevelopeur.nom}
        //onChange={handleInputChange}
        />
    <TextField
         autoFocus
         margin="dense"
         name="email"
         label="Email"
         type="email"
         fullWidth
         value={selectedDevelopeur.email}
         //onChange={handleInputChange}
         />

 </DialogContent>
 <DialogActions>
    <button onClick={()=>handleDialogClose()}>Annuler</button>
    <button onClick={()=> handleSaveClick()}color='primary'>Sauvgarder</button>
 </DialogActions>
 
 </Dialog>
 
 
 const handleAddClick=()=>{
    setDialogMode("add")
    setSelectedDevelopeur({dev_id:"",nom :"",email:""});
    setOpen(true);
 };
 
const deleteDevelopeur = (dev_id) => {
    fetch(`http://localhost:8080/devs/${dev_id}`, {
        method: "DELETE",
    }).then(() => 
         setDevelopeurs((prevState) =>
         prevState.filter((row) => row.dev_id !== dev_id)
         )
    );

};
    return (
        <Stack>
        <DataGrid 
        rows={developeurs} 
        columns={columns} 
        autoHeight={true}
        getRowId={(row) => row.dev_id }
        />
        <Button
 color="primary"
 variant="contained"
 onClick={()=>handleAddClick()}
 >
    Ajouter
 </Button>
    </Stack>
    
);
}