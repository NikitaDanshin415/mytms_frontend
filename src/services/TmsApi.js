import manager from "../helpers/manager";

export default class TmsApi {
    _apiBase = 'https://localhost:44354/api/1';

    createProject = async (text, token) => {
        let data = {
            projectName: text,
        }
        console.log(JSON.stringify(data))

        const res = await fetch(`${this._apiBase}/Project`, {
            method: 'POST',
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

        return res.json()
    }

    getProjects = async (token) => {
        const res = await fetch(`${this._apiBase}/ProjectParticipant`, {
            method: 'GET',
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

        return await res.json()
    }

    getProject = async (id, token) => {
        const res = await fetch(`${this._apiBase}/Project/${id}`, {
            method: 'GET',
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
        return res;
    }
}