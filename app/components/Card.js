'use client'
import React from 'react';
import { useState, useEffect } from 'react'



function Card() {




        const [data, setData] = useState(null)
        const [isLoading, setLoading] = useState(false)

        useEffect(() => {
            setLoading(true)
            fetch('https://localhost:7046/api/Users/getImages')
                .then((res) => res.json())
                .then((data) => {
                    setData(data)
                    setLoading(false)
                    data.forEach((url) => {console.log(url)})
                })
        }, [])





    return (

        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src="" alt="Sunset in the mountains"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-amber-600">The Coldest Sunset</div>
                <p className="text-white text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
                    perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                    <span
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div>
        </div>
    );

}
export default Card;