import React, { useState, useEffect } from 'react';
import useCategories from '../custom/useCategories';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';


// states
const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState(null);
  const [catId, setCatId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dbncSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!tasks.length) {
      fetchTasks();
    }
    if (!categories.length) {
      fetchCategories();
    }
  }, [page, orderBy, catId, dbncSearch[0]])


  // fetch tasks axios
  const fetchTasks = async () => {
    try {
      if (catId) {
        const response = await axios.get(`/api/category/${catId}/tasks?page=${page}`)
        setTasks(response.data);
      } else if (orderBy) {
        const response = await axios.get(`/api/order/${orderBy.column}/${orderBy.direction}/tasks?page=${page}`)
        setTasks(response.data);
      } else if (dbncSearch[0] !== '') {
        const response = await axios.get(`/api/search/${dbncSearch[0]}/tasks?page=${page}`)
        setTasks(response.data);
      }
      else {
        const response = await axios.get(`/api/tasks?page=${page}`);
        setTasks(response.data);
      }

    } catch (error) {
      console.log(error);
      setTasks([]);
    }
  }


  const fetchCategories = async () => {
    const fetchedCategories = await useCategories();
    setCategories(fetchedCategories);
  }
  // pagination
  const fetchNext = (link) => {
    const url = new URL(link);
    setPage(url.searchParams.get('page'));
  }

  const renderPagination = () => {
    return <ul className='pagination'>
      {
        tasks.links?.map((link, index) => (
          <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
            <a
              onClick={() => { fetchNext(link.url) }}
              style={{ cursor: 'pointer' }}
              className="page-link">
              {link.label.replace('&laquo;', '').replace('&raquo;', '')}
            </a>
          </li>
        ))
      }
    </ul>
  }


  // check if task is done
  const check = (done) => {
    return done ? (
      <span className='badge px-5 py-2 bg-success'>done</span>
    ) : (
      <span className='badge px-5 py-2 bg-danger'>processing...</span>
    );
  }

  // dekete task
  const deleteTask = (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/api/tasks/${taskId}`);
          Swal.fire(
            'deleted',
            'your file has been deleted. ',
            'success'
          );
        } catch (error) {
          console.log(error)
        }
      }
    });

  }



  return (
    <div className=''>
      <div className='row'>
        <div className='row m-3'>
          {/* search input */}
          <div className='form-groupe'>
            <input type='text' placeholder='search...' className='form-control'
              value={searchTerm} onChange={(event) => {
                setCatId(null);
                setOrderBy(null);
                setPage(1)
                setSearchTerm(event.target.value)
              }} />
          </div>
        </div>
        <div className="col-10">
          <div className='container'>
            <h1 className="title bg-light border p-3">Tasks</h1>
            {/* ---------------display tasks with map -------- */}
            <div className='row'>

              {tasks.data?.map(task => (
                <div key={task.id} className="col-md-6">
                  <div class="card" style={{ width: '25rem' }}>
            <div class="card-body">
              <div className='d-flex mb-3'>
              <h5 class="card-title mx-5">{task.title}</h5>
              <h6 class="card-subtitle mb-2 p-3 text-muted">{task.created_at}</h6>
              </div>
              <p class="card-text">{task.body}</p>
              <p className="card-text">{check(task.done)}</p>
              <div className='d-flex  align-items-space-between'>
              <button className="delete-button" onClick={() => { deleteTask(task.id) }}>Delete</button>
               <button className="bg-secondary delete-button"><Link to={`/edit/${task.id}`}>update</Link></button>
           </div>
            </div>
          </div>
                  
                </div>
              ))}
            </div>
          </div>
          
          {/* -------how many task showing and pagination------------ */}
          <div className='my-4 d-flex justify-content-around align-items-center'>
            <b className='mx-5 '>
              Showing {tasks.from || 0} to {tasks.to || 0} from {tasks.total} results.
            </b>
            <div>
              {renderPagination()}
            </div>
          </div>
        </div>
        {/* filter and order */}
        <div className='col-2'>
          <div className='card'>
            <div className='card-header text-center bg-white'>
              <h5 className=" bg-light border p-3">filter by category</h5>
            </div>
            <div className='card-body'>
              {/* -------- radio filter by category all------- */}
              <div className='form-check'>
                <input type="radio" name="category" className="form-check-input"
                  onChange={(event) => {
                    setPage(1);
                    setOrderBy(null)
                    setCatId("");
                    fetchTasks();
                  }} />
                <label htmlFor='all' className="form-check-label">all</label>
              </div>
              {/* ----------------filter by category map-------- */}
              {
                categories?.map(category => (
                  <div key={category.id} className='form-check'>
                    <input type="radio" name="category" className="form-check-input" value={category.id} id={category.id} checked={catId == category.id}
                      onChange={(event) => {
                        setOrderBy(null)
                        setPage(1); setCatId(event.target.value);
                        setCatId(event.target.value)


                      }} />
                    <label htmlFor={category.id} className="form-check-label">{category.name}</label>
                  </div>
                ))
              }

            </div>
          </div>
          {/* -----------order by id ---------- */}
          <div className='card'>
            <div>
              <div className='card-header text-center bg-white'>
                <h5>order by time</h5>
              </div>
              <div className='form-check'>
                <input
                  type="radio"
                  name="name"
                  className="form-check-input"
                  value='asc'
                  onChange={(event) => {
                    setPage(1);

                    setCatId(null);
                    setOrderBy({ column: 'id', direction: event.target.value })
                  }}
                  checked={orderBy && orderBy.column === 'id' && orderBy.direction === 'asc' ? true : false}
                />
                <label htmlFor='id' className="form-check-label"><i className='fa fa-arrow-up'></i></label>
              </div>

              <div className='form-check'>
                <input
                  type="radio"
                  name="name"
                  className="form-check-input"
                  value='desc'
                  onChange={(event) => {
                    setPage(1);
                    setCatId(null);
                    setOrderBy({ column: 'id', direction: event.target.value })
                  }}
                  checked={orderBy && orderBy.column === 'id' && orderBy.direction === 'desc' ? true : false}
                />
                <label htmlFor='id' className="form-check-label"><i className='fa fa-arrow-down'></i></label>
              </div>

            </div>

          </div>

          {/* -----------order by name ---------- */}
          <div className='card'>
            <div>
              <div className='card-header text-center bg-white'>
                <h5>order by title</h5>
              </div>
              <div className='form-check'>
                <input
                  type="radio"
                  name="title"
                  className="form-check-input"
                  value='asc'
                  onChange={(event) => {
                    setPage(1);

                    setCatId(null);
                    setOrderBy({ column: 'title', direction: event.target.value })
                  }}
                  checked={orderBy && orderBy.column === 'title' && orderBy.direction === 'asc' ? true : false}
                />
                <label htmlFor='title' className="form-check-label">A-Z</label>
              </div>

              <div className='form-check'>
                <input
                  type="radio"
                  name="title"
                  className="form-check-input"
                  value='desc'
                  onChange={(event) => {
                    setPage(1);
                    setCatId(null);
                    setOrderBy({ column: 'title', direction: event.target.value })
                  }}
                  checked={orderBy && orderBy.column === 'title' && orderBy.direction === 'desc' ? true : false}
                />
                <label htmlFor='title' className="form-check-label">Z-A</label>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div >

  );
};

export default TodoList;
