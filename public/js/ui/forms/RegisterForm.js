/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        if (response.success) {
          this.element.reset();
          App.setState('user-logged');
          let blockLogin = App.getModal('register');
          blockLogin.element.style.removeProperty('display');
        } else {
          console.log(response.error)
        }
      }

    });
  }
}