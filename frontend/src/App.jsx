import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from "./Form";
import Users from './Users';
import Update from './Update';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/users" element={<Users />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

