'use client'

import { useEffect, useState } from 'react';
import CustomerHearder from './_components/CustomerHeader';
import RestaurantFooter from './_components/RestaurantFooter';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [locations, setLocations] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showLocation, setShowLocation] = useState(false);
    const router = useRouter();

    useEffect(() => {
        loadLocations();
        loadRestaurants();
    }, []);

    const loadLocations = async () => {
        let response = await fetch("/api/customer/location");
        response = await response.json();
        if (response.success) {
            setLocations(response.result);
        }
    };

    const loadRestaurants = async (params) => {
        let url = "/api/customer";
        if (params?.locations) {
            url += "?location=" + params.locations;
        } else if (params?.restaurants) {
            url += "?restaurant=" + params.restaurants;
        }
        let response = await fetch(url);
        response = await response.json();
        if (response.success) {
            setRestaurants(response.result);
        }
    };

    const handleListItem = (item) => {
        setSelectedLocation(item);
        setShowLocation(false);
        loadRestaurants({ locations: item });
    };

    return (
        <div>
            <CustomerHearder />
            <div className='main-page-banner'>
                <h1>Food Delivery App</h1>
                <div className='inputt-wrapper'>
                    <input
                        value={selectedLocation}
                        onClick={() => setShowLocation(true)}
                        readOnly
                        className="select-input"
                        type="text"
                        placeholder="Select Place"
                    />
                    <ul className='location-list'>
                        {showLocation && locations.map((item, index) => (
                            <li key={index} onClick={() => handleListItem(item)}>{item}</li>
                        ))}
                    </ul>
                    <input
                        className="search-input"
                        onChange={(event) => loadRestaurants({ restaurants: event.target.value })}
                        type='text'
                        placeholder='Enter Food or Restaurant name'
                    />
                </div>
            </div>

            <div className='restaurant-list-container'>
                {restaurants.map((item, index) => (
                    <div
                        onClick={() => router.push('explore/' + item.name + '?id=' + item._id)}
                        key={index}
                        className='restaurant-wrapper'>
                        <div className='heading-wrapper'>
                            <h3>{item.name}</h3>
                            <h5>Contact Number: {item.contact}</h5>
                        </div>
                        <div className='address-wrapper'>
                            <div>{item.city},</div>
                            <div className='address'>{item.address}, Email: {item.email}</div>
                        </div>
                    </div>
                ))}
            </div>

            <RestaurantFooter />
        </div>
    );
}
