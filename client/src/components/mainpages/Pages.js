
import React, {useContext} from 'react'
import { GlobalState } from '../../GlobalState'
import { Switch, Route } from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'


const Page = () => {
    const state= useContext(GlobalState)
    const [isAdmin]=state.userAPI.isAdmin
    const [isLogged]= state.userAPI.isLogged

    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/login" exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/category" exact component={Categories} />
            <Route path="/history" exact component={History} />
            <Route path='/create_product' exact component={isAdmin?CreateProduct: NotFound} />
            <Route path='/edit_product/:id' exact component={isAdmin? CreateProduct:NotFound} />

        </Switch>
    )
}

export default Page
