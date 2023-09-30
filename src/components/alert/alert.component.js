import { useContext, useState } from 'react';
import { Dialog, PaperProvider, Portal, Button } from 'react-native-paper';

import { Text } from '../../infrastructure/components/text.component';
import { AuthContext } from '../../services/authentication/authentication.context';
import { View } from 'react-native';
import { colors } from '../../infrastructure/theme/colors';

export const DeleteAccountPortal = () => {
  const { dialogVisible, setDialogVisible, deleteAccount } =
    useContext(AuthContext);

  return (
    <View>
      <Portal>
        <Dialog
          style={{
            position: 'absolute',
            top: '40%',
            left: 0,
            right: 0,
          }}
          visible={dialogVisible}
          // onDismiss={() => setDialogVisible(false)}
          dismissable={false}
        >
          <Dialog.Icon icon='alert' color={colors.ui.error} />

          <Dialog.Title>Delete Account?</Dialog.Title>
          <Dialog.Content>
            <Text>This will delete all saved data and settings</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={deleteAccount}
              buttonColor={colors.ui.error}
              textColor={colors.text.primary}
              style={{ width: 90 }}
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
