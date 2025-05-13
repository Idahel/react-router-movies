import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { Movies } from "./pages/Movies"
import { About } from "./pages/About"

export const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </BrowserRouter>
      
    </>
  )
}
