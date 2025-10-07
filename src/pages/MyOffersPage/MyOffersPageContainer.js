const getData = async (setData, setLoaddin) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5000);

  try {
    await fetch('https://api.milhaspix.com/simulate-offers-list', {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then(async (body) => {
        setData(body.offers);
        setLoaddin(false);
      });
  } catch (e) {
    console.log(
      'Ocorreu um erro ao se conectar ao servidor, tente novamente mais tarde.'
    );
    console.log('Erro: ', e);
  }
};

export default getData;
