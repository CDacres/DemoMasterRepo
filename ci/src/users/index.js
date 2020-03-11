import React from 'react';
import { render } from 'react-dom';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const formRoot = document.querySelector('#form-root');

function UserForm() {
    if (formRoot.dataset.formType === 'signin') {
        return (
            <LoginForm
                country_lang_url={window.__props__.country_lang_url}
                lang={window.__props__.lang}
            />
        );
    } else if (formRoot.dataset.formType === 'signup') {
        return (
            <SignupForm
                country_lang_url={window.__props__.country_lang_url}
                lang={window.__props__.lang}
            />
        );
    }
}

render(<UserForm />, formRoot);
