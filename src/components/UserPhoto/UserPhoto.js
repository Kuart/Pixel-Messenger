import './UserPhoto.css';

export function UserPhoto(props) {
  const context = { ...props };
  const template = `
    <div class="user-avatar__container {{containerClass}}">
      <img src="{{photo}}" class="user-avatar__img {{imgClass}}" />
    </div>`;
  return {
    template,
    context,
    name: 'UserPhoto'
  };
}
