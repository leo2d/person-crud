const formatPhoneNumber = phoneNumber => {
  const ddd = phoneNumber.slice(0, 2);

  const number = phoneNumber.slice(2, 11);

  const leftCount = number.length === 9 ? 5 : 4;
  const left = number.slice(0, leftCount);
  const rigth = number.slice(leftCount, number.length);

  const formatedNumber = `(${ddd})${left}-${rigth}`;

  return formatedNumber;
};

export { formatPhoneNumber };
