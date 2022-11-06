import React, { useState, useEffect} from 'react'
import Header from '../Header&Sidebar/header'
import Sidebar from '../Header&Sidebar/sidebar'
import Modal from "react-bootstrap/Modal"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './body.css'
const Body=() =>{
    const [todo,setTodo] = useState([])
    const [start, setStart] = useState(true)
    const [end , setEnd] = useState(false)
    const [pause , setpause]= useState(false)
    const [startTime, setStartTime] = useState(0)
    const [ongoing, setOngoing] = useState(false);
    const [totalTime, setTotalTime] = useState(null);
    const [activity, setactivity] = React.useState({
        activity: "",
        status: ""
        //Time_taken: 0,
      });
    const [completed, setcompleted] =useState(false)
    const [elapsed, setElapsed] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch("http://localhost:3001/userTodo/todo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("AuthToken"),
            },
        })
            .then((res) => res.json())
            .then((res) => setTodo(res))
            .catch((err) => console.log(err));
    }, []);

    const handleStart = (e,id) => {
        console.log(id);
        var current = new Date();
        let timer = 3600 * current.getHours() + 60 * current.getMinutes() + current.getSeconds();
        console.log(timer)
        setStartTime(timer);
        setStart(true);
        setOngoing(true);
    }

    const handlePause = () => {
        var currentTime = new Date();
        let timer3 = 3600 * currentTime.getHours() + 60 * currentTime.getMinutes() + currentTime.getSeconds();
        console.log(timer3)
        // console.log(timer3-startTime)
        let coveredtime = elapsed + timer3 - startTime
        setElapsed(coveredtime);
        setpause(true)
    }

    const handleResume = () => {
        var resumeTime = new Date();
        let timer4 = 3600 * resumeTime.getHours() + 60 * resumeTime.getMinutes() + resumeTime.getSeconds();
        console.log(timer4)
        setStartTime(timer4);
        setpause(false)
    }
    
    const handleEnd=()=>{
        const current2 = new Date()
        let timer2 = 3600 * current2.getHours() + 60 * current2.getMinutes() + current2.getSeconds();
        console.log(timer2)
        console.log(elapsed)
        let allTime = timer2 - startTime + elapsed;
        var time;
        let hr = Math.floor((allTime) / 3600);
        let min = Math.floor((allTime - (hr * 3600)) / 60);
        let sec = (allTime - (hr * 3600) - (min * 60));

        if(hr === 0){
            if(min<10){
                if(sec<10){
                    time = `0${min}:0${sec}`
                }else{
                    time = `0${min}:${sec}`
                }
            }else{
                if (sec < 10) {
                    time = `${min}:0${sec}`
                } else {
                    time = `${min}:${sec}`
                }
            }
        }else{
            if(hr < 10) {
                if (min < 10) {
                    if (sec < 10) {
                        time = `0${hr}:0${min}:0${sec}`
                    } else {
                        time = `0${hr}:0${min}:${sec}`
                    }
                }
                else {
                    if (sec < 10) {
                        time = `0${hr}:${min}:0${sec}`
                    } else {
                        time = `0${hr}:${min}:${sec}`
                    }
                }
            }else{
                if (min < 10) {
                    if (sec < 10) {
                        time = `${hr}:0${min}:0${sec}`
                    } else {
                        time = `${hr}:0${min}:${sec}`
                    }
                }
                else {
                    if (sec < 10) {
                        time = `${hr}:${min}:0${sec}`
                    } else {
                        time = `${hr}:${min}:${sec}`
                    }
                }
            }
        }
        setTotalTime(time)
        setEnd(true);
        setcompleted(true);
        setactivity({ ...activity });
    }
    const handleActivity = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/userTodo/addtask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("AuthToken"),
            },
            body: JSON.stringify(activity),
        })
            .then((res) => res.json())
            .then((res) => {
                // console.log(res);
                setTodo(res);
            })
            .catch((err) => console.log(err));
        setShow(false);
    }

  return (

    <>
    <Header/><br></br>
    <Sidebar/>
    

    <div id='userTable'>
        <div style={{float:"right",marginBottom:"20px"}}>
        <Button className='activityBtn' variant="primary" onClick={handleShow} >
            Add Activity
        </Button>
        </div>
        <div>
        <table className='itemrow'>
            <thead>
                <tr>
                    <th>Activity</th>
                    <th>Status</th>
                    <th>Time taken <br></br>(Hrs:Min:Sec)</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    todo.map((ele,i)=>{
                        return(
                            <tr key={i}>
                                <td>{ele.activity}</td>
                                <td>{completed ? "Completed" : ongoing ? "Onging" :`${ele.status}`}</td>
                                <td>{end ? totalTime : ""}</td>
                                <td>
                                    {
                                        end === true ? "" :
                                            start === false ? <button onClick={(e)=>handleStart(e,ele._id)}>Start</button> :
                                                <div>
                                                    <button onClick={(e)=>handleEnd(e,ele._id)}>End</button>
                                                    {
                                                        pause ? <button onClick={(e)=>handleResume(e,ele._id)}>Resume</button> : <button onClick={(e)=>handlePause(e,ele._id)}>Pause</button>
                                                    }

                                                </div>
                                    }
                                </td>

                            </tr>

                        )
                    })
                }

            </tbody>
        </table>
        </div>
    </div>
    <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleActivity}>
                        <div className="activityInput">
                            <input type="text" placeholder='Activity' onChange={(e) => setactivity({ ...activity, activity: e.target.value })} />
                        </div>
                        <div className="activitySubmitBtn">
                            <button type='submit' style={{ margin: "10px" }}>Save</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
    </>
  )
}

export default Body