import React, { useEffect, useState } from 'react'
import "./NewCollections.css"
import new_collection from '../Assets/new_collections'
import Item from '../Item/Item'

const NewCollections = () => {
    // State's
    const [new_collection, setNew_Collection] = useState([]);
    let API_URL;
    if (process.env.REACT_APP_MODE === "production") {
        API_URL = process.env.REACT_APP_API_URL_PROD;
    } else {
        API_URL = process.env.REACT_APP_API_URL_DEV;
    }

    useEffect(() => {
        fetch(`${API_URL}/newcollections`)
            .then((response) => response.json())
            .then((data) => setNew_Collection(data));
    }, [])

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {new_collection.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default NewCollections