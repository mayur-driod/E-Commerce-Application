import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

function Productform() {
const [name, setName] = useState('');
const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const [stock, setStock] = useState('');
const [tags, setTags] = useState('');
const [email, setEmail] = useState('');

const [preview, setPreview] = useState([]);
const [image, setImage] = useState([]);

const handleImage = (e) => {
    const file = Array.from(e.target.files)
    setImage((pre)=>pre.concat(file))
    const img = file.map((file) => URL.createObjectURL(file))
    setPreview((pre) => pre.concat(img))
}

const handlesubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('stock', stock)
    formData.append('tags', tags)
    formData.append('email', email)
    image.forEach((img) => {
        formData.append('image', img)
    })

    console.log(formData)
    const res = await axios.post('http://localhost:3000/product/post-product', formData, {headers: {'content-type': 'multipart/form-data'}})

    if (res.status === 200) {
        setEmail('')
        setName('')
        setTags('')
        setCategory('')
        setStock('')
        setPrice('')
        setDescription('')
        setImage([])
        setPreview([])
    }
}


  return (
    <div className="max-w-2xl mx-auto p-4">
        <form onSubmit={handlesubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required placeholder='Enter your email' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input type="text" onChange={(e)=>setName(e.target.value)} value={name} required placeholder='Enter your name' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Tag</label>
                <input type="text" onChange={(e)=>setTags(e.target.value)} value={tags} required placeholder='Enter tag' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                <input type="text" onChange={(e)=>setCategory(e.target.value)} value={category} required placeholder='Enter category' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />    
            </div>
            <div className="mb-4">
                <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Stock</label>
                <input type="number" onChange={(e)=>setStock(e.target.value)} value={stock} required placeholder='Enter stock' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                <input type="number" onChange={(e)=>setPrice(e.target.value)} value={price} required placeholder='Enter price' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description} required placeholder='Enter description' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4 flex items-center justify-center">
                <label htmlFor="upload" className="cursor-pointer text-3xl text-blue-500">
                    <AiOutlinePlusCircle />
                    <input type="file" onChange={(e)=>handleImage(e)} required multiple id='upload' className="hidden" />
                </label>
            </div>
            <div className="mb-4 flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Submit
                </button>
            </div>
            <div className="mb-4">
                {preview.map((img, index) => {
                    return <img src={img} key={index} alt='' className="w-32 h-32 object-cover rounded-md shadow-md" />
                })}
            </div>
        </form>
    </div>
  )
}

export default Productform