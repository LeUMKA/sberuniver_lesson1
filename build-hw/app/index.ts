import { formatUserName, multiply } from './utils';
import { routes } from './routes';

const user = formatUserName('Ada', 'Lovelace');
const result = multiply(6, 7);

console.log(`User: ${user}; result=${result}`);

const loadDynamicFeature = async (): Promise<void> => {
  const featureModule = await import('./feature');
  console.log(featureModule.loadFeatureMessage());
};

const loadRoute = async (route: keyof typeof routes): Promise<void> => {
  if (route === 'home') {
    const module = await routes.home();
    console.log(module.renderHome());
    return;
  }

  const module = await routes.about();
  console.log(module.renderAbout());
};

void loadDynamicFeature();
void loadRoute('home');
