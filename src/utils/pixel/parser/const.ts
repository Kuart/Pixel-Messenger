import rebel from '../../../../static/assets/images/Icon/shock.png';
import itsFine from '../../../../static/assets/images/Icon/emoji3.png';
import alien from '../../../../static/assets/images/Icon/alien.png';

/*  no pref - attribute
      s: - static string/number
      b: - value from parent state/props
      e: - event
  */

export const PREFIXES = {
  BIND: 'b:',
  STATIC: 's:',
  HANLDER: 'e:',
  PROPS: 'p:',
  IF_CONDITION: 'if:',
  ELSE_CONDITION: 'else:',
  LOOP: 'loop:',
};

export const EMOJI: Record<string, string> = {
  rebel: `<img src="${rebel}" width="30" height="30"/>`,
  alian: `<img src="${alien}" width="30" height="30"/>`,
  its_fine: `<img src="${itsFine}" class="sticker"/>`,
};
