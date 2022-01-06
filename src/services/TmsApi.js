import manager from "../helpers/manager";

export default class TmsApi {
    _apiBase = 'https://localhost:44354/api/1';


    getToken = async () => {
        let token;
        await manager
            .getUser()
            .then((user) => {
                token = user.access_token;
            })

        return await token
    }


    /**
     * Базовая функция для отправки POST зарпосов.
     * @param endPoint - конечная точка запроса.
     * @param params - параметр для запроса, в виде строки.
     * @returns {Promise<any>}
     */
    baseGetRequest = async (endPoint, params) => {
        return this
            .getToken()
            .then(async (token) => {
                return await fetch(`${this._apiBase}/${endPoint}/${params}`, {
                    method: "GET",
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Connection': 'keep-alive',
                        'Authorization': 'Bearer ' + token,
                    },
                });
            })
            .then((res) => {
                return res.json()
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    }

    /**
     * Базовая функция для отправки POST зарпосов.
     * @param endPoint - конечная точка запроса.
     * @param data - JS объект с параметрами для выполнения запроса.
     * @returns {Promise<any>}
     */
    basePostRequest = async (endPoint, data) => {
        return this
            .getToken()
            .then(async (token) => {
                return await fetch(`${this._apiBase}/${endPoint}`, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Connection': 'keep-alive',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify(data) // body data type must match "Content-Type" header
                });
            })
            .then((res) => {
                return res.json()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    /**
     * Добавление нового проекта.
     * @param data
     * @returns {Promise<*>}
     */
    createProject = async (data) => {
        return await this.basePostRequest("Project", data)
    }


    /**
     * Получить проект по id.
     * @param id
     * @returns {Promise<*>}
     */
    getProject = async (id) => {
        return await this.baseGetRequest("ProjectParticipant", id);
    }

    /**
     * Получить список всех проектов пользователя.
     * @returns {Promise<*>}
     */
    getProjects = async () => {
        return await this.baseGetRequest("ProjectParticipant");
    }


}





























