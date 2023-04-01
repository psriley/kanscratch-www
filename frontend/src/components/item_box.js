import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

/**
 * Functional component that contains the boxes containing lists
 * of items (projects, classrooms, etc.)
 * @function
 * @property text = Whether the item box should contain classrooms or projects.
 */
function ItemBox({text, list, color, slug}) {
    // const [hex, setHex] = useState(null);
    //
    // useEffect(() => {
    //     debugger;
    //     if (text === 'classroom') {
    //         console.log(list);
    //         setHex(list.map((c) => {
    //             return c.color.hex_code
    //         }));
    //     }
    // }, [list, text]);

    return (
        <div className='ClassroomBox'>
            <div className="classrooms">
                <ul>
                    {
                        list.map((c, i) => (
                            <Link className={`ItemButton green`} key={i+1} to={`${text}/${i+1}`} state={{ slug: slug }}>
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
