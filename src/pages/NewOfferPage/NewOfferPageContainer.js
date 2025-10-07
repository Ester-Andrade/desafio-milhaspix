const getData = async (setData, price) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5000);

  try {
    await fetch(
      'https://api.milhaspix.com/simulate-ranking?mile_value=' + price,
      {
        signal: controller.signal,
      }
    )
      .then((response) => response.json())
      .then(async (body) => {
        setData(body);
      });
  } catch (e) {
    console.log(
      'Ocorreu um erro ao se conectar ao servidor, tente novamente mais tarde.'
    );
    console.log('Erro: ', e);
  }
};

export default getData;
