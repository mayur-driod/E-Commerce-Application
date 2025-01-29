import React from 'react'
import { Productcard } from '../Component/Productcard'

const productdetails = [
    {
    name: "Product1",
    image: "https://inspgr.id/app/uploads/2015/03/product-design-koziol-04.jpg",
    price: "1000",
    description: "Description1"
    },
    {
    name: "Product2",
    image: "https://i.pinimg.com/originals/de/28/b9/de28b979a75113cdb0c626f200d409bf.jpg",
    price: "2000",
    description: "Description2"
    }
]

export const Home = () => {
    return (
      <div>
        {productdetails.map((product, index) => {
            return(
            <> 
               <Productcard key={index} {...product} />
            </>
            )
})}
      </div>
    );
  };
  
