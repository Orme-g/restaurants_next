// Function transformDate take Date or array of Dates as an argument and returns
// single string formatted Date if only 1 Date was passed as an argument or array of
// string formatted dates if array was passed as an argument
type MonthFormat = "short" | "long" | "numeric";

function transformDate(date: Date, monthFormat?: MonthFormat): string;
function transformDate(dates: Date[], monthFormat?: MonthFormat): string[];

function transformDate(date: Date | Date[], monthFormat: MonthFormat = "long") {
    if (date instanceof Array) {
        const value: string[] = [];
        let transfValue: string;
        date.forEach((item) => {
            transfValue = new Date(item).toLocaleString("ru", {
                day: "numeric",
                month: monthFormat,
                year: "numeric",
            });
            value.push(transfValue);
        });
        return value;
    } else {
        const value: string = new Date(date).toLocaleString("ru", {
            day: "numeric",
            month: monthFormat,
            year: "numeric",
        });
        return value;
    }
}

export default transformDate;
