import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import styled from "styled-components";
const CardAmountToggle = ({ amount, setDecrease, setIncrease }) => {
  return (
    <Wrapper>
      <div className="cart-button">
        <div className="amount-toggle row">
          <button onClick={() => setDecrease()}>
            <FaMinus />
          </button>
          <div className="amount-style">{amount}</div>
          <button onClick={() => setIncrease()}>
            <FaPlus />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .row {
    display: flex;
    gap :1rem;
  }

  .amount-style{
    font-size:20px;
  }
`;

export default CardAmountToggle;
