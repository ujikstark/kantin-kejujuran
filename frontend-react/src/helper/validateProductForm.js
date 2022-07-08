
export default function validateProductForm (values) {
    const errors = {};
        if (values.name) {
            if (values.name.length < 4) {
                errors.name = 'The item name must be at least 4 characters!';
            }

        } 

        if (values.description) {
            if (values.description.length > 2000) {
                errors.description = 'Too long';
            }
        }
    
        if (values.imageUrl) {
            if (!/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(values.imageUrl)) {
                errors.imageUrl = 'Must Fill Url of image!';
            }
        }

        return errors;

    
}