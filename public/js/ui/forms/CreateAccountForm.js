/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {

    Account.create("/account", data, (err, response) => {
      if (err) {
        console.log(err);
      } else if (response.success) {
        this.element.reset();
        this.blockNewAccount = App.getModal('createAccount');
        this.blockNewAccount.element.style.removeProperty('display');
        App.update();
      } else {
        console.log(response.error);
      }
    });

  }
}