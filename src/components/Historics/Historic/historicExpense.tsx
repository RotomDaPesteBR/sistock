/* eslint-disable @typescript-eslint/no-unused-vars */
import { darken } from 'polished';
import styled from 'styled-components';

const Item = styled.div`
  width: 90%;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-color: #999999;
  background: ${({ theme }) => darken(0.01, theme.background)};
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

const LabelItem = styled.div`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
`;

export default function Historic({ historic, type, stripe }, ...props) {
  return (
    <Item {...props}>
      {type === 'in' ? (
        <div>
          <Label className={stripe ? 'striped' : ''}>
            <LabelItem>{`${historic.expenses.name || ''} ${
              historic.expenses.brand || ''
            }`}</LabelItem>
            <LabelItem>{`R$${
              historic.value
                ? Number(historic.value).toFixed(2).replace(/\./, ',')
                : '0,00'
            }`}</LabelItem>
            <LabelItem>{`${
              historic.date.slice(0, 10).split('-').reverse().join('/') || ''
            }`}</LabelItem>
          </Label>
        </div>
      ) : null}
      {type === 'out' ? (
        <div>
          <Label className={stripe ? 'striped' : ''}>
            <LabelItem>{`${historic.expenses.name || ''} ${
              historic.expenses.brand || ''
            }`}</LabelItem>
            <LabelItem>{`${historic.quantity || ''}`}</LabelItem>
            <LabelItem>{`${historic.motive || ''}`}</LabelItem>
            <LabelItem>{`${
              historic.date.slice(0, 10).split('-').reverse().join('/') || ''
            }`}</LabelItem>
          </Label>
        </div>
      ) : null}
    </Item>
  );
}
