/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.btnNewAccount = document.querySelector('.create-account');
    this.btnNewAccount.addEventListener('click', (event) => {
      event.preventDefault();
      this.elemNewAccount = App.getModal('createAccount');
      this.elemNewAccount.open();
    })

    this.elemsAcc = document.querySelectorAll('.account');
    this.elemsAcc.forEach((item) => {
      item.addEventListener ('click', () => {
        this.onSelectAccount(item);
      })
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      this.activeAcc = document.querySelector('.accounts-panel').querySelector(".active");
      if (this.activeAcc) {
        this.account_id = this.activeAcc.getAttribute("data-id");
      }


      Account.list("/account", (err, response) => {
        this.clear();
        this.renderItem(response);

        if (this.account_id) {
          console.log("account_id AccountsWidget update -", this.account_id)
          this.activeAcc = document.querySelector('.accounts-panel').querySelector(`li[data-id="${this.account_id}"]`);
          if (this.activeAcc) {
            this.activeAcc.classList.add("active");
            App.showPage('transactions', {account_id: this.account_id});
          }
        }
        this.registerEvents();
      });

    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    this.elementsAcc = document.querySelectorAll(".account");
    this.elementsAcc.forEach((item) => {
      item.parentNode.removeChild(item);
    })
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    this.elemsAcc.forEach((item) => {
      if (item === element) {
        item.classList.add("active");
        this.account_id = item.getAttribute("data-id");
        App.showPage('transactions', {account_id: this.account_id});
      } else {
        item.classList.remove("active");
      }
    })

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    this.block = `<li class="account" data-id="${item.id}">
                      <a href="#">
                          <span>${item.name}</span> /
                          <span>${item.sum} ₽</span>
                      </a>
                  </li>`
    return this.block
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    for (let item of data.data) {
      this.block = this.getAccountHTML(item);
      this.element.insertAdjacentHTML("beforeEnd", this.block);
    }
  }
}
