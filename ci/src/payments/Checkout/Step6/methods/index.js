
import axios from 'axios';
import qs from 'qs';

function saveDetails(user_id, password, password_confirmation, token) {
    return new Promise((resolve) => {
        let errorMessage = '';
        if (password === '') {
            errorMessage = 'You must enter a password';
        } else if (password_confirmation === '') {
            errorMessage = 'You must enter a password confirmation';
        } else if (password !== password_confirmation) {
            errorMessage = 'Your password and password confirmation fields must match';
        }
        if (errorMessage === '') {
            axios({
                method: 'post',
                url: '/api/v1/users/updatepassword',
                data: qs.stringify({
                    user_id,
                    token,
                    password,
                    password_confirmation
                }),
                validateStatus: (status) => {
                    return status;
                }
            })
            .then(({ data, status }) => {
                if (status === 200) {
                    resolve({
                        error: {
                            occurred: false
                        }
                    });
                } else {
                    resolve({
                        error: {
                            occurred: true,
                            message: data.data.error.message
                        }
                    });
                }
            });
        } else {
            resolve({
                error: {
                    occurred: true,
                    message: errorMessage
                }
            });
        }
    });
}

export { saveDetails };
