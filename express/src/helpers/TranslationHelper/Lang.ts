function convertNumber(str: string) {
  if (str === '-Inf') {
    return -Infinity;
  } else if (str === '+Inf' || str === 'Inf' || str === '*') {
    return Infinity;
  }
  return parseInt(str, 10);
}

// tslint:disable-next-line
const intervalRegexp = /^({\s*(\-?\d+(\.\d+)?[\s*,\s*\-?\d+(\.\d+)?]*)\s*})|([\[\]])\s*(-Inf|\*|\-?\d+(\.\d+)?)\s*,\s*(\+?Inf|\*|\-?\d+(\.\d+)?)\s*([\[\]])$/;
// tslint:disable-next-line
const anyIntervalRegexp = /({\s*(\-?\d+(\.\d+)?[\s*,\s*\-?\d+(\.\d+)?]*)\s*})|([\[\]])\s*(-Inf|\*|\-?\d+(\.\d+)?)\s*,\s*(\+?Inf|\*|\-?\d+(\.\d+)?)\s*([\[\]])/;

type OptionsType = {
  messages?: object;
};

type ReplacementsType = {
  [propName: number]: string | number;
  [propName: string]: string | number;
};

type KeyObjectType = {
  source: string;
  entries: string[];
};

export default class Lang {
  protected messages;

  constructor(options: OptionsType) {
    options = options || {};
    this.messages = options.messages;
  }

  /**
   * Set messages source.
   */
  setMessages(messages: object): void {
    this.messages = messages;
  }

  /**
   * This method act as an alias to get() method.
   */
  has(key: string): boolean {
    if (typeof key !== 'string' || !this.messages) {
      return false;
    }

    return this._getMessage(key) !== null;
  }

  /**
   * Determine if a translation key exists in messages
   */
  exists(key: string): boolean {
    if (typeof key !== 'string') {
      return null;
    }
    if (this.has(key)) {
      return true;
    }
    return false;
  }

  /**
   * Get a translation message.
   */
  get(key: string, replacements?: ReplacementsType): string {
    if (!this.has(key)) {
      return key;
    }

    let message = this._getMessage(key);
    if (message === null) {
      return key;
    }

    if (replacements) {
      message = this._applyReplacements(message, replacements);
    }

    return message;
  }

  /**
   * Gets a translation and replaces the variables
   */
  getAndReplace(key: string, replacements: ReplacementsType): string {
    if (typeof key !== 'string') {
      return null;
    }
    if (typeof replacements !== 'object') {
      return null;
    }
    return this.choice(key, 1, replacements);
  }

  /**
   * This method act as an alias to get() method.
   */
  trans(key: string, replacements: ReplacementsType): string {
    return this.get(key, replacements);
  }

  /**
   * Gets the plural or singular form of the message specified based on an integer value.
   */
  choice(key: string, count: number, replacements?: ReplacementsType): string {
    // Set default values for parameters replace
    replacements = typeof replacements !== 'undefined'
      ? replacements
      : {};

    // The count must be replaced if found in the message
    replacements.count = count;

    // Message to get the plural or singular
    const message = this.get(key, replacements);

    // Check if message is not null or undefined
    if (message === null || message === undefined) {
      return message;
    }

    // Separate the plural from the singular, if any
    const messageParts = message.split('|');

    // Get the explicit rules, If any
    const explicitRules = [];

    for (let i = 0; i < messageParts.length; i++) {
      messageParts[i] = messageParts[i].trim();

      if (anyIntervalRegexp.test(messageParts[i])) {
        const messageSpaceSplit = messageParts[i].split(/\s/);
        explicitRules.push(messageSpaceSplit.shift());
        messageParts[i] = messageSpaceSplit.join(' ');
      }
    }

    // Check if there's only one message
    if (messageParts.length === 1) {
      // Nothing to do here
      return message;
    }

    // Check the explicit rules
    for (let j = 0; j < explicitRules.length; j++) {
      if (this._testInterval(count, explicitRules[j])) {
        return messageParts[j];
      }
    }

    const pluralForm = this._getPluralForm(count);

    return messageParts[pluralForm];
  }

  /**
   * This method act as an alias to choice() method.
   */
  transChoice(key: string, count: number, replacements: ReplacementsType): string {
    return this.choice(key, count, replacements);
  }

  /**
   * Parse a message key into components.
   */
  _parseKey(key: string): KeyObjectType {
    if (typeof key !== 'string') {
      return null;
    }

    const segments = key.split('.');
    const source = segments[0].replace(/\//g, '.');

    return {
      source: source,
      entries: segments.slice(1),
    };
  }

  /**
   * Returns a translation message. Use `Lang.get()` method instead, this methods assumes the key exists.
   */
  _getMessage(key: string): string {
    const keyObj = this._parseKey(key);

    // Ensure message source exists.
    if (this.messages[keyObj.source] === undefined) {
      return null;
    }

    // Get message
    let message = this.messages[keyObj.source];
    const entries = keyObj
      .entries
      .slice();
    let subKey = '';
    while (entries.length && message !== undefined) {
      subKey = !subKey
        ? entries.shift()
        : subKey.concat('.', entries.shift());
      if (message[subKey] !== undefined) {
        message = message[subKey];
        subKey = '';
      }
    }

    if (typeof message !== 'string') {
      return null;
    }

    return message;
  }

  /**
   * Sort replacement keys by length in descending order.
   */
  private _sortReplacementKeys(a: string, b: string): number {
    return b.length - a.length;
  }

  /**
   * Apply replacements to a string message containing placeholders.
   */
  private _applyReplacements(message: string, replacements: object): string {
    const keys = Object
      .keys(replacements)
      .sort(this._sortReplacementKeys);

    keys.forEach(replace => {
      message = message.replace(new RegExp(':' + replace, 'gi'), match => {
        const value = replacements[replace];

        // Capitalize all characters.
        const allCaps = match === match.toUpperCase();
        if (allCaps) {
          return value.toUpperCase();
        }

        // Capitalize first letter.
        const firstCap = match === match.replace(/\w/i, letter => {
          return letter.toUpperCase();
        });
        if (firstCap) {
          return value
            .charAt(0)
            .toUpperCase() + value.slice(1);
        }

        return value;
      });
    });

    return message;
  }

  /**
   * Checks if the given `count` is within the interval defined by the {string} `interval`
   */
  private _testInterval(count: number, interval: string): boolean {
    /**
     * From the Symfony\Component\Translation\Interval Docs
     *
     * Tests if a given number belongs to a given math interval.
     *
     * An interval can represent a finite set of numbers:
     *
     *  {1,2,3,4}
     *
     * An interval can represent numbers between two numbers:
     *
     *  [1, +Inf]
     *  ]-1,2[
     *
     * The left delimiter can be [ (inclusive) or ] (exclusive).
     * The right delimiter can be [ (exclusive) or ] (inclusive).
     * Beside numbers, you can use -Inf and +Inf for the infinite.
     */

    if (typeof interval !== 'string') {
      throw new Error('Invalid interval: should be a string.');
    }

    interval = interval.trim();

    let matches = interval.match(intervalRegexp);
    if (!matches) {
      throw new Error(`Invalid interval: ${interval}`);
    }

    if (matches[2]) {
      const items = matches[2].split(',');
      for (const item of items) {
        if (parseInt(item, 10) === count) {
          return true;
        }
      }
    } else {
      // Remove falsy values.
      matches = matches.filter(match => {
        return !!match;
      });

      const leftDelimiter = matches[1];
      let leftNumber = convertNumber(matches[2]);
      if (leftNumber === Infinity) {
        leftNumber = -Infinity;
      }
      const rightNumber = convertNumber(matches[3]);
      const rightDelimiter = matches[4];

      return (leftDelimiter === '['
        ? count >= leftNumber
        : count > leftNumber) && (rightDelimiter === ']'
        ? count <= rightNumber
        : count < rightNumber);
    }

    return false;
  }

  /**
   * Returns the plural position to use for the given locale and number.
   *
   * The plural rules are derived from code of the Zend Framework (2010-09-25),
   * which is subject to the new BSD license (http://framework.zend.com/license/new-bsd).
   * Copyright (c) 2005-2010 Zend Technologies USA Inc. (http://www.zend.com)
   *
   */
  private _getPluralForm(count: number, locale?: string): number {
    switch (locale) {
      case 'az':
      case 'bo':
      case 'dz':
      case 'id':
      case 'ja':
      case 'jv':
      case 'ka':
      case 'km':
      case 'kn':
      case 'ko':
      case 'ms':
      case 'th':
      case 'tr':
      case 'vi':
      case 'zh':
        return 0;

      case 'af':
      case 'bn':
      case 'bg':
      case 'ca':
      case 'da':
      case 'de':
      case 'el':
      case 'en':
      case 'eo':
      case 'es':
      case 'et':
      case 'eu':
      case 'fa':
      case 'fi':
      case 'fo':
      case 'fur':
      case 'fy':
      case 'gl':
      case 'gu':
      case 'ha':
      case 'he':
      case 'hu':
      case 'is':
      case 'it':
      case 'ku':
      case 'lb':
      case 'ml':
      case 'mn':
      case 'mr':
      case 'nah':
      case 'nb':
      case 'ne':
      case 'nl':
      case 'nn':
      case 'no':
      case 'om':
      case 'or':
      case 'pa':
      case 'pap':
      case 'ps':
      case 'pt':
      case 'so':
      case 'sq':
      case 'sv':
      case 'sw':
      case 'ta':
      case 'te':
      case 'tk':
      case 'ur':
      case 'zu':
        return (count === 1)
          ? 0
          : 1;

      case 'am':
      case 'bh':
      case 'fil':
      case 'fr':
      case 'gun':
      case 'hi':
      case 'hy':
      case 'ln':
      case 'mg':
      case 'nso':
      case 'xbr':
      case 'ti':
      case 'wa':
        return ((count === 0) || (count === 1))
          ? 0
          : 1;

      case 'be':
      case 'bs':
      case 'hr':
      case 'ru':
      case 'sr':
      case 'uk':
        return ((count % 10 === 1) && (count % 100 !== 11))
          ? 0
          : (((count % 10 >= 2) && (count % 10 <= 4) && ((count % 100 < 10) || (count % 100 >= 20)))
            ? 1
            : 2);

      case 'cs':
      case 'sk':
        return (count === 1)
          ? 0
          : (((count >= 2) && (count <= 4))
            ? 1
            : 2);

      case 'ga':
        return (count === 1)
          ? 0
          : ((count === 2)
            ? 1
            : 2);

      case 'lt':
        return ((count % 10 === 1) && (count % 100 !== 11))
          ? 0
          : (((count % 10 >= 2) && ((count % 100 < 10) || (count % 100 >= 20)))
            ? 1
            : 2);

      case 'sl':
        return (count % 100 === 1)
          ? 0
          : ((count % 100 === 2)
            ? 1
            : (((count % 100 === 3) || (count % 100 === 4))
              ? 2
              : 3));

      case 'mk':
        return (count % 10 === 1)
          ? 0
          : 1;

      case 'mt':
        return (count === 1)
          ? 0
          : (((count === 0) || ((count % 100 > 1) && (count % 100 < 11)))
            ? 1
            : (((count % 100 > 10) && (count % 100 < 20))
              ? 2
              : 3));

      case 'lv':
        return (count === 0)
          ? 0
          : (((count % 10 === 1) && (count % 100 !== 11))
            ? 1
            : 2);

      case 'pl':
        return (count === 1)
          ? 0
          : (((count % 10 >= 2) && (count % 10 <= 4) && ((count % 100 < 12) || (count % 100 > 14)))
            ? 1
            : 2);

      case 'cy':
        return (count === 1)
          ? 0
          : ((count === 2)
            ? 1
            : (((count === 8) || (count === 11))
              ? 2
              : 3));

      case 'ro':
        return (count === 1)
          ? 0
          : (((count === 0) || ((count % 100 > 0) && (count % 100 < 20)))
            ? 1
            : 2);

      case 'ar':
        return (count === 0)
          ? 0
          : ((count === 1)
            ? 1
            : ((count === 2)
              ? 2
              : (((count % 100 >= 3) && (count % 100 <= 10))
                ? 3
                : (((count % 100 >= 11) && (count % 100 <= 99))
                  ? 4
                  : 5))));

      default:
        return 0;
    }
  }
}
