const balanceEl = document.getElementById('balance')
const incomeAmountEl = document.getElementById("income-amount")
const expenseAmountEl = document.getElementById("expense-amount")
const transactionListEl = document.getElementById("transaction-list")
const transactionFormEl = document.getElementById("transaction-form")
const descriptionEl = document.getElementById("description")
const amountEl = document.getElementById("amount")


let transactions = JSON.parse(localStorage.getItem("transactions")) || []

transactionFormEl.addEventListener('submit', addTransaction)

function addTransaction(e){
    e.preventDefault()

    // getting values from form
    const description = descriptionEl.value.trim() 
    const amount = parseFloat(amountEl.value)

    transactions.push({
        id : Date.now(),
        description,
        amount
    })

    localStorage.setItem("transactions", JSON.stringify(transactions))

    updateTransactionList()
    updateSummary()

    transactionFormEl.reset()

}


function updateTransactionList(){
    transactionListEl.innerHTML = ''

    const sortedTransaction = [...transactions].reverse()

    sortedTransaction.forEach((transaction)=>{
        const transactionEl = createTransactionEl(transaction)
        transactionListEl.appendChild(transactionEl)
    })

}

function createTransactionEl(transaction){
    const li = document.createElement("li")
    li.classList.add("transaction")
    li.classList.add(transaction.amount > 0 ? "income" : "expenses" )

    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>${transaction.amount}
            <button class="delete-btn" onClick="removeTransaction(${transaction.id})" >x</button>
        </span>
    `

    return li
}

function updateSummary(){
    const balance = transactions.reduce((acc, transaction)=>acc+transaction.amount,0)
    // balanceEl.textContent = balance
    balanceEl.textContent = formatCurrency(balance)

    const income = transactions.reduce((acc, transation)=>{
        if(transation.amount<0){
            return acc
        }
        return acc+transation.amount
    },0)
    incomeAmountEl.textContent = formatCurrency(income)

    const expense = transactions.reduce((acc, transaction)=>{
        if(transaction.amount>0){
            return acc
        }
        return acc+transaction.amount
    },0)
    expenseAmountEl.textContent = formatCurrency(expense)
}

function formatCurrency(number){
    return new Intl.NumberFormat("en-US",{
        style : "currency",
        currency : "USD"
    }).format(number)
}

function removeTransaction(id){
    const removedTransactionList = transactions.filter((transaction)=>{
        return transaction.id !== id
    })

    transactions = [...removedTransactionList]
    updateTransactionList()    
    updateSummary()
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

updateTransactionList()
updateSummary()