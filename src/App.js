import './App.css';
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
import DetailOrderTable from './components/order/DetailOrderTable';
import UsersPage from './pages/UsersPage';
import Login from "./pages/Login"
import DetailUser from './components/Users/DetailUser';
import CartPage from './pages/CartPage';
import DetailCart from './components/Cart/DetailCart';
function App() {
  const localState = localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")) :store;
  const [state, dispatch] = useReducer(reducer, localState);
  const display=state.isLoading ? "block":"none";
  return (
    <UserProvider value={{ state, dispatch }} >
      <div className="App">
        
          <div id="preloder" style={{ display: display }}>
            <div className="loader"></div>
          </div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/order_table" element={<OrderTablePages></OrderTablePages>}></Route>
          <Route path="/categories" element={<CategoriesPage></CategoriesPage>}></Route>
          <Route path="/products" element={<ProductsPage></ProductsPage>}></Route>
          <Route path="/add_product" element={<FormAddProducts></FormAddProducts>}></Route>
          <Route path="/detail_product" element={<DetailProducts></DetailProducts>}></Route>
          <Route path="/detail_order" element={<DetailOrderTable></DetailOrderTable>}></Route>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/user" element={<UsersPage></UsersPage>}></Route>
          <Route path="/user_detail" element={<DetailUser></DetailUser>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route path="/cart_detail" element={<DetailCart></DetailCart>}></Route>
        </Routes>
      </div>
    </UserProvider >

  );
}

export default App;
