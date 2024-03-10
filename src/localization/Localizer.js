'use strict';

class Localizer {
  constructor(language = 'en', languages) {
    this.language = language;
    this.languages = languages;
  }

  get(selector) {
    let object = this.languages[this.language];
    const keys = selector.split('.');
    for (let i = 0; i < keys.length; i++) {
      if (!object.hasOwnProperty(keys[i])) return null;
      object = object[keys[i]];
    }
    return object;
  }

  getNamedLanguages() {
    return Object.keys(this.languages).map((code) => {
      return {
        code,
        language: this.languages[code].language,
      };
    });
  }

  setLanguage(language) {
    this.language = language;
  }
}

export default Localizer;
