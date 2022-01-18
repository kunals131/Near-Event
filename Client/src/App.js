import React, { useEffect, useState } from 'react'
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3001/';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const App = () => {
  const [events,setEvents] = useState([]);
  const [form,setForm] = useState({
    title : '',
    price : 0,
    location : '',
  })
  useEffect(()=>{
    const getData = async ()=>{
      const data = await axios.get('/events');
      console.log(data);
      setEvents(data.data);
    }
    getData();
  }, []);

  const onChange = (e)=>{
    // console.log(e);
    setForm({
      ...form, 
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      console.log(form);
      const toSubmit = {
        title : form.title || 'Invalid Title',
        location : form.location || 'new Y',
        price : form.price || '123'
      }
      const res = await // Send a POST request
      axios({
        method: 'post',
        url: '/events',
        data: {
          title : form.title || 'Not Found',
          price : form.price || 0,
          location : form.location || 'NYC'
        }
      });
      console.log(res);
    }
    catch(err) {
      alert(err.message);
    }
  }

  return (

    <div>

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input value={form.title} type="text" onChange={onChange} id='title' />
          <label htmlFor="price">Price</label>
          <input value={form.price} onChange={onChange} type="number" id='price'  />
          <label htmlFor="location">Location</label>
          <input value={form.location} onChange={onChange} type="text" id="location" />
          <button>SUBMIT</button>
        </form>
      </div>



      {
       events&&events.map((e)=>(
          <div key={e._id}>
          <h1>{e.title}</h1>
          <p>{e.location}</p>
          <p>{e.price}</p>
          <hr />
          </div>
       ))
      }


    </div>
    )
}

export default App
