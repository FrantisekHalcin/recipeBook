export class UserModel {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpiry: Date,
    ) {
    }

    get token() {
        if (!this._tokenExpiry || new Date() > this._tokenExpiry) {
            return null;
        }
        return this._token;
    }

    get logTime() {
        return new Date(this._tokenExpiry).getTime() - new Date().getTime();
    }
}
