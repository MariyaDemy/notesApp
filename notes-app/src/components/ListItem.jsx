import React from 'react';
import { NavLink } from 'react-router-dom';

const ListItem = ({ note }) => {

    const showTags = () => {
        if (note && note.tag) {
            return note.tag.map((item, index) => <span key={index} className='tag'>{item}</span>)
        }
    }

    return (
        <div>
            <NavLink to={`/note/${note.id}`}>
                <div className='notes__list_item'>
                    <h3 className='notes__text'>{note.body.slice(0, 45)}</h3>
                    <span>{showTags()}</span>
                </div>
            </NavLink>
        </div>
    )
}

export default ListItem;
