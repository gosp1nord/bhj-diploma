/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    this.elemSidebarMini = document.querySelector('.sidebar-toggle');
    this.elemSidebarMini.addEventListener('click', () => {
      document.querySelector("body").classList.toggle("sidebar-open");
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    // клик по кнопке "Регистрация" в боковом меню - открывается окно регистрации
    this.elemReg = document.querySelector('.menu-item_register');
    this.elemReg.addEventListener('click', (event) => {
      event.preventDefault();
      this.btnRegister = App.getModal('register');
      this.btnRegister.open();
    })
    // клик по кнопке "Вход"
    this.elemIn = document.querySelector('.menu-item_login');
    this.elemIn.addEventListener('click', (event) => {
      event.preventDefault();
      this.btnLogin = App.getModal('login');
      this.btnLogin.open();
    })
    // клик по кнопке "Выйти"
    this.elemOut = document.querySelector('.menu-item_logout');
    this.elemOut.addEventListener('click', () => {
      User.logout(() => {
        App.setState('init');
      });
    })

  }
}

