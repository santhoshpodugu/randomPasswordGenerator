import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {

    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (isNumberAllowed) str += '0123456789';
    if (isCharAllowed) str += '!@#$%^&*()_+';

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    
  },[length, isNumberAllowed, isCharAllowed]);

  function copyToClipboard() {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  }

  useEffect(() => { generatePassword()}, [length, isNumberAllowed, isCharAllowed]);

  return (
      <div className='w-full max-w-md mx-auto rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center'>Random Password Generator</h1>
        <div className='flex justify-center my-4'>
          <input className='w-full outline-none rounded-s-md py-1 px-3' 
          type="text" 
          value={password}
          placeholder='Password'
          readOnly
          ref={passwordRef} />
          <button className='bg-blue-900 text-white rounded-e-md px-3'
          onClick={copyToClipboard}
          >Copy</button>
        </div>
        <div className='flex gap-x-1'>
          <input type="range"
            className=' cursor-pointer'
            name="" 
            id=""
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)} />
          <label className='mr-1' htmlFor="length">Length: {length}</label>
          <input type="checkbox"
            defaultChecked = {isNumberAllowed} 
            onChange={()=> {
              setIsNumberAllowed(prev => !prev);
            }} 
            name="" 
            id="" />
          <label className='mr-1' htmlFor="number">Numbers</label>
          <input type="checkbox"
            defaultChecked = {isCharAllowed} 
            onChange={()=> {
              setIsCharAllowed(prev => !prev);
          }} />
          <label htmlFor="CharInput">Characters</label>
        </div>
      </div>
  )
}

export default App
