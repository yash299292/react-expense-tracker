import styled from "styled-components";
import React, { useEffect, useState, useCallback } from "react";

const Container = styled.div`
background-color: white;
color: #0d1d2c;
display: flex;
flex-direction: column;
padding: 10px 22px;
font-size: 18px;
width: 100%;
gap: 10px;
font-weight: bold;
overflow-y: auto !important;
& input {
  padding: 10px 12px;
  border-radius: 12px;
  background: #e6e8e9;
  border: 1px solid #e6e8e9;
  outline: none;
}
`;

const Cell = styled.div`
background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;
const DeleteButton = styled.button`
  background-color: #ff5858;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span>{props.payload?.desc}</span>
      <span>₹{props.payload?.amount}</span>
      <span>{props.payload?.date}</span>
      <span>{props.payload?.time}</span>
      <DeleteButton onClick={() => props.deleteTransaction(props.payload)}>
        Delete
      </DeleteButton>
    </Cell>
  );
};

const TransactionsComponent = (props) => {
  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(props.transactions);

  const filterData = useCallback((searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updateTxn(txn);
  }, [props.transactions]);

  useEffect(() => {
    filterData(searchText);
  }, [props.transactions, filterData, searchText]);

  return (
    <Container>
      Transactions
      <input
        placeholder="Search"
        onChange={(e) => {
          updateSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      {filteredTransaction?.map((payload) => (
        <TransactionCell
          key={payload.id}
          payload={payload}
          deleteTransaction={props.deleteTransaction}
        />
      ))}
    </Container>
  );
};

export default TransactionsComponent;
