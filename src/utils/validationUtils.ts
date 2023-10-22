import { EMAIL_REGEX } from "../constants/validationConstants";

class AccountValidator {
    public validateField(fieldKey: string, fieldValue: string): boolean {
        switch (fieldKey) {
            case "email":
                return this.validateEmailField(fieldValue);
            case "password":
                return this.validatePasswordField(fieldValue);
        }
        return false
    }

    public getErrorMessageForField(fieldKey: string) {
        switch (fieldKey) {
            case "email":
                return "Please enter a valid email";
            case "password":
                return "Please enter a password over 6 characters";
        }
        
    }

    public validateEmailField(email: string) {
        return EMAIL_REGEX.test(email)
    }

    public validatePasswordField(password: string) {
        if (password.length < 6) {
            return false
        }
        return true
    }
}

export class LoginScreenValidator extends AccountValidator {}

export class RegisterScreenValidator extends AccountValidator {

    public validateField(fieldKey: string, fieldValue: string): boolean {
        switch (fieldKey) {
            case "email":
                return this.validateEmailField(fieldValue);
            case "password":
                return this.validatePasswordField(fieldValue);
            case "firstName":
                return this.validateFirstNameField(fieldValue);
            case "lastName":
                return this.validateLastNameField(fieldValue);
        }
        return false
    }

    public validateFirstNameField(firstName: string) {
        return validateRequiredField(firstName)
    }

    public validateLastNameField(lastName: string) {
        return validateRequiredField(lastName)
    }
}

function validateRequiredField(fieldValue: string) {
    if (fieldValue.length == 0) {
        return false
    }
    return true
}