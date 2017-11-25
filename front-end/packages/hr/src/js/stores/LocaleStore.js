import { observable, computed, action, reaction } from 'mobx';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import vi from 'react-intl/locale-data/vi';

// Translated data
import localeData from 'i18n/build/locales/data.json';

class LocaleStore {
  @observable language;
  @observable messages;

  constructor(language) {
    addLocaleData([...en, ...vi]);

    // Define application language, fallback to browser language
    const browserLanguage =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage;
    this.language = language || browserLanguage;

    // Split locales with a region code
    const languageWithoutRegionCode = this.language.toLowerCase().split(/[_-]+/)[0];

    // Try full locale, try locale without region code, fallback to 'en'
    this.messages =
      localeData[languageWithoutRegionCode] || localeData[this.language] || localeData.en;
  }
}

export default new LocaleStore('vi');
