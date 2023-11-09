'use client'
import React from 'react';
import { useState, useEffect } from 'react'
import {data} from "autoprefixer";



function Card() {

        // 2. Create our *dogImage* variable as well as the *setDogImage* function via useState
        // We're setting the default value of dogImage to null, so that while we wait for the
        // fetch to complete, we dont attempt to render the image
        let [urlArray, setUrlArray] = useState(null)

        // 3. Create out useEffect function
        useEffect(() => {
            fetch("https://localhost:7046/api/Users/getImages")
                .then(response => response.json())
                // 4. Setting *dogImage* to the image url that we received from the response above
                .then(data => setUrlArray(Object.values(data)))

        },[])

        if (urlArray == null){
            return <div style={{color:'white'}}>waiting for data...</div>
        }
urlArray.map(url => {
    console.log(url.substring(7))
})
    return <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gridAutoRows: '15fr', gridGap: '10px', width: '100%'}}>
        {urlArray.map((url, index) => (

                    <div key={index}  className="max-w-sm rounded overflow-hidden shadow-lg" style={{}}>
                        <img className="w-full" src={'https://localhost:7046' + url.substring(7)} alt="Sunset in the mountains" style={{width: '400px', height: '400px', objectFit: 'cover'}} />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-amber-600">The Coldest Sunset</div>
                            <p className="text-white text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores
                                et
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


            )
            )
        }

    </div>

    }



export default Card;