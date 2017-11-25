```
const items = [
  {
    label: 'Dashboard',
    content: '/',
  },
  {
    label: 'Cài đặt công ty',
    content: [
      {
        label: 'Thông tin công ty',
        content: '/company-settings'
      },
      {
        label: 'Quản lý nhân viên',
        content: '/manage-employees'
      }
    ],
  }
];
<div style={{backgroundColor: '#767676'}}>
  <Nav items={items} />
</div>
```