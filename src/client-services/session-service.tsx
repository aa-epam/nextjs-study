import ApiService from "@/src/client-services/api-service";

class SessionService extends ApiService {
    updateUser(newParams) {
        console.log(newParams)
        return this._executeCall('/api/session/user', { method: 'PUT', useXHR: true, body: JSON.stringify(newParams) })
    }
    deleteUser() {
        console.log()
        return this._executeCall('/api/session/user', { method: 'DELETE', useXHR: true })
    }
    updateUser2(newParams) {
        console.log(newParams)
        return this._executeCall('/api/session/user', { method: 'PATCH', useXHR: true, body: JSON.stringify(newParams) })
    }
}

export default new SessionService()