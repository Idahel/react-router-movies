import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Movies } from "./pages/Movies";
import { Collections } from "./pages/Collections";
import { CollectionDetails } from "./pages/CollectionDetails";
import { About } from "./pages/About";
import { MovieDetails } from "./pages/MovieDetails";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<CollectionDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
