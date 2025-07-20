import { useState, useEffect} from 'react'
import Navbar from './component/Navbar.jsx'
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos,settodos] =useState([])
  const [editid,seteditid] = useState("")
  const [loaded,setloaded] = useState(false)
  const [finished,setfinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")

    if(todostring){
    let storedtodos = JSON.parse(todostring)
    settodos(storedtodos)
    }
    setloaded(true);

  }, [])


    useEffect(() => {
    if (Array.isArray(todos) && loaded) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  }, [todos,loaded])
  

  const handeladd = () => {

    if(editid){
      settodos(todos.map(item=>{
        return item.id===editid ? {...item,todo}:item
      }))
      seteditid("")
    }
    else {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
  }
    settodo("")

  }

  const handeledit = (e) => {
    const item=todos.find(t => t.id==e)
    settodo(item.todo)
    seteditid(item.id)

  }

  const handeldelete = (e) => {
    let result=confirm("Are you sure you want to delete")
    if(result)
    settodos(todos.filter(item=> item.id!==e))

  }
  const handelchange = (e) => {
    settodo(e.target.value)
  }

  const handelcheckbox = (e) => {
    let id=e.target.name;
    settodos(
      todos.map(item=>
        item.id===id?{...item,isCompleted:!item.isCompleted}:item
      )
    )

  }

  const toggelfinished = (e) => {
    setfinished(!finished)
  }


  return (
    <>
      <Navbar />
      <div className="container my-7 mx-auto min-h-[80vh] bg-gray-300 rounded-2xl border-2 border-black shadow-2xl md:w-1/3">
        <p className='font-bold text-center mt-1 text-3xl'>Eliminate Your Procastination</p>
        <div className='ml-5 mt-10 mr-5'>
          <p className='font-bold text-2xl'>Add a TODO</p>
          <div className="field flex flex-col gap-2">
            <input type="Enter here" onChange={handelchange} value={todo} className='border-1 bg-white rounded-xl  hover:border-black pl-2 md:w-full' />
            <button onClick={handeladd} disabled={todo.length<3} className=' p-1 border-2 disabled:bg-gray-700 bg-black text-white rounded-xl'>Save</button>
          </div>
        </div>
        <hr className="my-6 border-gray-700 border-t-2" />
        <div className="todo ml-5 mt-10">
          <input onChange={toggelfinished} type="checkbox" checked={finished} />Show Finished
          <p className='font-bold text-2xl'>Your Todos</p>
          {todos.length===0 && <div>Nothing to display...</div>}
           {todos.map(item=>{
            return (finished || !item.isCompleted) && <div className="insert flex justify-between my-2" key={item.id}>
            <input type="checkbox" name={item.id} checked={item.isCompleted} onChange={handelcheckbox}/>
            <div className={`text ${item.isCompleted?"line-through":""}`}>{item.todo}</div>
            <div className="buttons flex h-full mr-1">
            <button onClick={()=>{handeledit(item.id)}} className='ml-2 p-1 border-2 bg-black text-white rounded-xl w-10 justify-center flex'><MdEdit /></button>
            <button onClick={()=>{handeldelete(item.id)}} className='ml-2 p-1 border-2 bg-black text-white rounded-xl w-10 justify-center flex'><MdDelete /></button>
            </div>
          </div>
           })}
        </div>
      </div>
    </>
  )
}

export default App
