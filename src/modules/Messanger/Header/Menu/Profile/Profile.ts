import { IComponentModel } from '../../../../../utils';
import { UserPhoto, Button, Modal } from '../../../../../components';
import { ProfileInfo } from './ProfileInfo';
import { ProfileEdit } from './ProfileEdit';
import edit from '../../../../../../static/assets/images/Icon/EditBtn.svg';
import './Profile.css';

export function Profile(): IComponentModel {
  return {
    state: {
      isEditable: false,
      currentUser: {
        email: 'Kuart44@gmail.com',
        login: 'Kuart',
        first_name: 'Денис',
        second_name: 'Денис',
        phone: '+7 (921) 444 44 44',
      },
    },
    components: {
      UserPhoto,
      Button,
      ProfileInfo,
      ProfileEdit,
    },
    methods: {
      editHander() {
        console.log('object');
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
          <ProfileInfo if:falsy="state.isEditable"  b:user="state.currentUser" />
          <ProfileEdit if:truthy="state.isEditable" b:user="state.currentUser" />
    `,
        '',
        '',
        `<img class="modal-window__close" src="${edit}" e:click="methods.editHander" />`
      ).template
    }
    `,
  };
}
