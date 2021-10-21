const month: { [key: string]: string } = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};
const reverseMonth: { [key: string]: string } = {
  "01": "Jun",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export function dateFormatter(str: string): string {
  let formattedString;
  let currMonth = month[str.substr(4, 3)];
  formattedString =
    currMonth + "." + str.substr(8, 2) + "." + str.substr(11, 4);
  return formattedString;
}

String.prototype.datePrettier = function (): string {
  let prettyDate;
  let that = String(this);
  //XXXX-XX-XX 0123-56-89
  //Desired date: 27 Jun 2000 or 5 Mar 1999(w/o zero) for example.
  //current input 07-27-2000
  prettyDate = that.substr(8, 2).startsWith("0")
    ? that.substr(9, 1) +
      " " +
      reverseMonth[that.substr(5, 2)] +
      " " +
      that.substr(0, 4)
    : that.substr(8, 2) +
      " " +
      reverseMonth[that.substr(5, 2)] +
      " " +
      that.substr(0, 4);

  return prettyDate;
};
