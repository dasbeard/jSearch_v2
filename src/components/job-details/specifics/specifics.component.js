import { View } from 'react-native';
import { Text } from '../../../infrastructure/components/text.component';
import { colors } from '../../../infrastructure/theme/colors';

export const Specifics = ({ title, points, description }) => {
  const hasPoints = points !== null ? true : false;

  return (
    <View style={{ marginHorizontal: 6 }}>
      {title && <Text variant='body'>{title}</Text>}

      {description && <Text variant='body'>{description}</Text>}

      {hasPoints ? (
        <View style={{ marginVertical: 6, width: '90%' }}>
          {points.map((item, idx) => (
            <View
              key={item + idx}
              style={{ flexDirection: 'row', marginVertical: 6 }}
            >
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 6,
                  backgroundColor: colors.text.secondary,
                  marginVertical: 6,
                  marginHorizontal: 9,
                }}
              />
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};
