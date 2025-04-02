import bnTranslations from '../assets/locales/bn.json';

/**
 * Simple translation utility for accessing nested translation keys
 * @param key Dot notation string for accessing nested properties (e.g. 'home.title')
 * @returns The translated string or the key itself if not found
 */
export const t = (key: string): string => {
  try {
    const keys = key.split('.');
    let result: any = bnTranslations;
    
    for (const k of keys) {
      if (result[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      result = result[k];
    }
    
    return result;
  } catch (error) {
    console.warn(`Error getting translation for key: ${key}`, error);
    return key;
  }
};

/**
 * Get a translation object (for accessing nested objects directly)
 * @param prefix The prefix path to the object (e.g. 'home.features')
 * @returns The translation object or an empty object if not found
 */
export const tObj = (prefix: string): any => {
  try {
    const keys = prefix.split('.');
    let result: any = bnTranslations;
    
    for (const k of keys) {
      if (result[k] === undefined) {
        console.warn(`Translation object not found: ${prefix}`);
        return {};
      }
      result = result[k];
    }
    
    return result;
  } catch (error) {
    console.warn(`Error getting translation object for key: ${prefix}`, error);
    return {};
  }
};

export default { t, tObj }; 