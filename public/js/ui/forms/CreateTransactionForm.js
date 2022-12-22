/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.element = element;
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    //console.log("проверка renderAccountsList -", this.element)
    Account.list("/account", (err, response) => {
      if (err) {
        console.log(err);
      } else if (response.success) {
        this.blockContent = this.element.querySelector('select');
        this.blockContent.innerHTML = "";
        for (let item of response.data) {
          this.blockContent.innerHTML += `<option value="${item.id}">${item.name}</option>`
        }
      } else {
        console.log(response.error);
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create("/transaction", data, (err, response) => {
      if (err) {
        console.log(err);
      } else if (response.success) {
        this.element.reset();
        if (data.type === 'income') {
          this.blockNewTransaction = App.getModal('newIncome');
        } else {
          this.blockNewTransaction = App.getModal('newExpense');
        }
        this.blockNewTransaction.element.style.removeProperty('display');
        App.update();
      } else {
        console.log(response.error);
      }
    });
  }
}