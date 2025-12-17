import { use, useEffect, useMemo, useState } from "react"

function App() {
  const [counter, setCounter] = useState(0);
  const [sum, setSum] = useState(0);

  function handleCounter(){
    setCounter(counter+1);
  }


  //implmenting useMemo()
  let count = useMemo(() => {
    let finalCount = 0;
    for(let i=1; i<=sum; i++){
      finalCount=finalCount+i;
    }
    return finalCount;
  }, [sum]);
  return (
    <>
      <div>
       <input onChange={(e) => setSum(e.target.value)} type="text" />
       <p>Sum is: {count}</p>
       <button onClick={handleCounter}>Conter: {counter}</button>
    </div>
    </>
  )
}


export default App
