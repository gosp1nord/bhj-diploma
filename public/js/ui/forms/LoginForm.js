/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        if (response.success) {
          this.element.reset();
          App.setState('user-logged');
          let blockLogin = App.getModal('login');
          blockLogin.element.style.removeProperty('display');
        } else {
          console.log(response.error)
        }
      }
    });
    
  }
}