import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem';
import { NavLink } from 'react-router-dom';
import { ReactComponent as AddBtn } from '../assets/imgs/add.svg';
import { ReactComponent as Search } from '../assets/imgs/search.svg';

const NotesListPage = () => {
    const [notes, setNotes] = useState([]);
    const [value, setValue] = useState('');

    // получить данные из json server
    const getNotes = async () => {
        await fetch('http://localhost:5000/notes')
            .then((response) => response.json())
            .then((data) => setNotes(data))
    }
    // при загрузке страницы получаем данные из db.json server
    useEffect(() => {
        getNotes()
    }, [])

    const searchTag = (event) => {
        setValue(event.target.value);
    }

    const filteredNotes = notes.filter(item => {
        // поиск только по тегу независимо от регистра
        return item.tag.some(el => el.toLowerCase().includes(value.toLowerCase()))
        // либо поиск по всему тексту заметки
        // return item.body.includes(value)
    })

    return (
        <div className='notes'>
            <div className='notes__header'>
                <form className='form'>
                    <Search className="form__icon"></Search>
                    <input type="text"
                        className='form__search'
                        placeholder='enter a #tag'
                        onChange={searchTag} />
                </form>
            </div>
            <div className='notes__list'>
                {filteredNotes.map((note) => <ListItem key={note.id} note={note}></ListItem>)}
            </div>
            <NavLink to="/note/new" className="addBtn">
                <AddBtn ></AddBtn>
            </NavLink>
        </div>
    )
}

export default NotesListPage;
