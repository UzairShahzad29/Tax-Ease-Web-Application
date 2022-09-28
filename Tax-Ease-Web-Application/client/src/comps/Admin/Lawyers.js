import React, { useState } from 'react'
import '../../css/Lawyer.css'
import axios from 'axios'

const Lawyers = ({ lawyers}) => {


    const [ input, setInput ] = useState({
        name:'', email: '', phone: '', password: ''
    })

    const handleInput = e => {

        e.preventDefault();
        setInput({
            ...input, [e.target.name]: e.target.value
        })

    }

    console.log(input)

    const handleLawyer = async e => {

        e.preventDefault();

        try {
            if(!input.name && !input.email && !input.password && !input.phone){
                alert("All fields are required!")
            }
            else{
                const res = await axios.post('/api/add-lawyer/', JSON.stringify(input), {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                console.log(res.data)
                setInput({
                    name: '', email: '', phone: '', password: ''
                })
            }
           
        } catch (error) {
            console.log(error)
        }

    }

  return (

    <section className='lawyers'> 
        <div className='lawyer-form'>
            <input type="text" placeholder='Lawyer Name' name='name' onChange={handleInput}/>
            <input type="email" placeholder='Lawyer Email' name='email' onChange={handleInput}/>
            <input type="text" placeholder='Lawyer Contact Number' name='phone' onChange={handleInput}/>
            <input type="password" placeholder='password' name='password' onChange={handleInput}/>
            <button onClick={handleLawyer}>Add Lawyer</button>
        </div>
        
        <div className='lawyer-wrapper'>
        <h1>Lawyers</h1>
            {
                lawyers !== null && lawyers !== undefined ?
                lawyers.map(lawyer => (
                    <div className='lawyer-card' key={lawyer._id}>
                        <h2>{lawyer.name}</h2>
                        <h3>{lawyer.email}</h3>
                        <h3>{lawyer.phone}</h3>
                    </div>
                ))
                : null
            }
        </div>
        
    </section>
  )
}

export default Lawyers