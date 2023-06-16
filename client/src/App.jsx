import { Routes, Route } from 'react-router-dom';
import Landing, { } from './views/Landing/Landing'
import Home, { } from './views/Home/Home'
import Detail, { } from './views/Detail/Detail'
import Form, { } from './views/Form/Form'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </>
  )
}

export default App
