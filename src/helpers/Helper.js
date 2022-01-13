export default class Helper {
    parseDate = (date) => {
        const normalDate = new Date(date);

        return normalDate.getDate() + " "
        + (normalDate.getMonth() + 1) + " "
        + normalDate.getFullYear();
    }
}