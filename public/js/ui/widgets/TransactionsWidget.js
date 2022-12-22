/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.btnIncome = document.querySelector('.create-income-button');
    this.btnIncome.addEventListener('click', () => {
      this.elemNewIncome = App.getModal('newIncome');
      this.elemNewIncome.open();
    })
    this.btnExpense = document.querySelector('.create-expense-button');
    this.btnExpense.addEventListener('click', () => {
      this.elemNewExpense = App.getModal('newExpense');
      this.elemNewExpense.open();
    })
  }
}
