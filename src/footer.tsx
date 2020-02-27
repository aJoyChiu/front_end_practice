import React, { useState } from 'react';
import './footer.css'

export default function Footer() {
  const [count, setCount] = useState<number>(0)

  return (
    <footer>
      <div className='textField'>This footer, you click button {count} times</div>
      <button className='btn' onClick={() => setCount(count+1)}>Click me</button>
    </footer>
  )
}
