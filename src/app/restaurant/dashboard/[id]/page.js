'use client'

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const EditFoodItem = (props) => {
   const { id } = use(props.params);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [path, setPath] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
    const router=useRouter();

    useEffect(()=>{
       handleLoadFoodItem();
    }, [])

    const handleLoadFoodItem=async ()=>{
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+id);
         response = await response.json();
         if(response.success){
            console.log(response.result);
            setName(response.result.name);
            setPrice(response.result.price);
            setPath(response.result.path);
            setDescription(response.result.description);
         }
    }

    const handleEditFood = async () => {
        if (!name || !price || !path || !description) {
            setError(true);
            return false
        } else {
            setError(false);
        }
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+id,{
            method: 'PUT',
            body:JSON.stringify({name,price,path,description})
        });
        response = await response.json();
        if(response.success){
            alert("Data has been Uodated")
            router.push("../dashboard")
        }else{
            alert("Data is not updated please try again")
        } 

    }
    return (
        <div className="container">
            <h1>Update Food Item</h1>
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
                <button className="button" onClick={handleEditFood}>Update Food Item</button>
            </div>
            <div className="input-wrapper">
                <button className="button"  onClick={()=>router.push('../dashboard')} >Back Food Menu</button>
            </div>
        </div>
    );
};

export default EditFoodItem;
