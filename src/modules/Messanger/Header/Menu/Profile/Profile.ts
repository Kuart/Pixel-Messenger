import { IComponentModel } from '../../../../../utils';
import { UserPhoto, Button, Modal } from '../../../../../components';
import { ProfileInfo } from './ProfileInfo';
import { ProfileEdit } from './ProfileEdit';
import edit from '../../../../../../static/assets/images/Icon/EditBtn.svg';
import storEdit from '../../../../../../static/assets/images/Icon/stopEdit.svg';
import './Profile.css';

export function Profile(): IComponentModel {
  return {
    state: {
      isEditable: false,
    },
    components: {
      UserPhoto,
      Button,
      ProfileInfo,
      ProfileEdit,
    },
    methods: {
      editHander() {
        this.state.isEditable = !this.state.isEditable;
      },
      handleEsc(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          this.componentProps.modalClose();
        }
      },
    },
    componentDidMount() {
      this.methods.handleEsc = this.methods.handleEsc.bind(this);
      window.addEventListener('keydown', this.methods.handleEsc);
    },
    componentWillUnmount() {
      window.removeEventListener('keydown', this.methods.handleEsc);
    },
    template: /* html */ `
    ${
      Modal(
        /* html */ `
          <ProfileInfo if:falsy="state.isEditable"  b:user="props.user" />
          <ProfileEdit if:truthy="state.isEditable" b:user="props.user" b:onClose="methods.editHander" />
    `,
        '',
        '',
        `
        <img if:falsy="state.isEditable" class="modal-window__close" src="${edit}" e:click="methods.editHander" />
        <img if:truthy="state.isEditable" class="modal-window__close" src="${storEdit}" e:click="methods.editHander" />
        
        `
      ).template
    }
    `,
  };
}
