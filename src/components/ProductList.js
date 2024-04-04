import React from "react";
import Product from "./Product";
import { useFilterContex } from "../context/reducer/FilterContex";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { grid_view, filter_products } = useFilterContex();
  console.log( filter_products," filter_products")

  if (grid_view === true) {
    return <GridView product_Data={filter_products} />;
  }

  if (grid_view === false) {
    return <ListView product_Data={filter_products} />;
  }
  return (
    <div>
      <Product />
    </div>
  );
};

export default ProductList;
