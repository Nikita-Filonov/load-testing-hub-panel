export interface Config {
  serverUrl: string;
  apiVersion: string;

  apiDateFormat: string;
  apiTimeFormat: string;

  pickerDateFormat: string;
  pickerTimeFormat: string;
}

export class SettingsManager {
  private static config: Config = {
    serverUrl: '',
    apiVersion: '',

    apiDateFormat: '',
    apiTimeFormat: '',

    pickerDateFormat: '',
    pickerTimeFormat: ''
  };

  static setup(config: Config | null) {
    this.config = config ? config : this.getEnvConfig();
  }

  private static getEnvConfig(): Config {
    return {
      serverUrl: process.env.REACT_APP_SERVER_URL || '',
      apiVersion: process.env.REACT_APP_API_VERSION || '',

      apiDateFormat: process.env.REACT_APP_API_DATE_FORMAT || '',
      apiTimeFormat: process.env.REACT_APP_API_TIME_FORMAT || '',

      pickerDateFormat: process.env.REACT_APP_PICKER_DATE_FORMAT || '',
      pickerTimeFormat: process.env.REACT_APP_PICKER_TIME_FORMAT || ''
    };
  }

  static get appUrl(): string {
    return `${window.location.protocol}//${window.location.host}`;
  }

  static get serverUrl(): string {
    return this.config.serverUrl;
  }

  static get apiVersion(): string {
    return this.config.apiVersion;
  }

  static get apiUrl(): string {
    return `${this.serverUrl}${this.apiVersion}`;
  }

  static get apiDateFormat(): string {
    return this.config.apiDateFormat;
  }

  static get apiTimeFormat(): string {
    return this.config.apiTimeFormat;
  }

  static get apiDateTimeFormat(): string {
    return `${this.apiDateFormat} ${this.apiTimeFormat}`;
  }

  static get pickerDateFormat(): string {
    return this.config.pickerDateFormat;
  }

  static get pickerTimeFormat(): string {
    return this.config.pickerTimeFormat;
  }

  static get pickerDateTimeFormat(): string {
    return `${this.pickerDateFormat} ${this.pickerTimeFormat}`;
  }

  static getStaticFileUrl(filePath: string): string {
    return `${this.serverUrl}/static/${filePath}`;
  }
}
