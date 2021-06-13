import { generateUniqId } from '../../utils';
import { Input } from '../../components';
import './Auth.css';

function Login() {
  return {
    data: {},
    methods: {
      submitForm: (event: any) => {
        console.log(event);
      },
    },
    components: {
      Input,
    },
    template: /* html */ `
    <form class="auth-form auth-form_login" on-submit="submitForm">
      <div class="auth-form__body">
        <Input label="Логин" name="login" id="input-${generateUniqId()}" />
        <Input label="Логин" name="login" id="input-${generateUniqId()}" />
      </div>
      <footer class="auth-form__footer">
      hi!
      </footer>
    </form>`,
  };
}

export default Login;
