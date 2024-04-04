import React from 'react'

import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContex } from '../context/reducer/FilterContex';

const Sort = () => {

   const {setGridview,grid_view, setListview,filter_products,sortfunction}=useFilterContex()
  return (
    <Wrapper className="sort-section">
    {/* 1st column  */}
    <div className="sorting-list--grid">
      <button
        className={grid_view ? "active sort-btn" : "sort-btn"}
        onClick={()=>{setGridview()}}>
        <BsFillGridFill className="icon" />
      </button>

      <button
        className={!grid_view ? "active sort-btn" : " sort-btn"}
        onClick={()=>{setListview()}}>
        <BsList className="icon" />
      </button>
    </div>
    {/* 2nd column  */}
    <div className="product-data">
      <p>{`${filter_products.length} Product Available`}</p>
    </div>

    {/* 3rd column  */}
  <div>
  <form>
  <select id='' className='sort-selection' onClick={sortfunction}>
 
  <option value="higher">Higher</option>
  <option value="lowest">Lowest</option>
  <option value="a-z">a-z</option>
  <option value="z-a">z-a</option>
  </select>
  </form>
  </div>


  </Wrapper>
  )
}
const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;

  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;

    .sort-select--option {
      padding: 0.5rem 0;
      cursor: pointer;
      height: 2rem;
      padding: 20px;
    }
  }
`;

export default Sort