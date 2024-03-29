import React, { useState , useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
function ViewExpenses() {
    const [expenses , setExpenses] = useState([]);

  {/*Created an array of months to be able to see the months in actual words in the JSX
   rather than just numbers*/}
    const months = [
        {value: 1, label: 'January'},
      {value:2 , label: 'February'},
      {value:3 , label: 'March'},
      {value:4 , label: 'April'},
      {value:5 , label: 'May'},
      {value:6 , label: 'June'},
      {value:7 , label: 'July'},
      {value:8 , label: 'August'},
      {value:9 , label: 'September'},
      {value:10, label: 'October'},
      {value:11, label: 'November'},
      {value:12, label: 'December'}
    ];
  useEffect(() => {
    const fetchExpenses = async() => {
      try {
        const token = window.localStorage.getItem('token');
        const response = await axios.get('/api/profile', {
          headers: {Authorization: token},
        });
        if(response.data.userId) {
          //If true give me the expenses he's admin to 
          const expensesResponse = await axios.get(
            `/api/expenses/${response.data.userId}`
          );
          const fetchedExppenses = expensesResponse.data;
          setExpenses(fetchedExppenses|| []);

        }

      }catch(error) {
        console.log(error);
      }
    };
    fetchExpenses();
  }, []);

 

  const handleDelete = async (expenseId) => {
    const confirmDelete = window.confirm("Are you want to delete this expense? ");
    if (!confirmDelete){
      return;
    }
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.delete(`/api/expenses/${expenseId}` , {
          headers : {Authorization : token},
          
    });

    if (response.status == 200) {
        //Remove deleted expense from state
        const updatedExpenses = expenses.filter(expense => expense._id !== expenseId );
        setExpenses(updatedExpenses);
    }else{
      console.error('Failed to delete expense');
    }
  }catch (error){
    console.error('Error deleting expense:' , error)
  }
}
     
  return (
    <div>
      <div className='container'>
        <h2 className='text-center'> View Building Expenses </h2>
        <table className='table'>
            <thead>
                <tr>
                    <th>Expense Type</th>
                    <th>Total</th>
                    <th>Date Created</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense) =>(
                  <tr key={expense._id}>
                    <td>{expense.type_expenses}</td> 
                    <td>{expense.total}</td>
                    <td>{new Date(expense.date_created).toLocaleDateString()}</td>
                    {/* Represent the months as words based on the key , value pair */}
                    <td>{months.find(month => month.value === expense.month)?.label}</td>
                    <td>{expense.year}</td>
                    <td button onClick={() => handleDelete(expense._id)} className='btn btn-danger'>Delete</td>
                  </tr>
                ))
              ) : (
                <tr>
                <td colSpan='5' className='no-expenses'> No expenses tied to this building...</td>
                </tr>
              )}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewExpenses
