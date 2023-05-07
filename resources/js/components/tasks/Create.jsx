import { useEffect, useState } from "react";

import Header from '../Header'
import {  useNavigate } from "react-router-dom";
import useCategories from "../../custom/useCategories";
import Swal from "sweetalert2";

const options = ["Low", "Medium", "High"];

function TaskForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchCategories = async ()=>{
    const fetchedCategories = await useCategories();
    setCategories(fetchedCategories)
  }

  useEffect(()=>{
    fetchCategories()
  }, [])

  const createTask=async (e)=>{
    setLoading(true);
    e.preventDefault();
    const task ={
      title , 
      body,
      category_id: categoryId
    };try{
      await axios.post('api/tasks', task);
      Swal.fire({
        position:'top-end',
        icon:'success',
        title: 'your task has been saved .',
        showConfirmButton:false,
        timer: 1500
      });
      setLoading(false);
      navigate('/tasks');
    }catch(error){
      console.log(error)
      setLoading(false);
      setErrors(error.response.data.errors);
    }
  }

  const renderErrors = (field) => {
    return errors?.[field]?.map((error, index) => (
      <div key={index} className="text-white p-1 my-2 rounded bg-danger">
        {error}
      </div>
    ));
  };
  

  return (
    <>
    <Header/>
    <form onSubmit={(e)=>createTask(e)}  style={{ width: "75%", margin: "auto", marginTop: '10px', backgroundColor: "orange", boxShadow: "0 10px 10px rgba(0, 0, 0.2, 0.5)", padding: "20px" }}>
      <h2 style={{ color: "white" }}>Create Task</h2>
      <label style={{ display: "block", margin: "10px 0", color: "white" }}>
        Task Name:
        <input onChange={(e)=>setTitle(e.target.value)} value={title }  type="text"  style={{ marginLeft: "10px", padding: "10px", border: "none", backgroundColor: "white", borderRadius: "5px", width: "100%" }} />
        {renderErrors('title')}
      </label>
      <label style={{ display: "block", margin: "10px 0", color: "white" }}>
        descreption:
        <textarea rows={2}  onChange={(e)=>setBody(e.target.value)} value={body} style={{ marginLeft: "10px", padding: "10px", border: "none", backgroundColor: "white", borderRadius: "5px", width: "100%", minHeight: "100px" }} />
        {renderErrors('body')}
      </label>
      
      
      <div className="mb-3 form-check">
  <select onChange={(e)=>setCategoryId(e.target.value)} className="form-select custom-select" name="category_id" value={categoryId} 
    style={{border: 'none', borderRadius: '10px'}}>
    <option disabled>choose priority level</option>
    {
      categories?.map(category =>(
        <option value={category.id}>{category.name}</option>
      ))
    }
   
  </select>
  {renderErrors('category')}
</div>
      {
        loading ? < div className="spinner-border" role='status'>
          <span className="visually-hidden"></span>
        </div>
        :
        <button type="submit" style={{ backgroundColor: "white", color: "orange", border: "none", borderRadius: "5px", padding: "10px 20px", fontWeight: "bold", cursor: "pointer" }}>Create Task</button>

      }
    </form>
    
    </>
  );
}
export default TaskForm;