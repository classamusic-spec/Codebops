import './styles/main.css';
import { App } from './app/app';

function bootstrap(): void {
  const host = document.getElementById('app');
  if (!host) throw new Error('[CodeBops] Missing #app host element.');

  const app = new App(host);
  app.start();

  // Swap the instant boot loader for the app
  document.getElementById('boot-loader')?.remove();
}

bootstrap();
