import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Menu, Input, Select, Pagination  } from 'antd';

import Products from "./Products";
import { setCategory } from "../redux/category/categorySlice";
import { setProducts, setLoading, setCount } from "../redux/products/productsSlice";
import AboutCard from "./AboutCard";

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { Option } = Select;


const Wrapper = () => {
  const dispatch = useDispatch()
  const category = useSelector(state => state.category.category);
  const totalCount = useSelector(state => state.products.count);
  const [categoryList, setCategoryList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [paginationIndex, setPaginationIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5)

  const handleChangeCategory = (value) => {
    setPaginationIndex(1)
    dispatch(setCategory(value))
  }

  const onChangeSearch = (e) => {
    const value = e.target.value;
    setPaginationIndex(1)
    setSearchValue(value)
  }

  useEffect(() => {
    function getCategory() {
      axios.get('http://localhost:3001/api/category')
        .then(res => {
          setCategoryList(res.data)
          // console.log(res)
        })
    }
    getCategory()
  }, [])

  useEffect(() => {
    function getProducts() {
      console.log({
        category,
        limit: pageSize,
        offset: paginationIndex,
        name: searchValue
      })
        dispatch(setLoading(true))
        axios.get(`http://localhost:3001/api/product`, {
          params: {
            category,
            limit: pageSize,
            offset: paginationIndex,
            name: searchValue
          }
        })
            .then(res => {
                dispatch(setLoading(false))
                dispatch(setProducts(res.data.products))
                dispatch(setCount(res.data.count))
            })
            .catch(err => {
                dispatch(setLoading(false))
            })
    }
    getProducts()
  }, [dispatch, searchValue, category, paginationIndex, pageSize])

  return (
    <Layout style={{minHeight: '100vh'}} className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(5).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `nav ${key}`,
          };
        })}
      />
    </Header>
    <Content
      style={{
        padding: '0 50px',
      }}
    >
      
      <div className="site-layout-content">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/product" />} />
          <Route path="/product" element={<>
            <div className="tools">
              <div style={{width: '300px'}}>
                <Search placeholder="input search text" onChange={onChangeSearch}  />
              </div>
                <Pagination
                  current={paginationIndex}
                  defaultCurrent={1} 
                  total={totalCount}
                  value={paginationIndex}
                  onChange={e => {setPaginationIndex(e)}}
                  defaultPageSize={pageSize}
                  pageSize={pageSize}
                  onShowSizeChange={(a, b) => {setPageSize(b)}}
                  pageSizeOptions={['5', '10', '15', '30']}
                  showSizeChanger={true}
                />
              <div className="category">
                <Select defaultValue={category} style={{ width: 120 }} onChange={handleChangeCategory}>
                <Option value=''>All</Option>
                  {
                    categoryList.map((item, index) => (
                      <Option key={index} value={item}>{item}</Option>
                    ))
                  }
                </Select>
                </div>
            </div>
            <Products />
          </>} />
          <Route path="/product/:id" element={<AboutCard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
  )
}

export default Wrapper;
