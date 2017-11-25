```
const Tab = require('../src/js/components/Tab');

<Tabs justify="start">
  <Tab title={<span>Mời thủ công</span>}>
    <div>Nhận xét của bạn</div>
  </Tab>
  <Tab title={<span>Đăng tải file excel</span>}>
    <div>Nhận xét của bạn</div>
  </Tab>
</Tabs>
```

This is stretch tabs
```
const Tab = require('../src/js/components/Tab');
const CountingTabTitle = require('../src/js/components/CountingTabTitle');

<Tabs justify="start" stretch>
  <Tab title={<CountingTabTitle number={2} description="Bộ mục tiêu của tôi" />}>
    <div>Nhận xét của bạn</div>
  </Tab>
  <Tab title={<CountingTabTitle number={3} description="Bộ mục tiêu của tôi" />}>
    <div>Nhận xét của bạn</div>
  </Tab>
</Tabs>
```

Radio button tabs
```
const Tab = require('../src/js/components/Tab');
const RadioButton = require('../src/js/components/RadioButton');

<Tabs justify="start" stretch radio>
  <Tab title={<RadioButton label="Loại đạt/không đạt" checked />}>
    <div>Nhận xét của bạn</div>
  </Tab>
  <Tab title={<RadioButton label="Loại đạt/không đạt" />}>
    <div>Nhận xét của bạn</div>
  </Tab>
</Tabs>
```