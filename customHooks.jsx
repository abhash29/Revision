import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios';

import './App.css'

//Syntax for Custom hooks
//data fetching hooks

function useTodo(){
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const response = axios.get("https://sum-server.100xdevs.com/todos");
    setTodos(response.data.todos)
    setLoading(false);
  }, [])

  return {todos, loading};
}


//isonline hook
function useIsOnline(){
  const [isOnline, setOnline] = useState(false);
  setInterval(() => {
    setOnline(window.navigator.onLine)
  }, 5000);
  return isOnline;
}

//syntax for debounce hook
function useDebounce(value, timeout){
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    let timeoutNum = setTimeout(() => {
      setDebouncedValue(value)
    }, timeout)
    return () => {
      clearTimeout(timeoutNum);
    }
  }, [value])
  return debouncedValue;
}
function App() {
  const [value, setValue] = useState(0);
  const debouncedValue = useDebounce(value, 500);
  return (
    <>
      Debounce value is: {debouncedValue}
      <input type="text" onChange={(e) => setValue(e.target.value)} />
    </>
  )
}

export default App

/*function MyComponent(){
  const [count, setCount] = useState(0);

  function incrementCount(){
    setCount(count+1);
  }
  return (
    <div>
      <p>{count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  )
}*/

/*class MyComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: 0};
  }

  incrementCount = () => {
    this.setState({count: this.state.count+1});
  }

  render(){
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    )
  }
}*/

/*function MyComponent  ()  {

  console.error("component mounted")
  useEffect(() => {
    return () => {
      console.log("compoenent unmounted")
    }
  }, [])

  return (
    <div>
      from inside component
    </div>
  )
}*/

/*class MyComponent extends React.Component{
  componentDidMount(){
    console.log("component mounted")
  }
  componentWillUnmount(){
     console.log("component unmounted")
  }
  render(){
    return <div>hi there</div>
  }
}*/


