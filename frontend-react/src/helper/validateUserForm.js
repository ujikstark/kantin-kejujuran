
export default function validateUserForm (values) {
    const errors = {};

        if (values.username) {
            if (values.username.trim().length != 5 || !Number.isInteger(values.username)) {
                errors.name = 'Follow the rules!';
            }

            if (values.username.trim().length == 5) {
                const sum1 = parseInt(values.username[0])+parseInt(values.username[1])+parseInt(values.username[2]);
                const sum2 = values.username[3]+values.username[4];
                if (sum1 != parseInt(sum2)) errors.name = 'Follow the rules!';

            }
        } 

        if (values.password) {
            if (values.password.length < 4) {
                errors.password = 'The password must be at least 4 characters!';
            }
        }
    
        if (values.confirmPassword) {
            if (values.confirmPassword !== values.password && values.confirmPassword !== values.newPassword) {
                errors.confirmPassword = 'The password do not match!';
            }
        }
    
}