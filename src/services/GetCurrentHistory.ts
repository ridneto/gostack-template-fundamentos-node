import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Response {
  transactions: Transaction[];
  balance: { income: number; outcome: number; total: number };
}

class GetCurrenyHistory {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Response {
    const response: Response = {
      transactions: this.transactionsRepository.all(),
      balance: this.transactionsRepository.getBalance(),
    };

    return response;
  }
}

export default GetCurrenyHistory;
