/* eslint-disable */
import * as fs from 'fs';
import { sync as globSync } from 'glob';
import { sync as mkdirpSync } from 'mkdirp';

const filePattern = './i18n/build/messages/**/*.json';
const outputDir = './i18n/build/locales/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
let defaultMessages = globSync(filePattern)
  .map(filename => fs.readFileSync(filename, 'utf8'))
  .map(file => JSON.parse(file))
  .reduce((collection, descriptors) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      if (collection.hasOwnProperty(id)) {
        throw new Error(`Duplicate message id: ${id}`);
      }
      collection[id] = defaultMessage;
    });

    return collection;
  }, {});
// Create a new directory that we want to write the aggregate messages to
mkdirpSync(outputDir);

const masterDataPath = `${outputDir}/data.json`;
const currentData = fs.existsSync(masterDataPath)
  ? JSON.parse(fs.readFileSync(masterDataPath, 'utf8'))
  : {};

const grommetMessages = {
  Ative: 'Active',
  Activate: 'Activate',
  Activated: 'Activated',
  Add: 'Add',
  add: 'add',
  Alerts: 'Alerts',
  All: 'All',
  ampm: 'ampm',
  Arc: 'Arc',
  AxisLabel: '{orientation} Axis',
  area: 'area',
  Bar: 'Bar',
  bar: 'bar',
  Blank: 'Blank',
  Box: 'Box',
  Carousel: 'Carousel',
  Category: 'Category',
  Circle: 'Circle',
  Chart: 'Chart',
  Children: 'Children',
  Clear: 'Clear',
  Cleared: 'Cleared',
  Close: 'Close',
  'Close Menu': 'Close Menu',
  Completed: 'Completed',
  'Connects With': 'Connects With',
  created: 'Created',
  Critical: 'Critical',
  'Currently Active': 'Currently Active',
  'Date Selector': 'Date Selector',
  'Date Time Icon': 'Open Date and Time Selector',
  day: 'day',
  Disabled: 'Disabled',
  Distribution: 'Distribution',
  Email: 'Email',
  'Enter Select': 'Press enter to select it',
  Error: 'Error',
  Filter: 'Filter',
  Footer: 'Footer',
  Grommet: 'Grommet',
  HotSpotsLabel: 'HotSpots: press arrow keys to interact with it',
  GraphValues: 'Graph has {count} items. Highest is {highest} and smallest is {smallest}',
  hour: 'hour',
  'Grommet Logo': 'Grommet Logo',
  Layer: 'Layer',
  List: 'List',
  line: 'line',
  Loading: 'Loading',
  loginInvalidPassword: 'Please provide Username and Password.',
  'Log In': 'Log In',
  Logout: 'Logout',
  'Main Content': 'Main Content',
  Max: 'Max',
  Menu: 'Menu',
  Meter: 'Meter',
  Min: 'Min',
  minute: 'minute',
  model: 'Model',
  modified: 'Modified',
  monitor: 'monitor',
  month: 'month',
  'Multi Select': 'Multi Select',
  Name: 'Name',
  'Navigation Help': 'Use arrow keys to navigate',
  'Next Month': 'Next Month',
  'Next Slide': 'Next Slide',
  'No Relationship': 'No Relationship',
  Notification: 'Notification',
  OK: 'OK',
  Open: 'Open',
  Parent: 'Parent',
  Parents: 'Parents',
  Parts: 'Parts',
  Part: 'Part',
  Password: 'Password',
  'Previous Month': 'Previous Month',
  'Previous Slide': 'Previous Slide',
  'Previous Tiles': 'Previous Tiles',
  'Remember me': 'Remember me',
  Resource: 'Resource',
  Running: 'Running',
  Search: 'Search',
  'Match Results':
    'There {count, plural,\n      =0 {is no match}\n      one {is # match}\n      other {are # matches}\n  }',
  second: 'second',
  'Select Icon': 'Open Select Drop',
  Selected: 'Selected',
  'Selected Multiple':
    '{count, plural,\n      =0 {none}\n      one {# value}\n      other {# values}\n  }',
  'Skip to': 'Skip to',
  'Slide Number': 'Slide {slideNumber}',
  Sort: 'Sort',
  Spinning: 'Spinning',
  Spiral: 'Spiral',
  State: 'State',
  Status: 'Status',
  Subtract: 'Subtract',
  SunBurst: 'SunBurst',
  'Tab Contents': '{activeTitle} Tab Contents',
  Table: 'Table',
  Tasks: 'Tasks',
  Tiles: 'Tiles',
  Time: 'Time',
  Title: 'Title',
  Today: 'Today',
  Topology: 'Topology',
  Total: 'Total',
  Threshold: 'Threshold',
  Unknown: 'Unknown',
  Username: 'Username',
  uri: 'URI',
  Value: 'Value',
  Warning: 'Warning',
  year: 'year',
  'carret-down': 'carret-down',
  'three-dots': 'three-dots',
};

currentData.vi = Object.assign({}, defaultMessages, grommetMessages);

// Write the messages to this directory
fs.writeFileSync(outputDir + 'data.json', JSON.stringify(currentData, null, 2));
