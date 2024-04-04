import React from "react";
import styled from "styled-components";
import { useFilterContex } from "../context/reducer/FilterContex";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../helper/FormatPrice";
const FilterSection = () => {
  const {
    filters: { Search_text, category, company, color,minPrice,maxPrice,price ,},
    updateFilterValue,
    all_products,
    clearFilter,
  } = useFilterContex();

  const getCategotyPoduct = (data, dataCatecory) => {
    let categorydata = data.map((curEle) => {
      return curEle[dataCatecory];
    });

    if (dataCatecory === "colors") {
      categorydata = categorydata.flat();
    }
    console.log(categorydata, "categorydata");

    return (categorydata = ["all", ...new Set(categorydata)]);
  };

  let categoryProduct = getCategotyPoduct(all_products, "category");
  let CompanyData = getCategotyPoduct(all_products, "company");

  let colorData = getCategotyPoduct(all_products, "colors");
  console.log(colorData, "color data1");

  return (
    <Wrapper>
      <div className="filter-search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Search"
            name="Search_text"
            value={Search_text}
            onChange={updateFilterValue}
          ></input>
        </form>
      </div>

      <div>
        <h3>Category</h3>
        {categoryProduct.map((curEle, index) => {
          return (
            <div>
              <button
                key={index}
                type="button"
                name="category"
                value={curEle}
                onClick={updateFilterValue}
              >
                {curEle}
              </button>
            </div>
          );
        })}
      </div>

      <div>
        <h3>Company</h3>

        <select name="company" id="company" onClick={updateFilterValue}>
          {CompanyData.map((cur, index) => {
            return (
              <option key={index} name="company" value={cur}>
                {cur}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        {" "}
        <h3>Colors</h3>
        <div className="filter-color-style">
          {colorData.map((cur, index) => {
            if ("all" === cur) {
              return (
                <div>
                  {" "}
                  <button
                    key={index}
                    type="button"
                    className=""
                    name="color"
                    value={cur}
                    onClick={updateFilterValue}
                    style={{ backgroundColor: cur }}
                  >
                    All
                  </button>
                </div>
              );
            }
            return (
              <div className="">
                {" "}
                <button
                  key={index}
                  type="button"
                  className={color === cur?  "btnStyle active" : "btnStyle"}
                  name="color"
                  value={cur}
                  onClick={updateFilterValue}
                  style={{ backgroundColor: cur }}
                >
                  {color === cur ? <FaCheck className="checkStyle" /> : null}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="filter_price">
      <h3>Price</h3>
      <p>
        <FormatPrice price={price} />
      </p>
      <input
        type="range"
        name="price"
        min={minPrice}
        max={maxPrice}
        value={price}
        onChange={updateFilterValue}
      />
    </div>

    <div>
    <button onClick={clearFilter}>Clear Filter</button>
    </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;
export default FilterSection;
