import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { numeroMask, cpfMask, celularMask } from 'masks-br';
import getData from './NewOfferPageContainer';
import FormNav from '../../components/FormNav';
import CustomRadio from '../../components/CustomRadio';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';
import CustomButton from '../../components/CustomButton/CustomButton';
import tudoAzulLogo from '../../config/assets/tudo-azul-logo.png';
import smilesLogo from '../../config/assets/smiles-logo.png';
import latamPassLogo from '../../config/assets/latam-pass-logo.png';
import airPortugalLogo from '../../config/assets/air-portugal-logo.png';
import lockIcon from '../../config/assets/lock-icon.svg';
import backIcon from '../../config/assets/back-arrow-icon.svg';
import forwardIcon from '../../config/assets/forward-arrow-icon.svg';
import airplaneIcon from '../../config/assets/airplane-icon.svg';
import userCircle from '../../config/assets/user-circle-icon.svg';
import blueLockIcon from '../../config/assets/blue-lock-icon.svg';
import brazilFlag from '../../config/assets/brazil-flag.png';
import whatsIcon from '../../config/assets/whatsapp-icon.png';
import thanksImg from '../../config/assets/thanks-img.png';
import './styles.css';

const NewOfferPage = () => {
  const [step, setStep] = useState(0);
  const [alertMsg, setAlertMsg] = useState('');
  const [openExtra, setOpenExtra] = useState(false);
  const [ranking, setRanking] = useState(null);
  const [total, setTotal] = useState(0);

  const loyaltyPrograms = [
    { title: 'Tudo Azul', logo: tudoAzulLogo },
    { title: 'Smiles', logo: smilesLogo },
    { title: 'Latam Pass', logo: latamPassLogo },
    { title: 'Air Portugal', logo: airPortugalLogo },
  ];

  const HandleForwardButton = (event) => {
    switch (step) {
      case 0:
        const radios =
          document.querySelector(
            "input[type='radio'][name='loyalty']:checked"
          ) !== null;

        if (radios) {
          setStep(step + 1);
          setAlertMsg('');
        } else {
          setAlertMsg('Preencha todos os campos antes de prosseguir');
        }
        break;

      case 1:
        const radios2 =
          document.querySelector(
            "input[type='radio'][name='when-receiving-op']:checked"
          ) !== null;
        const field1 = document.getElementById('milhas-ofer').checkValidity();
        const field2 = document.getElementById('milhas-valor').checkValidity();

        if (radios2 & field1 & field2) {
          setStep(step + 1);
          setAlertMsg('');
        } else {
          setAlertMsg('Preencha todos os campos antes de prosseguir');
        }
        break;

      case 2:
        if (document.getElementById('my-form').checkValidity()) {
          setStep(step + 1);
          setAlertMsg('');
          HandleSubmit(event);
        } else {
          setAlertMsg(
            'Preencha todos os campos do formulário antes de prosseguir'
          );
        }
        break;
      default:
        break;
    }
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulário enviado');

    // if (document.getElementById('my-form').checkValidity()) {
    //   setStep(step + 1);
    //   setAlertMsg('');
    // } else {
    //   setAlertMsg('Preencha todos os campos do formulário antes de prosseguir');
    // }
  };

  const onInputBlur = (id, type) => {
    const CurrentValue = document.getElementById(id).value;
    document.getElementById(id).value = UseMask(type, CurrentValue);

    var mile = document.getElementById('milhas-ofer').value;
    var milePrice = document.getElementById('milhas-valor').value;
    if ((mile !== '') & (milePrice !== '')) {
      mile = mile.replaceAll('.', '');
      mile = mile.replace(',', '.');
      milePrice = milePrice.replaceAll('.', '');
      milePrice = milePrice.replace(',', '.');
      setTotal((parseFloat(mile) * parseFloat(milePrice)) / 1000);
    }
    return;
  };

  const TotalMask = (value) => {
    let n = value.toString();

    return numeroMask(parseFloat(n));
  };

  const UseMask = (type, value) => {
    switch (type) {
      case 'number':
        let n = value.toString();
        n = n.replaceAll('.', '');
        n = n.replace(',', '.');

        return numeroMask(parseFloat(n));
      case 'money':
        let m = value.toString();
        m = m.replaceAll('.', '');
        m = m.replace(',', '.');

        getData(setRanking, m);

        return numeroMask(parseFloat(m));
      case 'cpf':
        let c = value.replaceAll('.', '');
        c = c.replace('-', '');

        return cpfMask(c);
      case 'telephone-number':
        let tn = value.replace('(', '');
        tn = tn.replace(')', '');
        tn = tn.replace(' ', '');
        tn = tn.replace('-', '');

        return celularMask(tn);
      default:
        return;
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <section className='new-offer-sec'>
        <div className='new-offer-sec__container'>
          <FormNav
            currentStep={step}
            setStep={setStep}
            style={{ minWidth: '15rem', maxWidth: '18rem', flex: 1 }}
          />
          {step === 3 ? (
            <div className='new-offer-sec__main'>
              <div className='thanks-container'>
                <img src={thanksImg} className='thanks__img' alt='' />
                <h1 className='thanks__title'>
                  Ordem de venda criada com sucesso!
                </h1>
                <p className='thanks__text'>
                  Agora é só aguardar — assim que suas milhas forem vendidas, o
                  valor será transferido direto para sua conta via Pix.
                </p>
                <div className='see-my-offers-button'>
                  <CustomButton
                    onPress={() => {
                      navigate('/offers');
                    }}
                    title='Ver minhas ofertas'
                    icon={forwardIcon}
                    UItype='primary'
                    direction='reversed'
                    type='button'
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className='new-offer-sec__main'>
              <div className='new-offer-sec__main__content'>
                <div className='new-offer-sec__main__header'>
                  <h1 className='new-offer-sec__main__title'>
                    <span>0{step + 1}.</span>
                    {step === 0
                      ? 'Escolha o programa de fidelidade'
                      : step === 1
                      ? 'Oferte suas milhas'
                      : 'Insira os dados do programa de fidelidade'}
                  </h1>
                  {alertMsg !== '' && <p className='alert-msg'>{alertMsg}</p>}
                </div>
                <form
                  id='my-form'
                  // onSubmit={(e) => HandleSubmit(e)}
                  className='form-container'
                >
                  <div
                    className={
                      step !== 0
                        ? 'form-step-container hidden'
                        : 'form-step-container'
                    }
                  >
                    <div className='program-container'>
                      <CustomRadio
                        id='tudo-azul'
                        name='loyalty'
                        labelValue={loyaltyPrograms[0].title}
                        labelImg={loyaltyPrograms[0].logo}
                        imgStyle={{ height: '1.625rem' }}
                      />
                      <CustomRadio
                        id='smiles'
                        name='loyalty'
                        labelValue={loyaltyPrograms[1].title}
                        labelImg={loyaltyPrograms[1].logo}
                        imgStyle={{ height: '1.313rem' }}
                      />
                      <CustomRadio
                        id='latam-pass'
                        name='loyalty'
                        labelValue={loyaltyPrograms[2].title}
                        labelImg={loyaltyPrograms[2].logo}
                        imgStyle={{ height: '1.5rem' }}
                      />
                      <CustomRadio
                        id='air-portugal'
                        name='loyalty'
                        labelValue={loyaltyPrograms[3].title}
                        labelImg={loyaltyPrograms[3].logo}
                        imgStyle={{ height: '1.125rem' }}
                      />
                    </div>
                    <div className='fields-container'>
                      <div className='label-field'>
                        <label htmlFor='product'>Produto</label>
                        <CustomDropdown
                          id='product'
                          name='product'
                          data={['Liminar', 'Comum', 'Viagens']}
                          style={{ width: '100%' }}
                          fontconfig={{
                            fontFamily: 'var(--DM-Sans)',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                          }}
                        />
                      </div>
                      <div className='label-field'>
                        <label htmlFor='cpf'>CPF's Disponíveis</label>
                        <CustomInput
                          id='cpf'
                          name='cpf'
                          placeholder='Ilimitado'
                          icon={lockIcon}
                          style={{ width: '100%' }}
                          fontconfig={{ fontFamily: 'var(--DM-Sans)' }}
                          disable={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      step !== 1
                        ? 'form-step-container hidden'
                        : 'form-step-container'
                    }
                  >
                    <p className='when-receiving-label'>Quero Receber</p>
                    <div className='when-receiving'>
                      <CustomRadio
                        id='imediato'
                        name='when-receiving-op'
                        labelValue='Imediato'
                      />
                      <CustomRadio
                        id='dois-dias'
                        name='when-receiving-op'
                        labelValue='em 2 dias'
                      />
                      <CustomRadio
                        id='sete-dias'
                        name='when-receiving-op'
                        labelValue='em 7 dias'
                      />
                      <CustomRadio
                        id='depois-voo'
                        name='when-receiving-op'
                        labelValue='Depois do voo'
                      />
                    </div>
                    <div className='fields-container'>
                      <div className='label-field'>
                        <label htmlFor='milhas-ofer'>Milhas ofertadas</label>
                        <CustomInput
                          id='milhas-ofer'
                          name='milhas-ofer'
                          icon={airplaneIcon}
                          style={{ width: '100%' }}
                          fontconfig={{ fontFamily: 'var(--DM-Mono)' }}
                          required={true}
                          onBlur={() => {
                            onInputBlur('milhas-ofer', 'number');
                          }}
                        />
                      </div>
                      <div className='label-field'>
                        <label htmlFor='milhas-valor'>
                          Valor a cada 1.000 milhas
                        </label>
                        <CustomInput
                          id='milhas-valor'
                          name='milhas-valor'
                          // icon={doubleArrowIcon}
                          style={{ width: '100%' }}
                          fontconfig={{ fontFamily: 'var(--DM-Mono)' }}
                          required={true}
                          onBlur={() => {
                            onInputBlur('milhas-valor', 'money');
                          }}
                          children={<div className='milhas-valor-tag'>R$</div>}
                        />
                      </div>
                    </div>

                    {ranking !== null && (
                      <div className='mobile-ranking'>
                        {ranking.map((line, i) => {
                          return (
                            <div
                              key={i}
                              className={
                                line.description === 'essa será sua posição'
                                  ? 'mobile-ranking-line your-ranking-line'
                                  : 'mobile-ranking-line'
                              }
                            >
                              {line.description === 'essa será sua posição' && (
                                <span className='mobile-you-tag'>Você</span>
                              )}

                              <span className='mobile-ranking-position'>
                                {line.position + 'º'}
                              </span>
                              <span className='mobile-ranking-value'>
                                {'R$ ' + TotalMask(line.mile_value)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div
                      className='switch-container'
                      onClick={() => {
                        setOpenExtra(!openExtra);
                      }}
                    >
                      <div
                        className={openExtra ? 'switch switch--on' : 'switch'}
                      >
                        <div className='switch__button' />
                      </div>
                      <span
                        className={
                          openExtra
                            ? 'switch-text switch-text--on'
                            : 'switch-text'
                        }
                      >
                        Definir média de milhas por passageiro
                      </span>
                    </div>
                    {openExtra && (
                      <div className='average-miles'>
                        <CustomInput
                          id='average miles'
                          name='average miles'
                          style={{ flex: 1 }}
                          fontconfig={{ fontFamily: 'var(--DM-Mono)' }}
                        />
                        <div className='miles-tip'>
                          <span>Melhor média para a sua oferta: 27.800</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      step !== 2
                        ? 'form-step-container hidden'
                        : 'form-step-container'
                    }
                  >
                    <div className='fields-container mb'>
                      <div className='label-field'>
                        <label htmlFor='cpf-titu'>CPF do Titular</label>
                        <CustomInput
                          id='cpf-titu'
                          name='cpf-titu'
                          placeholder='000.000.000-00'
                          icon={userCircle}
                          style={{ width: '100%' }}
                          fontconfig={{ fontFamily: 'var(--DM-Mono)' }}
                          required={true}
                          onBlur={() => {
                            onInputBlur('cpf-titu', 'cpf');
                          }}
                        />
                      </div>
                      <div className='label-field'>
                        <label htmlFor='login-number'>Login de acesso</label>
                        <CustomInput
                          id='login-number'
                          name='login-number'
                          style={{ width: '100%' }}
                          fontconfig={{ fontFamily: 'var(--DM-Mono)' }}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className='fields-container'>
                      <div className='label-field'>
                        <label htmlFor='password'>Senha de acesso</label>
                        <CustomInput
                          id='password'
                          name='password'
                          icon={blueLockIcon}
                          style={{ width: '100%' }}
                          fontconfig={{ fontFamily: 'var(--DM-Mono)' }}
                          required={true}
                        />
                      </div>
                      <div className='label-field'>
                        <label htmlFor='autentication-phone'>
                          Telefone para autenticação
                        </label>
                        <CustomInput
                          id='autentication-phone'
                          name='autentication-phone'
                          placeholder='(00) 00000-0000'
                          icon={whatsIcon}
                          style={{ width: '100%' }}
                          fontconfig={{ fontFamily: 'var(--DM-Mono)' }}
                          required={true}
                          onBlur={() => {
                            onInputBlur(
                              'autentication-phone',
                              'telephone-number'
                            );
                          }}
                          children={
                            <div className='autentication-phone-tag'>
                              <span>+55</span>
                              <img src={brazilFlag} alt='' />
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className='new-offer-sec__main__buttons'>
                {step !== 0 && (
                  <CustomButton
                    onPress={() => setStep(step - 1)}
                    title='Voltar'
                    icon={backIcon}
                    UItype='secondary'
                    direction='normal'
                    type='button'
                  />
                )}
                {step === 2 ? (
                  <div className='complete'>
                    <p className='terms-of-use'>
                      Ao prosseguir você concorda com os{' '}
                      <a href='https://milhaspix.com/termos-e-uso'>
                        termos de uso
                      </a>
                    </p>
                    <CustomButton
                      onPress={HandleForwardButton}
                      title='Concluir'
                      icon={forwardIcon}
                      UItype='primary'
                      direction='reversed'
                      form='my-form'
                    />
                  </div>
                ) : (
                  <CustomButton
                    onPress={HandleForwardButton}
                    title='Prosseguir'
                    icon={forwardIcon}
                    UItype='primary'
                    direction='reversed'
                    type='button'
                    style={{ marginLeft: 'auto' }}
                  />
                )}
              </div>
            </div>
          )}
          {step !== 3 && (
            <aside className='new-offer-sec__aside'>
              <div className='new-offer-sec__tip'>
                <h2 className='new-offer-sec__tip__title'>
                  {step === 0
                    ? 'Selecione o programa'
                    : step === 1
                    ? 'Média de milhas'
                    : 'Dados da Conta'}
                </h2>
                <p className='new-offer-sec__tip__description'>
                  {step === 0
                    ? 'Escolha de qual programa de fidelidade você quer vender suas milhas. Use apenas contas em seu nome.'
                    : step === 1
                    ? 'Ao vender mais de 20.000 milhas, ative as Opções Avançadas para definir a média de milhas por emissão.'
                    : 'Por favor, insira os dados da conta que deseja cadastrar e verifique se estão corretos.'}
                </p>
              </div>
              {step === 1 && (
                <>
                  {ranking !== null && (
                    <div className='ranking'>
                      <p className='ranking__title'>Ranking das ofertas</p>
                      <div className='ranking__content'>
                        {ranking.map((line, i) => {
                          return (
                            <div
                              key={i}
                              className={
                                line.description === 'essa será sua posição'
                                  ? 'ranking-line your-ranking-line'
                                  : 'ranking-line'
                              }
                            >
                              <div>
                                <span className='ranking-position'>
                                  {line.position + 'º'}
                                </span>
                                <span className='ranking-value'>
                                  {'R$ ' + TotalMask(line.mile_value)}
                                </span>
                              </div>
                              {line.description === 'essa será sua posição' && (
                                <span className='you-tag'>Você</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className='vline' />
                  <div className='total-container'>
                    <p className='total__title'>Receba até:</p>
                    <div className='total__content'>
                      <span>R$</span>
                      <span>{TotalMask(total)}</span>
                    </div>
                  </div>
                </>
              )}
            </aside>
          )}
        </div>
      </section>
      <div className='footer__buttons'>
        {step !== 0 && (
          <CustomButton
            onPress={
              step !== 3
                ? () => setStep(step - 1)
                : () => setStep(0)
            }
            title={step !== 3 ? '' : 'Sair'}
            icon={step !== 3 && backIcon}
            UItype='secondary'
            direction='normal'
            type='button'
            style={
              step !== 3
                ? { padding: '0.75rem 0.25rem 0.75rem 0.75rem' }
                : { padding: '0.625rem 1.5rem 0.625rem 0' }
            }
          />
        )}
        {step !== 3 && (
          <div className='footer-nav'>
            <span>{step + 1}</span> de 4
          </div>
        )}
        {step === 2 ? (
          <CustomButton
            onPress={HandleForwardButton}
            title='Concluir'
            icon={forwardIcon}
            UItype='primary'
            direction='reversed'
            form='my-form'
          />
        ) : (
          <CustomButton
            onPress={
              step !== 3
                ? HandleForwardButton
                : () => {
                    navigate('/offers');
                  }
            }
            title={step !== 3 ? 'Prosseguir' : 'Ver minhas ofertas'}
            icon={forwardIcon}
            UItype='primary'
            direction='reversed'
            type='button'
            style={{ alignSelf: 'flex-end' }}
          />
        )}
      </div>
    </>
  );
};

export default NewOfferPage;
