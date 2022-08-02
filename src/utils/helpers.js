export const parseDate = (date) => {
    const input = !isNaN(date) ? parseInt(date) : date
    var tempDate = new Date(input);
    const splitDate = tempDate.toString().split(" ");
    return `${splitDate[2]} ${splitDate[1]}, ${splitDate[3]}`;
  };