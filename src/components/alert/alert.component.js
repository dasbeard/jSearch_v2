import { useContext, useState, useEffect } from 'react';
import { Dialog, Portal, Button, TextInput } from 'react-native-paper';

import { Text } from '../../infrastructure/components/text.component';
import { AuthContext } from '../../services/authentication/authentication.context';
import { View } from 'react-native';
import { colors } from '../../infrastructure/theme/colors';
import { Spacer } from '../../infrastructure/components/spacer.component';

export const DeleteAccountPortal = () => {
  const { dialogVisible, setDialogVisible, deleteAccount, error, setError } =
    useContext(AuthContext);
  const [allowDelete, setAllowDelete] = useState(false);
  const [password, setPassword] = useState('');

  const handleOnChange = (text) => {
    setPassword(text);
    if (text.length > 5) {
      setAllowDelete(true);
    } else {
      setAllowDelete(false);
    }
  };

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  });

  return (
    <View>
      <Portal>
        <Dialog
          style={{
            position: 'absolute',
            top: error ? '25%' : '35%',
            left: 0,
            right: 0,
          }}
          visible={dialogVisible}
          // onDismiss={() => setDialogVisible(false)}
          dismissable={false}
        >
          <Dialog.Icon icon='alert' color={colors.ui.error} size={48} />

          <Dialog.Title>Delete Account?</Dialog.Title>
          <Dialog.Content>
            <Text>This will delete all saved data and settings</Text>
            <Text>Enter your password to confirm</Text>
            <TextInput
              label='Password'
              value={password}
              onChangeText={(text) => handleOnChange(text)}
              autoCapitalize='none'
              secureTextEntry
              textContentType='password'
            />

            {error && (
              <Spacer size='lg'>
                <Text variant='error'>{error}</Text>
              </Spacer>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => deleteAccount(password)}
              buttonColor={colors.ui.error}
              textColor={colors.text.primary}
              style={{ width: 90 }}
              disabled={!allowDelete}
            >
              Delete
            </Button>

            <Button
              textColor={colors.text.primary}
              style={{ width: 90 }}
              onPress={() => setDialogVisible(false)}
            >
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
