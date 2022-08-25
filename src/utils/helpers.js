export const parseDate = (date) => {
  let newDate = date + "000";
  const input = !isNaN(newDate) ? parseInt(newDate) : newDate;
  let tempDate = new Date(input);

  const splitDate = tempDate.toString().split(" ");
  return `${splitDate[2]} ${splitDate[1]}, ${splitDate[3]}`;
};

export const nearAccountToHex = (accountsArray) => {
  const resultArray = [];

  accountsArray.forEach((account) => {
    var result = "";
    for (var i = 0; i < account.length; i++) {
      result += account.charCodeAt(i).toString(16);
    }
    let length = result.length / 2;
    let padding = "00";

    if (length < 20) {
      let iterations = 20 - length;
      for (i = 0; i < iterations; i++) {
        result = padding + result;
      }
    } else {
      result = result.substring(0, 40);
    }
    resultArray.push("0x" + result);
  });

  return resultArray;
};

export const isExpired = (bounty, bountySolidity) => {
  const localStorageChain = localStorage.getItem("wallet-chain");

  if (!localStorageChain) {
    return false;
  }

  if (localStorageChain === "near") {
    return !bounty
      ? false
      : Math.floor(Date.now() / 1000) > parseInt(bounty?.deadline);
  } else {
    if (bountySolidity?.data?.id !== "") {
      return (
        Math.floor(Date.now() / 1000) > parseInt(bountySolidity?.data?.deadline)
      );
    } else {
      return false;
    }
  }
};
