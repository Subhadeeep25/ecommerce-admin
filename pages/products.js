import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";
import {commerce} from "../lib/commerce";
export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    
    axios.get("/api/products").then((response) => {
      fetchProducts();
      {console.log(products)}
    });
  }, []);
  const fetchProducts=async()=>{
    const {data}= await commerce.products.list();
    setProducts(data);
    console.log(data);
  }
  console.log(products);
  return (
    <Layout>
      <Link
        className="bg-blue-900 rounded-md text-white p-1"
        href={"/products/new"}
      >
        Add New Product
      </Link>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Image</td>
            <td>Product Name</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {products && products.map((product) => (
            <tr>
              <td>
                <img src={product.image.url} className="w-10 h-10" />
              </td>
              <td>{product.name}</td>
              <td>
                {product.price.formatted_with_symbol}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
