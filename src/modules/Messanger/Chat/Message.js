import './Message.css';

export function Message(props) {
  const context = { ...props };
  const template = `
    <article class="messages-area__message">
      <div class="user-avatar__container user-avatar__container_message">
        <img src="{{photo}}" class="user-avatar__img user-avatar__img_message" />
      </div>

      <div class="messages-area__content">
          
          {{?
            if=isAuthor=<span class="content__author content__author_own">@author@</span>=if
            else=<span class="content__author">@author@</span>=else
          ?}}
          
          <p class="content__message">{{message}}</p>
            
      </div>

      <div class="messages-area__time">{{time}}</div>
    </article>`;
  return {
    context,
    template,
    name: 'Message'
  };
}
