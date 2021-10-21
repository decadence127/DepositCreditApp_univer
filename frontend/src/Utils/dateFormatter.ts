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

export function dateFormatter(str: string): string {
  let formattedString;
  let currMonth = month[str.substr(4, 3)];
  formattedString =
    currMonth + "." + str.substr(8, 2) + "." + str.substr(11, 4);
  return formattedString;
}
