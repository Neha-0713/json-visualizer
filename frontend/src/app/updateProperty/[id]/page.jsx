'use client';
import axios from 'axios';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const updateProperty = () => {

    const { id } = useParams();
    const [propertyData, setpropertyData] = useState(null);
    const router = useRouter();

    const getpropertyData = async () => {
        const res = await axios.get('http://localhost:5000/realstate/getbyid/' + id);
        console.log(res.data);
        setpropertyData(res.data);
    }
    useEffect(() => {
        getpropertyData();
    }, [])

    const submitForm = (values) => {
        console.log(values);

        axios.put('http://localhost:5000/realstate/update/' + id, values)
        .then((result) => {

            toast.success('User Updated Successfully');
            router.back();

        }).catch((err) => {
            console.log(err);
            toast.error('Failed to Update User');
        });

    }

    return (
      
        <div className='max-w-[50%] mx-auto'>
            <h1 className='text-center font-bold mt-5 text-3xl'>Update Property</h1>
            {
                propertyData !== null ? (
                    <Formik initialValues={propertyData} onSubmit={submitForm}>
                        {(updateForm) => {
                            return <form onSubmit={updateForm.handleSubmit}>
                                <label htmlFor="description">Description</label>
                                <input
                                    id='description'
                                    onChange={updateForm.handleChange}
                                    value={updateForm.values.description}
                                    type="text" className='mb-5 border-2 border-gray-300 rounded-md px-3 py-1 block w-full' />
                                <label htmlFor="location">Location</label>
                                <input
                                    id='location'
                                    onChange={updateForm.handleChange}
                                    value={updateForm.values.location}
                                    type="text" className='mb-5 border-2 border-gray-300 rounded-md px-3 py-1 block w-full' />
                                <label htmlFor="area">Area</label>
                                <input
                                    id='area'
                                    onChange={updateForm.handleChange}
                                    value={updateForm.values.area}
                                    type="text" className='mb-5 border-2 border-gray-300 rounded-md px-3 py-1 block w-full' />
                                <label htmlFor="price">Price</label>
                                <input
                                    id='price'
                                    onChange={updateForm.handleChange}
                                    value={updateForm.values.price}
                                    type="city" className='mb-5 border-2 border-gray-300 rounded-md px-3 py-1 block w-full' />
                                <button className='bg-[#91766E] text-white px-4 py-2 rounded-xl mt-5'>Submit</button>
                            </form>
                        }}
                    </Formik>
                ) : (
                    <h1>Loading...</h1>
                )
            }
        </div>
        
    )
}
export default updateProperty;