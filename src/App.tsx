
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from './api/products'
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetail"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import ProductManagementPage from "./pages/admin/ProductManagementPage"
import AddProductPage from "./pages/admin/AddProduct"
import UpdateProductPage from "./pages/admin/UpdateProduct"
interface IProduct {
  id: number,
  name: string,
  price: number,
  cateId: number,
}
function App() {
  const [products, setProduct] = useState<IProduct[]>([])
  useEffect(() => {
    getAllProduct().then(({ data }) => setProduct(data))
  }, [])
  const onHandleRemove = (id: number) => {
    deleteProduct(id).then(() => setProduct(products.filter((item) => item.id !== id)))
  }
  const onHandleAdd = (product: IProduct) => {
    addProduct(product).then(() => setProduct([...products, product]))
  }
  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product).then(() => setProduct(products.map((item) => item.id == product.id ? product : item)))
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage products={products} />} />
          <Route path='products' >
            <Route index element={<ProductsPage products={products} onRemove={onHandleRemove} />} />
            <Route path=':id' element={<ProductDetailPage />} />
          </Route>
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />

        </Route>
        <Route path='admin'>

          <Route path='products'>
            <Route index element={<ProductManagementPage products={products} onRemove={onHandleRemove} />} />
            <Route path='add' element={<AddProductPage onAdd={onHandleAdd} />} />
            <Route path=':id/update' element={<UpdateProductPage onUpdate={onHandleUpdate} products={products} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
