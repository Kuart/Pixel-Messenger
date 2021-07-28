import { IUser } from '../../../../../types';
import { FormValidator, PixelStore } from '../../../../../utils';
import { FIELD_TYPE_FULL, FIELD_TYPE } from './const';
import { userAPI } from '../../../../../api';
import { VComponentNode } from '../../../../../utils/pixel/pixelDom';

const validConfig = { form: 'formFields', errors: 'errors' };

enum ERRORS {
  NV = 'Form is not valid',
}

export class ProfileEditController {
  update = async (comp: VComponentNode) => {
    try {
      const { state } = comp;
      const type = state.isPasswordEdit ? FIELD_TYPE_FULL : FIELD_TYPE;
      const isValid = FormValidator.validate(state, validConfig, type);

      if (!isValid) {
        throw Error(ERRORS.NV);
      }

      const newData = await userAPI.changeProfile(state.formFields);

      PixelStore.setUserData({ ...newData });
      PixelStore.dispatch('currentUser', { ...newData });

      if (state.isPasswordEdit) {
        const { oldPassword, newPassword } = state.formFields as any;
        await userAPI.changePassword({ oldPassword, newPassword });
      }

      comp.componentProps.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  updateAvatar = async (event: any) => {
    const newForm = new FormData();
    newForm.append('avatar', event.target.files[0], 'avatar.png');
    await userAPI.changeAvatar(newForm);
  };
}
