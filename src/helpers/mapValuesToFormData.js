
const mapValuesToFormData = (data) => {
    const formData = new FormData();
    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            formData.append(prop, data[prop]);
        }
    }
    return formData;
};
export default mapValuesToFormData;


