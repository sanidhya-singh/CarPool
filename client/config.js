Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    extraSignupFields: [
        {
            fieldName: 'firstName',
            fieldLabel: 'First name',
            inputType: 'text',
            visible: true,
            saveToProfile: true,
            validate: function(value, errorFunction) {
                if (value.trim() == '') {
                    errorFunction('Last Name cannot be blank');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            fieldName: 'lastName',
            fieldLabel: 'Last name',
            inputType: 'text',
            visible: true,
            saveToProfile: true,
            validate: function(value, errorFunction) {
                if (value.trim() == '') {
                    errorFunction('Last Name cannot be blank');
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]
});
