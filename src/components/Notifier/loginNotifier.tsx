import styled from 'styled-components';

const Popup = styled.div`
  display: flex;
  position: absolute;
  top: -120px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 20rem;
  height: 6.5rem;
  padding: 1rem;
  background: white;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.border};
  z-index: 50;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.textDark};
  text-align: center;
`;

export function notify(text, delay, timeouts) {
  const notifier = document.getElementById('notifier');
  const notifierLabel = document.getElementById('notifier-label');

  const texto = text || 'Sucesso';
  const time = delay || 5000;
  const expireTimeout = timeouts?.animation ? timeouts.animation : undefined;
  const animationTimeout = timeouts?.expire ? timeouts.expire : undefined;

  clearTimeout(animationTimeout);
  clearTimeout(expireTimeout);
  notifierLabel.innerHTML = texto;
  notifier.style.animation = 'none';
  const AnimationRef = setTimeout(() => {
    notifier.style.animation = null;
  }, 1);
  notifier.classList.remove('loginNotifierOut');
  notifier.classList.add('loginNotifierIn');
  const ExpireRef = setTimeout(() => {
    notifier.classList.remove('loginNotifierIn');
    notifier.classList.add('loginNotifierOut');
  }, time);
  // setExpireTimeout(ExpireRef);
  // setAnimationTimeout(AnimationRef);
  const timeoutsRef = { animation: AnimationRef, expire: ExpireRef };

  return timeoutsRef;
}

export default function Notifier() {
  return (
    <Popup id="notifier">
      <Label id="notifier-label" />
    </Popup>
  );
}
