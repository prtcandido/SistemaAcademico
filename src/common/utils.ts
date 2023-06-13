export const brDateToUS = (data: string): string => {
  const dataSplitada = data.split('/');

  const usDate = `${dataSplitada[1]}/${dataSplitada[0]}/${dataSplitada[2]}`;

  return usDate;
};
