'use client'

import { useState } from "react";

const AddFoodItem = (props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [path, setPath] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);

    const handleAddFood = async () => {
        if (!name || !price || !path || !description) {
            setError(true);
            return false
        } else {
            setError(false);
        }
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        if (!restaurantData || !restaurantData._id) {
            alert("Restaurant not logged in!");
            return;
        }

        const resto_id = restaurantData._id;

        const response = await fetch("/api/restaurant/foods", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, price, path, description, resto_id })
        });

        const data = await response.json();

        if (data.success) {
            alert("Food Added Successfully");
            setName('');
            setPrice('');
            setPath('');
            setDescription('');
            props.setAddItem(false);
        } else {
            alert("Error adding food item");
        }
    };

    return (
        <div className="container">
            <h1>Add New Food Item</h1>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Food Name" value={name} onChange={(e) => setName(e.target.value)} />
                {error && !name && <span className="input-error">Please enter valid data</span>}
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Food Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                {error && !price && <span className="input-error">Please enter valid data</span>}
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Image Path" value={path} onChange={(e) => setPath(e.target.value)} />
                {error && !path && <span className="input-error">Please enter valid data</span>}
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Food Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                {error && !description && <span className="input-error">Please enter valid data</span>}
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleAddFood}>Add Food Item</button>
            </div>
        </div>
    );
};

export default AddFoodItem;
