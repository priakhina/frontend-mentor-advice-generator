import { useState, useEffect } from 'react';
import adviceService from '../services/random-advice';
import patternDividerMobile from '../assets/images/pattern-divider-mobile.svg';
import patternDividerDesktop from '../assets/images/pattern-divider-desktop.svg';
import diceIcon from '../assets/images/icon-dice.svg';

const AdviceCard = () => {
  const [randomAdvice, setRandomAdvice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdvice();
  }, []);

  async function fetchAdvice() {
    try {
      const advice = await adviceService.getRandomAdvice();
      setRandomAdvice(advice.slip);
    } catch (e) {
      console.log(e);
      setRandomAdvice({ id: undefined, advice: 'Oops! Something went wrong.' });
    } finally {
      setLoading(false);
    }
  }

  function handleButtonClick() {
    setLoading(true);
    fetchAdvice();
  }

  return (
    <div className='relative max-w-[540px] flex flex-col gap-[16px] w-full mx-[16px] bg-[#313A48] rounded-[10px] pt-[40px] pb-[64px] px-[23.5px] text-center'>
      {loading && (
        <>
          <span className='font-semibold text-[13px] text-[#53ffaa] uppercase tracking-[3px]'>
            Fetcing a new advice...
          </span>
          <span className='block loading-spinner w-[64px] h-[64px] mx-auto'></span>
        </>
      )}
      {!loading && (
        <>
          {randomAdvice && randomAdvice.id && (
            <span className='font-semibold text-[13px] text-[#53ffaa] uppercase tracking-[3px]'>
              Advice #{randomAdvice.id}
            </span>
          )}
          <p className='text-[#cee3e9]'>{`“${randomAdvice.advice}”`}</p>
          <img
            className='md:hidden'
            src={patternDividerMobile}
            alt='Visual separator'
          />
          <img
            className='hidden md:block'
            src={patternDividerDesktop}
            alt='Visual separator'
          />
          <button
            className='absolute bottom-0 left-[50%] -translate-x-1/2 translate-y-1/2 w-[64px] h-[64px] bg-[#53ffaa] p-[20px] rounded-[32px] cursor-pointer hover:shadow-[0_0_20px_#53ffaa]'
            onClick={handleButtonClick}
          >
            <img src={diceIcon} alt='Dice icon' />
          </button>
        </>
      )}
    </div>
  );
};

export default AdviceCard;
