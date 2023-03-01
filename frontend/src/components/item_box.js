import React, {useState} from "react";

/**
 * Functional component that contains the boxes containing lists 
 * of items (projects, classrooms, etc.)
 * @function
 * @param text = Whether the item box should contain classrooms or projects.
 */
function ItemBox({text}) {
    let state = null;

    if (text === "Classroom")
    {
        state = {
            type: 'classrooms',
            listitems: [
                {
                    id: 0,
                    text: 'Classroom 1',
                    modifier: 'ItemButton blue'
                },
                {
                    id: 1,
                    text: 'Classroom 2',
                    modifier: 'ItemButton blue'
                },
                {
                    id: 2,
                    text: 'Classroom 3',
                    modifier: 'ItemButton green'
                },
                {
                    id: 3,
                    text: 'Classroom 4',
                    modifier: 'ItemButton green'
                }
            ]
        };
    } else {
        state = {
            type: 'projects',
            listitems: [
                {
                    id: 0,
                    text: 'Project 1',
                    modifier: 'ItemButton blue'
                },
                {
                    id: 1,
                    text: 'Project 2',
                    modifier: 'ItemButton blue'
                },
                {
                    id: 2,
                    text: 'Project 3',
                    modifier: 'ItemButton green'
                },
                {
                    id: 3,
                    text: 'Project 4',
                    modifier: 'ItemButton green'
                }
            ]
        };
    }


    return (
        <div className='ClassroomBox'>
            <div className={state.type}>
                <ul>
                    {state.listitems.map(listitem => (
                        <a className={listitem.modifier} key={listitem.id} href={`${state.type}/${listitem.id}/`}>
                            <li title={listitem.text}>
                                { listitem.text }
                            </li>
                        </a>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ItemBox