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
                    body: JSON.stringify(data)
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
        return await this.baseGetRequest("ProjectParticipant", "");
    }

    /**
     * Добавить в систему план тестирования.
     * @returns {Promise<*>}
     */
    createTestPlan = async (data) => {
        return await this.basePostRequest("TestPlan", data)
    }

    /**
     * Получить список всех планов тестирования проекта.
     * @returns {Promise<*>}
     */
    getTestPlans = async (projectId) => {
        return await this.baseGetRequest("TestPlan", projectId);
    }


    /**
     * Получить список всех пользователей проекта.
     * @returns {Promise<*>}
     */
    getProjectUsers = async (projectId) => {
        return await this.baseGetRequest(`ProjectParticipant`, projectId + "/users");
    }

    /**
     * Поиск пользователя.
     * @returns {Promise<*>}
     */
    findUser = async (data) => {
        return this
            .getToken()
            .then(async (token) => {
                return await fetch(`${this._apiBase}/user?userName=${data.userName}`, {
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
     * Получить список всех пользователей проекта.
     * @returns {Promise<*>}
     */
    adduser = async (data) => {
        return await this.basePostRequest(`ProjectParticipant`, data);
    }


    /**
     * Поиск пользователя.
     * @returns {Promise<*>}
     */
    deleteProjectParticipant = async (data) => {
        return this
            .getToken()
            .then(async (token) => {
                return await fetch(`${this._apiBase}/projectParticipant/${data}`, {
                    method: "DELETE",
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
            .catch((error) => {
                console.log(error);
                return error;
            })
    }


    /**
     * Поиск пользователя.
     * @returns {Promise<*>}
     */
    getTestCaseList = async (id) => {
        return this
            .getToken()
            .then(async (token) => {
                return await fetch(`${this._apiBase}/TestCase?projectId=${id}`, {
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
     * Поиск пользователя.
     * @returns {Promise<*>}
     */
    getTestCaseDetails = async (projectId, testCaseid) => {
        return this
            .getToken()
            .then(async (token) => {
                return await fetch(`${this._apiBase}/TestCase/${testCaseid}`, {
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
     * Добавление сценария тестирования включая шаги тестирования.
     * @param data
     * @returns {Promise<*>}
     */
    addTestCase = async (data) => {
        return await this.basePostRequest("TestCase", data)
    }

    /**
     * Поиск пользователя.
     * @returns {Promise<*>}
     */
    deleteTestCase = async (id) => {
        return this
            .getToken()
            .then(async (token) => {
                return await fetch(`${this._apiBase}/TestCase/${id}`, {
                    method: "DELETE",
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
            .catch((error) => {
                console.log(error);
                return error;
            })
    }

    /**
     * Поиск пользователя.
     * @returns {Promise<*>}
     */
    updateTestCase = async (data) => {
        return this
            .getToken()
            .then(async (token) => {
                return await fetch(`${this._apiBase}/TestCase/${data.id}`, {
                    method: "PUT",
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Connection': 'keep-alive',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify(data)
                });
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    }

    getTestPlanCases = async (id) => {
        return this.baseGetRequest("TestPlanCases", +id);
    }

    addTestCaseResult = async (data) => {
        return this.basePostRequest("TestCaseResult", data);
    }

    /**
     * Получить все результаты сценария в плане.
     */
    getTestCaseResults = async (TestPlanId, TestCaseId) => {
        return this
            .getToken()
            .then(async (token) => {
                return await fetch(`${this._apiBase}/TestCaseResult?testCaseId=${TestCaseId}&testPlanId=${TestPlanId}`, {
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
     * Получение результатов тестирования.
     * @param testCaseResultId
     * @returns {Promise<*>}
     */
    getTestCaseResult = async (testCaseResultId) => {
        return await this.baseGetRequest("TestCaseResult", testCaseResultId);
    }

    /**
     * Получение сценариев тестирования не входящих в выбранный план.
     * @param testCaseResultId
     * @returns {Promise<*>}
     */
    getTestCaseNotInPlan = async (projectId, testPlanId) => {
        return await this.baseGetRequest("TestCase", `${projectId}/${testPlanId}`);
    }

    /**
     * Получение сценариев тестирования не входящих в выбранный план.
     * @param testCaseResultId
     * @returns {Promise<*>}
     */
    addTestCaseInPlan = async (data) => {
        return await this.basePostRequest("TestPlanCases", data);
    }
}





























