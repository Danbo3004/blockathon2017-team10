import { IntlProvider } from 'react-intl';
import localeStore from 'stores/LocaleStore';

const locale = localeStore.language;
const messages = localeStore.messages;

const intlProvider = new IntlProvider({ locale, messages });

// Export an instance of intl to use react-intl API with mobx

export default intlProvider.getChildContext().intl;
