import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

const setupHoverText = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll('span');
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, duration, {
      ease: 'power2.out',
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect(); // ✅ اصلاح: letters → letter
      const distance = Math.abs(mouseX - (l - left + w / 2)); // ✅ اصلاح: math → Math
      const intensity = Math.exp(-(distance ** 2) / 2000); // ✅ اصلاح: math → Math

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
  };

  // ✅ اضافه کردن event listeners
  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  // ✅ بازگرداندن cleanup function
  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
  };
};

function Welcome() {
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanup = setupHoverText(titleRef.current, 'title');
    const subtitleCleanup = setupHoverText(subTitleRef.current, 'subtitle');

    return () => {
      titleCleanup?.();
      subtitleCleanup?.();
    };
  }, []);

  return (
    <>
      <section id="welcome">
        <p ref={subTitleRef}>
          {renderText('Hey, I\'m Safiurahman! welcome to my', 'text-3xl font-georama', 100)}
        </p>

        <h1 className="mt-7" ref={titleRef}>
          {renderText('Portfolio', 'text-9xl italic font-georama')}
        </h1>
        
        <div className='small-screen'>
            <p>This Portfolio is designed for desktop/tabled screens only.</p>
        </div>
      </section>
    </>
  );
}

export default Welcome;
