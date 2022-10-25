import { useEffect, useState } from 'react';
import styled from 'styled-components'

const Popup = styled.div`
    display: flex;
    position: absolute;
    top: 80px;
    width: 20rem;
    height: 6.5rem;
    background: white;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 10px;
    border-color: #999999;
`;

export default function Notifier( props ) {
    const [valid , setValid] = useState(true);
    const [animation, setAnimation] = useState('notifierIn');
    const [animationTimeout, setAnimationTimeout] = useState(undefined);
    const [expireTimeout, setExpireTimeout] = useState(undefined);

    /* const [text, setText] = useState('Sucesso');
    const [delay] =
    const [visibility] = */
    
    console.log(props);
    

    const text = props.text ? props.text : 'Sucesso';
    const delay = props.delay ? props.delay : 3000;

    function expire(){
        clearTimeout(animationTimeout);
        clearTimeout(expireTimeout);
        const AnimationRef = setTimeout(()=>{
            setAnimation('notifierOut'); 
            const ExpireRef = setTimeout(()=>{setValid(false)},2000);
            setExpireTimeout(ExpireRef);
        },delay);
        setAnimationTimeout(AnimationRef);
    }

    useEffect(()=>{
        /*const text (props.text ? props.text : 'Sucesso');
        const delay = props.delay ? props.delay : 3000;
        const visibility = props.visibility ? props.visibility : false;
        const setText(props.text ? props.text : 'Sucesso');
        const setDelay(props.delay ? props.delay : 3000);
        const setVisibility(props.visibility ? props.visibility : false);*/
        expire()
    },[props]);

    return (
        <>
        {valid ? (
        <Popup className={`notifier ${animation}`}>
            { props.text }
        </Popup>
        ) : null}
        </>
    );
}