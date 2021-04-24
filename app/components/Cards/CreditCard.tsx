import React from 'react';
import { Image, View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import Body from '../Typography/Body';
import Caption from '../Typography/Caption';
import Title from '../Typography/Title';

interface CreditCardProps extends ViewProps {
  balance: string;
  cardNumber: string;
  expiry: string;
  paymentNetwork: 'visa' | 'mastercard';
  backgroundColor?: string;
  darkText?: boolean;
}

const CreditCard: React.FC<CreditCardProps> = ({
  style,
  expiry,
  balance,
  cardNumber,
  paymentNetwork,
  darkText = false,
  backgroundColor = '#39A0ED',
  ...props
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          minHeight: 184,
          padding: 16,
          backgroundColor,
          borderRadius: theme.roundness * 1.4,
          elevation: 4,
        },
        style,
      ]}
      {...props}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: -4,
        }}>
        <Caption
          style={{
            textTransform: 'uppercase',
            color: darkText ? '#333333' : '#FFFFFF',
          }}>
          Reanimated{'\n'}Bank
        </Caption>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Title style={{ color: darkText ? '#333333' : '#FFFFFF' }}>
            {balance}
          </Title>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Body
          style={{
            fontFamily: 'Quicksand-Medium',
            marginBottom: 16,
            color: darkText ? '#333333' : '#FFFFFF',
          }}>
          {cardNumber}
        </Body>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Caption style={{ color: darkText ? '#333333' : '#FFFFFF' }}>
            valid{'\n'}thru
          </Caption>
          <Body
            style={{
              marginLeft: 4,
              color: darkText ? '#333333' : '#FFFFFF',
            }}>
            {expiry}
          </Body>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}>
            {paymentNetwork === 'visa' ? (
              <Image
                style={{ height: 30, width: 30, marginBottom: -12 }}
                source={require('../../../assets/images/visa.png')}
                resizeMode="contain"
              />
            ) : (
              <Image
                style={{ height: 30, width: 30, marginBottom: -12 }}
                source={require('../../../assets/images/master_card.png')}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreditCard;
