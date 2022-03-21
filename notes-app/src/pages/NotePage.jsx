import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/imgs/arrow-left.svg';
import { ReactComponent as Done } from '../assets/imgs/check.svg';


const NotePage = (props) => {
    const params = useParams(); //получить URL параметры
    const noteId = params.id;
    const [note, setNote] = useState(null);

    // работает, когда [noteId] обновляет своё значение
    useEffect(() => {
        getNote()
    }, [noteId])

    const getNote = async () => {
        if (noteId === "new") return
        await fetch(`http://localhost:5000/notes/${noteId}`)
            .then((response) => response.json())
            .then((data) => setNote(data))
    }

    const handleChange = (event) => {
        let regex = /#\S*/ig;
        setNote({
            ...note,
            "body": event.target.value,
            "tag": event.target.value.match(regex)
        })

    }

    const updateNote = async () => {
        // чтобы при отправке данных значение "tag" !== null
        function replacer(key, value) {
            return (value === null) ? [''] : value;
        }
        await fetch(`http://localhost:5000/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note, replacer)
        })
    }

    const createNote = async () => {
        function replacer(key, value) {
            return (value === null) ? [''] : value;
        }
        await fetch('http://localhost:5000/notes/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note, replacer)
        })
    }

    const deleteNote = async () => {
        await fetch(`http://localhost:5000/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
    }

    const handleClick = () => {
        if (!note.body && noteId !== "new") {
            deleteNote()
        } else if (noteId !== "new") {
            updateNote()
        }
        else if (note !== null && noteId === "new") {
            createNote()
        }
    }

    const showTags = () => {
        if (note && note.tag) {
            return note.tag.map((item, index) => <span className='tag' key={index}>{item}</span>)
        }
    }

    return (
        <div className='note'>
            <div className='note__header'>
                <NavLink to="/">
                    <ArrowLeft onClick={handleClick} className="backBtn"></ArrowLeft>
                </NavLink>
                <NavLink to="/">
                    {noteId === "new" ? (<button onClick={handleClick}><Done></Done></button>) :
                        (<button onClick={deleteNote}>Delete</button>)
                    }
                </NavLink>
            </div>
            <textarea onChange={handleChange} value={note?.body}></textarea>
            <div>{showTags()}</div>
        </div>
    )
}

export default NotePage;
