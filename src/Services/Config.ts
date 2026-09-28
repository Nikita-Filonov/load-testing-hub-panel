export interface Config {
  serverUrl: string;
  apiVersion: string;

  apiDateFormat: string;
  apiTimeFormat: string;

  durationFormat: string;

  pickerDateFormat: string;
  pickerTimeFormat: string;
}

export class SettingsManager {
  private static config: Config = {
    serverUrl: '',
    apiVersion: '',

    apiDateFormat: '',
    apiTimeFormat: '',

    durationFormat: '',

    pickerDateFormat: '',
    pickerTimeFormat: ''
  };

  static setup(config: Config | null) {
    this.config = config ? config : this.getEnvConfig();
  }

  private static getEnvConfig(): Config {
    return {
      serverUrl: import.meta.env.VITE_SERVER_URL || '',
      apiVersion: import.meta.env.VITE_API_VERSION || '',

      apiDateFormat: import.meta.env.VITE_API_DATE_FORMAT || '',
      apiTimeFormat: import.meta.env.VITE_API_TIME_FORMAT || '',

      durationFormat: import.meta.env.VITE_DURATION_FORMAT || '',

      pickerDateFormat: import.meta.env.VITE_PICKER_DATE_FORMAT || '',
      pickerTimeFormat: import.meta.env.VITE_PICKER_TIME_FORMAT || ''
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

  static get durationFormat(): string {
    return this.config.durationFormat;
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
