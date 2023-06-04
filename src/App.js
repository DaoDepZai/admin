import './App.css';
import Nav from './components/Nav';
import Aside from './components/Aside';
import Dashboard from './pages/DashBoard';
import OrderTablePages from './pages/OrderTablePages';
import { Route, Routes } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import reducer from './context/reducer'
import store from './context/store'
import { UserProvider } from './context/UserContext'
import { useEffect, useReducer } from 'react';
import ProductsPage from './pages/ProductsPage'
import FormAddProducts from './components/Products/FormAddProducts';
import DetailProducts from './components/Products/DetailProducts';
function App() {
  const localState = localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")) :store;
  const [state, dispatch] = useReducer(reducer, localState);
  const display=state.isLoading ? "block":"none";
  return (
    <UserProvider value={{ state, dispatch }} >
      <div className="App">
        <Aside></Aside>
          <div id="preloder" style={{ display: display }}>
            <div className="loader"></div>
          </div>
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route path="/order_table" element={<OrderTablePages></OrderTablePages>}></Route>
          <Route path="/categories" element={<CategoriesPage></CategoriesPage>}></Route>
          <Route path="/products" element={<ProductsPage></ProductsPage>}></Route>
          <Route path="/add_product" element={<FormAddProducts></FormAddProducts>}></Route>
          <Route path="/detail_product" element={<DetailProducts></DetailProducts>}></Route>
        </Routes>
      </div>
    </UserProvider >

  );
}

export default App;
