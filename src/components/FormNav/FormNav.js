import './styles.css';

const FormNav = ({ currentStep, setStep, style = {} }) => {
  const steps = [
    'Escolha a companhia aérea',
    'Oferte suas milhas',
    'Insira os dados do programa',
    'Pedido finalizado',
  ];
  const numSteps = steps.length;

  return (
    <div className='form-nav' style={style}>
      {steps.map((step, key) => (
        <div
          key={key}
          className={
            'form-nav-item ' + (key === currentStep && 'form-nav-item-current')
          }
          onClick={() => setStep(key)}
        >
          <div className='indicator'>
            <div
              className='line'
              style={{
                backgroundColor:
                  key <= currentStep
                    ? key === 0
                      ? 'transparent'
                      : 'var(--primary2)'
                    : 'var(--PB3)',
              }}
            />
            <div
              className={
                'circle ' +
                (key <= currentStep &&
                  (key === currentStep ? 'circle-current' : 'circle-passed'))
              }
            >
              <div
                className={
                  'dot ' +
                  (key <= currentStep &&
                    (key === currentStep ? 'dot-current' : 'dot-passed'))
                }
              />
            </div>
            <div
              className='line'
              style={{
                backgroundColor:
                  key === numSteps - 1
                    ? 'transparent'
                    : key < currentStep
                    ? 'var(--primary2)'
                    : 'var(--PB3)',
              }}
            />
          </div>
          <div className='FormNav-info'>
            <span
              className='step-number'
              style={{ color: key > currentStep && 'var(--PB3)' }}
            >
              {'Passo ' + (key + 1)}
            </span>
            <span
              className='step-name'
              style={{ color: key > currentStep && 'var(--PB3)' }}
            >
              {step}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormNav;
