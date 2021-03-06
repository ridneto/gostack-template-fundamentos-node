import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!(type === 'income' || type === 'outcome')) {
      throw new Error('Invalid transaction type');
    }

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (balance.total < value) {
        throw new Error('Insufficient balance');
      }
    }

    return this.transactionsRepository.create({
      title,
      value,
      type,
    });
  }
}

export default CreateTransactionService;
