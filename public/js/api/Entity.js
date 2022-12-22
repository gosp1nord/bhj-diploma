/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

  

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(url, callback){
    createRequest({
      url: url,
      method: 'GET',
      responseType: 'json',
      callback: (err, response) => {
        callback(err, response);
      }
    });


  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(url, data, callback) {
    createRequest({
      url: url,
      method: 'PUT',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        callback(err, response);
      }
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(url, data, callback ) {
    createRequest({
      url: url,
      method: 'DELETE',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        callback(err, response);
      }
    });
  }
}
