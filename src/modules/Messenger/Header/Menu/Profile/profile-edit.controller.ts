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
      console.error(error);
    }
  };

  updateAvatar = async (event: any, component: VComponentNode) => {
    const newForm = new FormData();
    newForm.append('avatar', event.target.files[0]);
    const user = await userAPI.changeAvatar(newForm);
    PixelStore.dispatch('currentUser', user);
    component.state.formFields.avatar = user.avatar;
  };
}
