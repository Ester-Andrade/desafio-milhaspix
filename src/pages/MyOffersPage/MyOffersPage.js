import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import getData from './MyOffersPageContainer';
import CustomButton from '../../components/CustomButton';
import CustomDropdown from '../../components/CustomDropdown';
import plusIcon from '../../config/assets/plus-icon.svg';
import searchIcon from '../../config/assets/search-icon.svg';
import tudoAzulRounded from '../../config/assets/tudo-azul-rounded.png';
import smilesRounded from '../../config/assets/smiles-rounded.png';
import './styles.css';

const MyOffersPage = () => {
  const [gettingData, setGettingData] = useState(true);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await getData(setData, setGettingData);
      } catch (error) {
        setGettingData(true);
      }
    })();
  }, []);

  const formatDate = (strDate) => {
    const date = new Date(strDate);
    const dateBR = date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    return dateBR.replaceAll(' de ', ' ');
  };

  return (
    <section className='my-offers-sec'>
      <div className='my-offers-sec__header'>
        <h1 className='my-offers-sec__title'>Minhas Ofertas</h1>
        <CustomButton
          onPress={() => navigate('/')}
          title={'Nova oferta'}
          icon={plusIcon}
          UItype={'primary'}
          style={{
            padding: '0.625rem 1rem',
            fontFamily: 'var(--Plus-Jakarta-Sans)',
            fontWeight: '600',
            lineHeight: 'normal',
          }}
        />
      </div>
      <div className='my-offers-sec__content'>
        <div className='my-offers-sec__content-header'>
          <h2 className='my-offers-sec__title all-offers'>Todas ofertas</h2>
          <div className='fields-div'>
            <form
              className='search-container'
              onSubmit={() => {
                console.log('searching....');
              }}
            >
              <input
                type='text'
                id='search-input'
                name='search-input'
                className='search-input'
                placeholder='Login de acesso, ID da oferta...'
              ></input>
              <button type='submit' className='search-submit'>
                <img src={searchIcon} className='search-icon' alt='' />
              </button>
            </form>
            <CustomDropdown
              id='my-offers-filter'
              name='my-offers-filter'
              data={['Filtros', 'Mais recente', 'Mais antigo']}
              style={{ width: '20%', maxWidth: '202px' }}
            />
          </div>
        </div>
        <div className='data-table-container'>
          <table className='data-table'>
            <thead>
              <tr>
                <th>Programa</th>
                <th>Status</th>
                <th>ID da oferta</th>
                <th>Login</th>
                <th>Milhas ofertadas</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {data !== null
                ? data.map((line, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <div className='table-program-container'>
                            <img
                              src={
                                line.loyaltyProgram === 'TudoAzul'
                                  ? tudoAzulRounded
                                  : smilesRounded
                              }
                              className='table-program__logo'
                              alt=''
                            />
                            <div className='table-program__infos'>
                              <p
                                className='table-program__name'
                                style={
                                  line.loyaltyProgram === 'TudoAzul'
                                    ? { color: '#40B6E6' }
                                    : { color: '#F57921' }
                                }
                              >
                                {line.loyaltyProgram}
                              </p>
                              <p className='table-program__type'>
                                {line.offerType}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            className={
                              line.offerStatus === 'Ativa'
                                ? 'table-status-active'
                                : line.offerStatus === 'Inativo'
                                ? 'table-status-inactive'
                                : 'table-status-in-use'
                            }
                          >
                            <div className='table-status__dot' />
                            <p>{line.offerStatus}</p>
                          </div>
                        </td>
                        <td>{line.offerId}</td>
                        <td>{line.accountLogin}</td>
                        <td>{line.availableQuantity}</td>
                        <td>{formatDate(line.createdAt)}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          <div className='data-cards'>
            {data !== null
              ? data.map((line, i) => {
                  return (
                    <div className='data-card' key={i}>
                      <div className='data-card__header'>
                        <div className='data-card__header-left'>
                          <img
                            src={
                              line.loyaltyProgram === 'TudoAzul'
                                ? tudoAzulRounded
                                : smilesRounded
                            }
                            className='card-program-logo'
                            alt=''
                          />
                          <p
                            className='card-program-name'
                            style={
                              line.loyaltyProgram === 'TudoAzul'
                                ? { color: '#40B6E6' }
                                : { color: '#F57921' }
                            }
                          >
                            {line.loyaltyProgram}
                          </p>
                          <p className='card-program-type'>{line.offerType}</p>
                        </div>
                        <div className='data-card__header-right'>
                          <div
                            className={
                              line.offerStatus === 'Ativa'
                                ? 'table-status-active'
                                : line.offerStatus === 'Inativo'
                                ? 'table-status-inactive'
                                : 'table-status-in-use'
                            }
                          >
                            <div className='table-status__dot' />
                            <p>{line.offerStatus}</p>
                          </div>
                          <p className='card-date'>
                            {formatDate(line.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className='data-card__content'>
                        <div className='data-card__content__line'>
                          <p className='data-card__content__line-title'>
                            ID da oferta
                          </p>
                          <p className='data-card__content__line-info'>
                            {line.offerId}
                          </p>
                        </div>
                        <div className='data-card__content__line'>
                          <p className='data-card__content__line-title'>
                            Login
                          </p>
                          <p className='data-card__content__line-info'>
                            {line.accountLogin}
                          </p>
                        </div>
                        <div className='data-card__content__line'>
                          <p className='data-card__content__line-title'>
                            Milhas ofertadas
                          </p>
                          <p className='data-card__content__line-info'>
                            {line.availableQuantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <ClipLoader
            color='#1e90ff'
            loading={gettingData}
            size={45}
            cssOverride={{ margin: '50px 0' }}
            speedMultiplier={0.7}
          />
        </div>
      </div>
    </section>
  );
};

export default MyOffersPage;
