import { BASE_URL } from "../constants/apiConstants";

const FIREBASE_AUTH_BASE_URL: URL = new URL(BASE_URL + "firebase/authentication");

export function addUser(userId: string) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5173/');

    fetch(FIREBASE_AUTH_BASE_URL + "/register/" + userId, { method: "POST", headers: headers, mode: "no-cors" })
        .then((response: Response) => {
            console.log(response);
        })
        .catch((error: Error) => {
            console.error(error);
        })
}