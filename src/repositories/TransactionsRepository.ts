import Transaction from '../models/Transaction';
import transactionRouter from '../routes/transaction.routes';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    let income = 0;
    let outcome = 0;
    const arrayOfTransactions = this.transactions;
    arrayOfTransactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value;
      } else if (transaction.type === 'outcome') {
        outcome += transaction.value;
      } else {
        throw Error('This is not a valid transaction');
      }
    });
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    // const balance =

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
