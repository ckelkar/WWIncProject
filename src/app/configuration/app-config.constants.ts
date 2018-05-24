import {InjectionToken} from '@angular/core';
import {IAppConfig} from './app-config.interface';

export const APP_SETTINGS: IAppConfig = {
ZOMATO_API_KEY : '2f000834973690db7e20485f5b4a8caf'
};

export let CONFIG = new InjectionToken<IAppConfig>('app.config');
