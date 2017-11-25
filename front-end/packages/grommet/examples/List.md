```
const ListItem = require('../src/js/components/ListItem');
const Avatar = require('../src/js/components/Avatar');

<List>
  <ListItem justify='between' separator='none' header>
    <span style={{ flexBasis: '8%' }} />
    <span style={{ flexBasis: '18%' }}>
      TÊN NHÂN VIÊN
    </span>
    <span style={{ flexBasis: '12%' }}>
      MÃ NHÂN VIÊN
    </span>
    <span style={{ flexBasis: '16%' }}>
      VỊ TRÍ CÔNG VIỆC
    </span>
    <span style={{ flexBasis: '18%' }}>
      QUẢN LÝ TRỰC TIẾP
    </span>
    <span style={{ flexBasis: '16%' }}>
      BỘ PHẬN
    </span>
    <span style={{ flexBasis: '12%' }}>
      TRẠNG THÁI
    </span>
  </ListItem>
  <ListItem justify='between' separator='bottom'>
    <span style={{ flexBasis: '8%' }}>
      <Avatar size="small-thumb" mask src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
    </span>
    <span style={{ flexBasis: '18%' }}>
      Vũ Hoàng Anh
    </span>
    <span style={{ flexBasis: '12%' }}>
      A3234
    </span>
    <span style={{ flexBasis: '16%' }}>
      Front-end developer
    </span>
    <span style={{ flexBasis: '18%' }}>
      Ngọc Trần
    </span>
    <span style={{ flexBasis: '16%' }}>
      Development
    </span>
    <span style={{ flexBasis: '12%' }}>
      Đang hoạt động
    </span>
  </ListItem>
  <ListItem justify='between' separator='none'>
    <span style={{ flexBasis: '8%' }}>
      <Avatar size="small-thumb" mask src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
    </span>
    <span style={{ flexBasis: '18%' }}>
      Hồng Vũ Minh Thư
    </span>
    <span style={{ flexBasis: '12%' }}>
      T3234
    </span>
    <span style={{ flexBasis: '16%' }}>
      Marketing executive
    </span>
    <span style={{ flexBasis: '18%' }}>
      Nguyễn Ngọc Nhi
    </span>
    <span style={{ flexBasis: '16%' }}>
      Marketing
    </span>
    <span style={{ flexBasis: '12%' }}>
      Đang hoạt động
    </span>
  </ListItem>
</List>
```