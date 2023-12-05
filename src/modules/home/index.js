import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import OverViewComponent from "./OverViewComponent";
import TransactionsComponent from "./TransactionsComponent";
import MyPieChart from "./Components"; // Import the PieChart component
import TransactionsChart from "./TransactionsChart";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
`;

const ChartContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const HomeComponent = (props) => {
    const [transactions, updateTransaction] = useState([]);
    const [expense, updateExpense] = useState(0);
    const [income, updateIncome] = useState(0);
  
    const calculateBalance = useCallback(() => {
      let exp = 0;
      let inc = 0;
      transactions.forEach((payload) =>
        payload.type === "EXPENSE"
          ? (exp = exp + payload.amount)
          : (inc = inc + payload.amount)
      );
      updateExpense(exp);
      updateIncome(inc);
    }, [transactions]);
  
    useEffect(() => {
      calculateBalance();
    }, [transactions, calculateBalance]);
  
    const addDeleteTransaction = (payload, isDelete) => {
      const transactionArray = [...transactions];
      const now = new Date();
      payload.date = now.toLocaleDateString();
      payload.time = now.toLocaleTimeString();
  
      if (isDelete) {
        // Delete transaction
        const indexToDelete = transactionArray.findIndex(
          (t) => t.id === payload.id
        );
        if (indexToDelete !== -1) {
          transactionArray.splice(indexToDelete, 1);
        }
      } else {
        // Add transaction
        transactionArray.push(payload);
      }
  
      updateTransaction(transactionArray);
    };
  
    const addTransaction = (payload) => {
      addDeleteTransaction(payload, false);
    };
  
    const deleteTransaction = (payload) => {
      addDeleteTransaction(payload, true);
    };
  
    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type === "EXPENSE"
    );
  
    return (
      <Container>
        <OverViewComponent
          expense={expense}
          income={income}
          addTransaction={addTransaction}
        />
        {transactions?.length ? (
          <div>
            <TransactionsComponent
              transactions={transactions}
              deleteTransaction={deleteTransaction}
            />
            <ChartContainer>
              <h2>Income and Expense</h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <MyPieChart
                  data={[
                    { name: "Income", value: income },
                    { name: "Expense", value: expense },
                  ]}
                />
              </div>
            </ChartContainer>
            <ChartContainer>
              <h2>Expenses</h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TransactionsChart data={expenseTransactions} />
              </div>
            </ChartContainer>
          </div>
        ) : (
          ""
        )}
      </Container>
    );
  };
  
  export default HomeComponent;