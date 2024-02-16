import NoteContext from "./noteContext";
import { useState } from "react";
const host = "https://inotebook-s8ov.onrender.com"
// const host = "http://localhost:5000"

const NoteState = (props) => {
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    console.log(json);
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json(); 
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 
    console.log(json);
     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;


// import NoteContext from "./noteContext";
// import { useState } from "react";

// const NoteState = (props)=>{
//     const host = 'http://localhost:5000'
//     const initialNotes = [
//       {
//         "_id": "65a6a91770ec7ca4fbc065af",
//         "user": "65a6a84570ec7ca4fbc065ac",
//         "title": "Adding a new note",
//         "description": "Testing the application",
//         "tag": "General",
//         "date": "2024-01-16T16:04:39.505Z",
//         "__v": 0
//       },
//       {
//         "_id": "65a6a92870ec7ca4fbc065b1",
//         "user": "65a6a84570ec7ca4fbc065ac",
//         "title": "Adding another new note",
//         "description": "Testing the application",
//         "tag": "General",
//         "date": "2024-01-16T16:04:56.870Z",
//         "__v": 0
//       }
//     ]
//     const [notes, setNotes] = useState(initialNotes);
//       // get all note
//     const getNotes = async ()=>{
//       // TODO: API Call
//       const url = `${host}/api/notes/fetchallnotes`;
//       const response = await fetch(url, {
//         method: "GET", // *GET, POST, PUT, DELETE, etc.
//         headers: {
//           "Content-Type": "application/json",
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//           "auth-token": localStorage.getItem('token')
//         },
//       });
//       const output = await response.json(); // parses JSON response into native JavaScript objects
//       setNotes(output);
//     }

//     // add a note
//     const addNote = async (title, description, tag)=>{
//       // TODO: API Call
//       const url = `${host}/api/notes/addnote`;
//       const response = await fetch(url, {
//         method: "POST", // *GET, POST, PUT, DELETE, etc.
//         headers: {
//           "Content-Type": "application/json",
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//           "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5OTAyYjU1Y2ZlNzgzODQxOWMzNzY3In0sImlhdCI6MTcwNDUyNjUxN30.e4JA3eoC3kTpuLq8h2eqb_gD0sIgUVh4DmNMYpm-pkA"
//         },
//         body: JSON.stringify({title, description,tag}), // body data type must match "Content-Type" header
//       });
//       const note = await response.json(); // parses JSON response into native JavaScript objects
//       console.log(note);

//       // Adding note
//       console.log("Adding a new note");
     
//       setNotes(notes.concat(note));
//     }

//     // delete a note
//     const deleteNote = async (id)=>{
//       const url = `${host}/api/notes/deletenote/${id}`;
//       const response = await fetch(url, {
//         method: "DELETE", // *GET, POST, PUT, DELETE, etc.
//         headers: {
//           "Content-Type": "application/json",
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//           "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5OTAyYjU1Y2ZlNzgzODQxOWMzNzY3In0sImlhdCI6MTcwNDUyNjUxN30.e4JA3eoC3kTpuLq8h2eqb_gD0sIgUVh4DmNMYpm-pkA"
//         },
//       });
//       const output = await response.json(); // parses JSON response into native JavaScript objects
//       console.log(output);
//       console.log("Deleting a note with id: " + id);
//       const newNotes = notes.filter(note => {return (note._id !== id)});
//       setNotes(newNotes);
//     }

//     // edit a note
//     const editNote = async (id, title, description, tag)=>{
//       // API Call
//       const url = `${host}/api/notes/updatenote/${id}`;
//       const response = await fetch(url, {
//         method: "PUT", // *GET, POST, PUT, DELETE, etc.
//         headers: {
//           "Content-Type": "application/json",
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//           "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5OTAyYjU1Y2ZlNzgzODQxOWMzNzY3In0sImlhdCI6MTcwNDUyNjUxN30.e4JA3eoC3kTpuLq8h2eqb_gD0sIgUVh4DmNMYpm-pkA"
//         },
//         body: JSON.stringify({title, description,tag}), // body data type must match "Content-Type" header
//       });
//       const output = await response.json(); // parses JSON response into native JavaScript objects
//       console.log(output);
    
//       // Logic for edit note
//       let newNotes = JSON.parse(JSON.stringify(notes));
//       newNotes.forEach((note)=>{
//         if(note._id === id){
//           note.title = title;
//           note.description = description;
//           note.tag = tag;
          
//         }
//       });
//       setNotes(newNotes)
//     }

//     return (
//         <NoteContext.Provider value = {{notes, getNotes, addNote, deleteNote, editNote}}>
//             {props.children}
//         </NoteContext.Provider>
//     )
// }

// export default NoteState;