/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
    }
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {

  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.btnDeleteAccount = document.querySelector(".remove-account");
    this.btnDeleteAccount.addEventListener('click', () => {
      this.removeAccount();
    })
    /*
    this.btnDeleteTransaction = document.querySelectorAll('.transaction__remove');
    this.btnDeleteTransaction.forEach((item) => {
      item.addEventListener('click', () => {
        this.transactionId = item.getAttribute('data-id');
        this.removeTransaction(this.transactionId);
      })
    })
    */
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (User.current()) {
      this.accountActive = document.querySelector('.accounts-panel').querySelector('.active');
      if (this.accountActive) {
        this.confirmAccount = confirm("Удалить счет?");
        if (this.confirmAccount) {
          this.data = {
            id: this.accountActive.getAttribute('data-id')
          }
          Account.remove("/account", this.data, (err, response) => {
            if (err) {
              console.log(err);
            } else if (response.success) {
              this.clear();
              App.updateWidgets();
              App.updateForms();
            } else {
              console.log(response.error);
            }
          })
        }
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if (id) {
      this.confirmTransaction = confirm("Удалить транзакцию?");
      if (this.confirmTransaction) {
        this.data = {
          id: id
        }
        Transaction.remove("/transaction", this.data, (err, response) => {
          if (err) {
            console.log(err);
          } else if (response.success) {
            App.update();
          } else {
            console.log(response.error);
          }
        })
      }
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if (options) {
      Account.get(options.account_id, (err, response) => {
        if (err) {
          console.log(err);
        } else if (response.success) {
          this.renderTitle(response.data.name);
        } else {
          console.log(response.error);
        }
      })
      Transaction.list('/transaction/?account_id=' + options.account_id, (err, response) => {
        if (err) {
          console.log(err);
        } else if (response.success) {
          this.renderTransactions([]);
          this.renderTransactions(response.data);
          this.btnDeleteTransaction = document.querySelectorAll('.transaction__remove');
          this.btnDeleteTransaction.forEach((item) => {
            item.addEventListener('click', () => {
              this.transactionId = item.getAttribute('data-id');
              this.removeTransaction(this.transactionId);
            })
          })
        } else {
          console.log(response.error);
        }

      })
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    document.querySelector(".content-title").innerText = "Название счёта";
    this.renderTransactions([]);
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    document.querySelector(".content-title").innerText = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    this.date = new Date(date);
    this.options = {year: 'numeric', month: 'long', day: 'numeric'};
    return `${this.date.toLocaleDateString('ru-RU', this.options)} в ${this.date.getHours()}:${this.date.getMinutes()}`
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    if (item.type === "expense") {
      this.transaction_type = 'transaction_expense';
    } else {
      this.transaction_type = 'transaction_income';
    }

    this.block = `<div class="transaction ${this.transaction_type} row">
                    <div class="col-md-7 transaction__details">
                      <div class="transaction__icon">
                          <span class="fa fa-money fa-2x"></span>
                      </div>
                      <div class="transaction__info">
                          <h4 class="transaction__title">${item.name}</h4>
                          <!-- дата -->
                          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="transaction__summ">
                      <!--  сумма -->
                          ${item.sum} <span class="currency">₽</span>
                      </div>
                    </div>
                    <div class="col-md-2 transaction__controls">
                        <!-- в data-id нужно поместить id -->
                        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                            <i class="fa fa-trash"></i>  
                        </button>
                    </div>
                  </div>`
    return this.block
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    this.blockContent = this.element.querySelector('.content');
    this.blockContent.innerHTML = "";
    for (let item of data) {
      this.block = this.getTransactionHTML(item);
      this.blockContent.innerHTML += this.block;
    }
  }
}