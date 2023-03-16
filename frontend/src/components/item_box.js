import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

/**
 * Functional component that contains the boxes containing lists
 * of items (projects, classrooms, etc.)
 * @function
 * @property text = Whether the item box should contain classrooms or projects.
 */
function ItemBox({text, list}) {

    useEffect(() => {
    }, [list]);

    return (
        <div className='ClassroomBox'>
            <div className="classrooms">
                <ul>
                    {
                        list.map((c, i) => (
                            <Link className="ItemButton green" key={i} to={`${text}/` + i}>
                                <li title={c.name}>
                                    { c.name }
                                </li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ItemBox;
