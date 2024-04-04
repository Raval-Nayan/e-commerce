import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";
import CardAmountToggle from "./CardAmountToggle";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/reducer/CartContex";
const AddToCart = ({ product }) => {
  const { colors ,id ,stock } = product;
  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const {addcart}=useCartContext()
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };


  return (
    <Wrapper>
      <div className="colors">
        <p>
          colors:
          {colors.map((cur, i) => {
            return (
              <button
                key={i}
                style={{ backgroundColor: cur }}
                className={color === cur ? "btnStyle active" : "btnStyle"}
                onClick={() => {
                  setColor(cur);
                }}
              >
                {color === cur ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div>

      <div>
        <CardAmountToggle
          amount={amount}
          setDecrease={()=>{setDecrease()}}
          setIncrease={()=>{setIncrease()}}
        />
      </div>

      <div>
        {" "}
        <NavLink to="/cart" onClick={()=>(addcart(id,color,product,amount))}>
          <Button o className="btn">
            Add To Cart
          </Button>
        </NavLink>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
export default AddToCart;
