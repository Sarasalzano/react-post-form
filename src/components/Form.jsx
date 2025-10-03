import { useState } from "react";

//creazione del form
export default function Form (){
    //stato del form con piu campi
    const [formData, setFormData] =useState({
        id:"1",
        author:"Sara Salzano",
        title:"Cose che i cactus non ti diranno su Java",
        text:"",
        public: false,
    });

    //gestisci submit del form
    const handleSubmit= (e) =>{
        //previeni comportamento di default del submit
        e.preventDefault();
        //invia dati al server tramite POST
        axios.post("https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts", formData)
        //se la richiesta va a buon fine stampa risultato del server
        .then(res => console.log(res))
        //stampa errore in caso di errore
        .catch(err => console.error(err));
    }

    //funzione per aggiornare lo stato
    const handleChange = (e) => {
        //Destrutturazione delle proprietà dell'elemento del form su cui è avvenuto l'evento
        const {name, value, type, checked} = e.target
        //Se è un checkbox, usa valore booleano, altrimenti usa stringa
        if (type === "checkbox"){
            setFormData({...formData, [name]: checked});
        } else {
             setFormData({ ...formData, [name]: value });
        }
    } 

    return(
        <div className="wrapper">
            <h2>Crea Un Nuovo Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                <label className="form-label">Nome</label>
                <input className="text-field" type="text"
                name="author"
                required
                value={formData.author}
                onChange={handleChange} />
                </div>

                <div className="input-wrapper">
                <label className="form-label">Titolo</label>
                <input className="text-field" type="text" 
                name="title"
                required
                value={formData.title}
                onChange={handleChange} />
                </div>

                <div className="input-wrapper">
                <label className="form-label">Inserisci Testo</label>
                <textarea 
                name="text" 
                required 
                value={formData.text} 
                onChange={handleChange}/>
                </div>

                <div className="checkbox-wrapper">
                <label className="checkbox-label">Il Post è Pubblico</label>
                <input className="checkbox" type="checkbox"
                name="public" 
                checked={formData.public} 
                onChange={handleChange}/>
                </div>
                <div className="button-wrapper">
                    <button type="submit">Invia</button>
                </div>
            </form>
        </div>
    );
}