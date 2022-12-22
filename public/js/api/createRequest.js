/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
// const createRequest = (options = {}) => {};


const createRequest = (options={}) => {
    let xhr = new XMLHttpRequest;
    xhr.responseType = options.responseType;
    try {
        if (options.metod === 'GET') {
            console.log("get");
            let url = options.url;
            url.searchParams.set(options.data);
            xhr.open('GET', url);
            xhr.send();
        } else {
            this.dataRequest = new FormData();
            for (let key in options.data) {
                this.dataRequest.append(key, options.data[key]);
            }
            xhr.open(options.method, options.url);
            xhr.send(this.dataRequest);
        }

        xhr.onload = function() {
            if (xhr.status === 200) {
                options.callback(null, xhr.response);
            } else {
                options.callback(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            }
        }

    }
    catch (e) {
        options.callback(e);
    }
    
};




